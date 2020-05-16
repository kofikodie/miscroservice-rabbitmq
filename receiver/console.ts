import commander from 'commander';
import { Receive } from './config/Receive';

commander.version('beta').description('i receive stuff');
commander
    .command('receive')
    .alias('r')
    .description('am the receiver')
    .action(async () => {
        try {
            await new Receive().receiver();
            console.log('closing connection');
        } catch (e) {
            console.log(e);
        }
    });
commander.parse(process.argv);
