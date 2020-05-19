import { SendConfigInterface } from './SenderInterface';
import amqp, { Channel, Connection } from 'amqplib';
import Env from '../../EnvRabbit';

export class Send implements SendConfigInterface {
    async publisher(message: string): Promise<void> {
        const connection: Connection = await amqp.connect({
            protocol: Env.PROTOCOL,
            hostname: Env.HOST,
            port: parseInt(Env.PORT),
            username: Env.USER,
            password: Env.PASSWORD,
            vhost: Env.VHOST,
        });

        const channel: Channel = await connection.createChannel();
        await channel.assertExchange(Env.WORKER_EXCHANGE, 'headers', {
            durable: true,
            autoDelete: false,
            arguments: null,
        });

        const queueOne = await channel.assertQueue(Env.QUEUE_ONE, {
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null,
        });
        const queueSec = await channel.assertQueue(Env.QUEUE_SEC, {
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null,
        });

        await channel.bindQueue(queueOne.queue, Env.WORKER_EXCHANGE, '', {
            'x-match': 'any',
            job: 'convert',
            format: 'jpep',
        });
        await channel.bindQueue(queueSec.queue, Env.WORKER_EXCHANGE, '', {
            'x-match': 'all',
            job: 'convert',
            format: 'jpep',
        });

        channel.publish(Env.WORKER_EXCHANGE, '', Buffer.from(message), {
            headers: {
                job: 'convert',
                format: 'bitmap',
            },
        });

        await channel.close();
        await connection.close();
    }
}
