import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { ReceiverInterface } from "./ReceiverInterface";

require("dotenv").config();

export class Receive implements ReceiverInterface {
  async receiver(): Promise<void> {
    let connection: Connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST
    });
    let channel: Channel = await connection.createChannel();
    const queueAssert = await channel.assertQueue(
      process.env.RABBITMQ_QUEUE_ONE,
      {
        durable: true,
        exclusive: false,
        autoDelete: false,
        arguments: null
      }
    );
    await channel.consume(queueAssert.queue, (msg: ConsumeMessage | null) => {
      console.log(" [x] Received %s", msg.content.toString());
      channel.ack(msg, false);
    });
    await channel.close();
    await connection.close();
  }
}
