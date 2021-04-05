import { flags } from '@oclif/command';
import * as fs from 'fs-extra';
import { JotFormApi } from '../../apis';
import { createConfig, defaultConfigDir, PromptConfig } from '../../utils/handleConfig';
import { JotFormConfigKeys, JotFormConfig } from './models';
const jotFormConfigName = 'jotform-config';
const jotFormConfigPrompts: PromptConfig[] = [
    {
        prompt: 'Please enter your JotForm API key',
        key: JotFormConfigKeys.ApiKey,
    },
];
const getJotFormConfig = async (configDir: string): Promise<JotFormConfig> => {
    let config: JotFormConfig | undefined;
    try {
        config = await fs.readJSON(`${configDir}/${jotFormConfigName}.json`);
    } catch (e) {}
    if (!config) {
        throw new Error(`Please initialize your JotForm config! 
Run 
$therify integrations jotform init
to use JotForm integrations
`);
    }
    return config;
};

export const handleJotFormIntegration = async ({ command, flags }: { command: string; flags: { formid: string } }) => {
    if (command === 'init') {
        return createConfig({
            fileName: jotFormConfigName,
            prompts: jotFormConfigPrompts,
        });
    }
    const config = await getJotFormConfig(defaultConfigDir);
    const api = JotFormApi(config.apikey);
    switch (command) {
        case 'list-forms':
            return api.listForms();
        case 'list-form-webhooks':
            return api.listFormWebhooks(flags.formid);
        case 'list-form-submissions':
            return api.listFormSubmissions(flags.formid);
        default:
            throw new Error(`Cannot find integration command: ${command}`);
    }
};
