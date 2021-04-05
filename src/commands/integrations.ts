import { Command, flags } from '@oclif/command';
import { handleIntegrations, IntegrationArgs } from '../integrations';

export default class Integrations extends Command {
    static description = 'Hub for Therify integrations';

    static examples = [
        `$ therify integrations jotform
hello world from ./src/hello.ts!
`,
    ];

    static flags = {
        // help: flags.help({ char: 'h' }),
        formid: flags.string({ description: 'Id of JotForm form' }),
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
        /*
        - List all forms
            therify integrations jotform list-forms
        - List all webhooks
            therify integrations jotform list-form-webhooks <formId>
        - List all submissions
            therify integrations jotform list-form-submissions <formId>
        */
        // Pass off to integrations. handle there
        // const integrationInterface = getIntegrationInterface(args.integrationName);
        // if (!integrationInterface) {
        // }

        // const commandFn = integrationInterface(args.integrationName);

        // const name = flags.name ?? 'world';
        // this.log(`hello ${name} from ./src/commands/hello.ts`);
        // if (args.file && flags.force) {
        //     this.log(`you input --force and --file: ${args.file}`);
        // }
    }
}
