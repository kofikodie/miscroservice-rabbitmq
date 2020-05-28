import { RabbitInterface } from '../config/RabbitInterface';
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import Env from '../EnvRabbit';

export class Receive implements RabbitInterface {
    async consumer(): Promise<void> {
        const connection: Connection = await amqp.connect({
            protocol: Env.PROTOCOL,
            hostname: Env.HOST,
            port: parseInt(Env.PORT),
            username: Env.USER,
            password: Env.PASSWORD,
            vhost: Env.VHOST,
        });

        const channel: Channel = await connection.createChannel();
        const channelOne = channel.consume(Env.QUEUE_ONE, (msg: ConsumeMessage | null) => {
            console.log(' [x] Received first queue %s', msg.content.toString());
            channel.ack(msg, false);
        });
        const channelTwo = channel.consume(Env.QUEUE_SEC, (msg: ConsumeMessage | null) => {
            console.log(' [x] Received second queue %s', msg.content.toString());
            channel.ack(msg, false);
        });

        await Promise.allSettled([channelOne, channelTwo]);
        await channel.close();
        await connection.close();
    }
}
