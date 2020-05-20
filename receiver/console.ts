import commander from 'commander';
import dotenv from 'dotenv';
import { Receive } from './Receive';

dotenv.config();

commander.version('beta').description('i send stuff to rabbit');
commander
    .command('receive')
    .alias('r')
    .description('am the consumer')
    .action(async () => {
        try {
            await new Receive().consumer();
            console.log(`[x] Closing the connection`);
        } catch (e) {
            console.log(e);
        }
    });
commander.parse(process.argv);
