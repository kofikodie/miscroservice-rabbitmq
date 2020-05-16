import commander from 'commander';
import dotenv from 'dotenv';
import { Send } from './config/Send';

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
            console.log(`[x] Sent ${message}`);
        } catch (error) {
            console.log(`[x] Message could not be delivered ${error}`);
        }
    });
commander.parse(process.argv);
