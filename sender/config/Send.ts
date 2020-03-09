import amqp, { Channel, Connection } from "amqplib";
import { SendConfigInterface } from "./SendConfigInterface";
require("dotenv").config();

export class Send implements SendConfigInterface {
  async publisher(message?: string): Promise<void> {
    let connection: Connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST
    });
    let channel: Channel = await connection.createChannel();
    await channel.assertExchange(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "direct",
      {
        durable: true,
        autoDelete: false,
        arguments: null
      }
    );
    const queueOne = await channel.assertQueue(
      process.env.RABBITMQ_QUEUE_ONE,
      {
        durable: true,
        exclusive: false,
        autoDelete: false,
        arguments: null
      }
    );
    const queueSec = await channel.assertQueue(
      process.env.RABBITMQ_QUEUE_SEC,
      {
        durable: true,
        exclusive: false,
        autoDelete: false,
        arguments: null
      }
    );
    await channel.bindQueue(
      queueOne.queue,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "info"
    );

    await channel.bindQueue(
      queueSec.queue,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "warning"
    );
    await channel.publish(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "warning",
      Buffer.from(message)
    );
    await channel.close();
    await connection.close();
  }
}
