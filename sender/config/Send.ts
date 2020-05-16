import amqp, { Channel, Connection } from "amqplib";
import { SendConfigInterface } from "./SendConfigInterface";

require("dotenv").config();

export class Send implements SendConfigInterface {
  async publisher(message?: string): Promise<void> {
    const connection: Connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST,
    });
    const channel: Channel = await connection.createChannel();
    await channel.assertExchange(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "fanout",
      {
        durable: true,
        autoDelete: false,
        arguments: null,
      }
    );
    await channel.assertQueue(process.env.RABBITMQ_QUEUE_ONE, {
      durable: true,
      exclusive: false,
      autoDelete: false,
      arguments: null,
    });
    await channel.bindQueue(
      process.env.RABBITMQ_QUEUE_ONE,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      ""
    );
    await channel.sendToQueue(
      process.env.RABBITMQ_QUEUE_ONE,
      Buffer.from(message),
      {
        persistent: true,
      }
    );
    await channel.sendToQueue(
      process.env.RABBITMQ_QUEUE_SEC,
      Buffer.from(message),
      {
        persistent: true,
      }
    );
    await channel.close();
    await connection.close();
  }
}
