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

const throwFormIdError = () => {
    throw new Error(`Missing form id. Try using 
$therify integrations [cmd] --formid=yourformid]`);
};

export const handleJotFormIntegration = async ({
    command,
    flags,
}: {
    command: string;
    flags: { formid?: string; apikey?: string };
}) => {
    if (command === 'init') {
        return createConfig({
            fileName: jotFormConfigName,
            prompts: jotFormConfigPrompts,
        });
    }
    const { formid, apikey } = flags;
    const config = apikey ? { apikey } : await getJotFormConfig(defaultConfigDir);
    const api = JotFormApi(config.apikey);
    switch (command) {
        case 'list-forms':
            return api.listForms();
        case 'list-form-webhooks':
            return formid ? api.listFormWebhooks(formid) : throwFormIdError();
        case 'list-form-submissions':
            return formid ? api.listFormSubmissions(formid) : throwFormIdError();
        default:
            throw new Error(`Cannot find integration command: ${command}`);
    }
};
