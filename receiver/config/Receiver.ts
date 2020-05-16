require("dotenv").config();

import { ReceiverInterface } from "./ReceiverInterface";
import amqp, { ConsumeMessage } from "amqplib";

export class Receiver implements ReceiverInterface {
  async receiver(): Promise<void> {
    const connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST,
    });
    const channel = await connection.createChannel();
    await channel.assertQueue(process.env.RABBITMQ_QUEUE_THR, {
      durable: true,
      exclusive: false,
      autoDelete: false,
    });
    await channel.consume(
      process.env.RABBITMQ_QUEUE_THR,
      (msg: ConsumeMessage | null) => {
        console.log(" [x] Received %s", msg.content.toString());
        channel.ack(msg, false);
      }
    );
    await channel.close();
    await connection.close();
  }
}
