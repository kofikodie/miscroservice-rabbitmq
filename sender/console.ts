import commander from 'commander';
import dotenv from 'dotenv';
import { Send } from './Send';

dotenv.config();

commander.version('beta').description('i send stuff to rabbit');
commander
    .command('send')
    .alias('s')
    .arguments('<message>')
    .description('am the sender')
    .action(async (message: string) => {
        try {
            await new Send().publisher(message);
            console.log(`[x] Send ${message}`);
        } catch (e) {
            console.log(e);
        }
    });
commander.parse(process.argv);
