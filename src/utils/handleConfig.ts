import cli from 'cli-ux';
import * as fs from 'fs';
import * as path from 'path';

const getRootPath = () => {
    const pathParts = __dirname.split('/');
    const rootIndex = pathParts.indexOf('therify-cli'); //TODO: Get name from package.json
    if (rootIndex === -1) throw new Error('Cannot determine root path');
    pathParts.splice(rootIndex + 1);
    return pathParts.join('/');
};
export const defaultConfigDir = `${getRootPath()}/.config`;
export type PromptConfig = {
    key: string;
    prompt: string;
};

export type IntegrationConfig = {
    configDir?: string;
    fileName: string;
    prompts: PromptConfig[];
};

const handlePrompts = async ({
    prompts,
    config,
    i = 0,
}: {
    prompts: PromptConfig[];
    config: Record<string, string>;
    i?: number;
}): Promise<Record<string, string>> => {
    const promptConfig = prompts[i];
    if (!promptConfig) return config;

    const { prompt, key } = promptConfig;
    const value = await cli.prompt(prompt);
    config[key] = value.trim();
    return handlePrompts({ prompts, config, i: i + 1 });
};

const writeFileRecursive = (dirName: string, fileName: string, data: any) => {
    console.log('DIRNAME' + dirName);
    const pathParts = dirName.split('/');
    let path = '';
    pathParts.forEach((pathpart) => {
        path = `${path}/${pathpart}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
    });

    fs.writeFileSync(`${path}/${fileName}`, data);
};

export const createConfig = async ({ configDir, fileName, prompts }: IntegrationConfig) => {
    const config = await handlePrompts({ prompts, config: {} });
    console.log(config);

    writeFileRecursive(configDir ?? defaultConfigDir, `${fileName}.json`, JSON.stringify(config));
    return 'Config created successfully!';
    // await fs.readJSON(path.join(configDir, 'jotform-config.json'))
};
