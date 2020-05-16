import commander from 'commander';
import { Receiver } from './config/Receiver';

commander.version('beta').description('i receive stuff');
commander
    .command('receive')
    .alias('r')
    .description('am the receiver')
    .action(async () => {
        const receive = new Receiver();
        try {
            await receive.receiver();
        } catch (error) {
            console.log(`[x] Message could not be delivered ${error}`);
        }
    });
commander.parse(process.argv);
