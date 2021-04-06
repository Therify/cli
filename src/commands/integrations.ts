import { Command, flags } from '@oclif/command';
import { handleIntegrations, IntegrationArgs } from '../integrations';

export default class Integrations extends Command {
    static description = `$ therify integrations [integration] [command] <flags>`;

    static examples = [`$ therify integrations jotform list-forms`];

    static flags = {
        // help: flags.help({ char: 'h' }),
        formid: flags.string({ description: 'Id of JotForm form' }),
        apikey: flags.string({ char: 'k', description: 'Optional api key' }),
    };

    static args = [{ name: 'integrationName' }, { name: 'command' }];

    async run() {
        const { args, flags } = this.parse(Integrations);
        try {
            const results = await handleIntegrations({
                args: args as IntegrationArgs,
                flags,
            });
            this.log(results);
        } catch (error) {
            this.error(`[integration]: ${error}`);
        }
    }
}
