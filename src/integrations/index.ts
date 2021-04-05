import { handleJotFormIntegration } from './JotFormIntegration/jotFormIntegration';

export type IntegrationArgs = {
    integrationName: string;
    command: string;
};
export type HandleIntegrationConfig = {
    args: IntegrationArgs;
    flags: any;
};
export const handleIntegrations = ({ args, flags }: HandleIntegrationConfig): Promise<string> => {
    switch (args.integrationName) {
        case 'jotform':
            return handleJotFormIntegration({
                command: args.command,
                flags,
            });
        default:
            throw new Error(`Integration not found: ${args.integrationName}`);
    }
};
