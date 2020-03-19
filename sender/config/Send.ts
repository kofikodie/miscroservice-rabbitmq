import amqp from "amqplib";
import { SendConfigInterface } from "./SendConfigInterface";

require("dotenv").config();

export class Send implements SendConfigInterface {
  async publisher(message?: string): Promise<void> {
    const connection = await amqp.connect({
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      vhost: process.env.RABBITMQ_VHOST
    });
    const channel = await connection.createChannel();
    await channel.assertExchange(process.env.RABBITMQ_WORKER_EXCHANGE, "topic", {
      durable: true,
      autoDelete: false
    });
    await channel.assertQueue(process.env.RABBITMQ_QUEUE_ONE, {
      durable: true,
      exclusive: false,
      autoDelete: false
    });
    await channel.assertQueue(process.env.RABBITMQ_QUEUE_SEC, {
      durable: true,
      exclusive: false,
      autoDelete: false
    });
    await channel.assertQueue(process.env.RABBITMQ_QUEUE_THR, {
      durable: true,
      exclusive: false,
      autoDelete: false
    });
    await channel.bindQueue(
      process.env.RABBITMQ_QUEUE_ONE,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "*.image.*"
    );
    await channel.bindQueue(
      process.env.RABBITMQ_QUEUE_SEC,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "#.image"
    );
    await channel.bindQueue(
      process.env.RABBITMQ_QUEUE_THR,
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "image.#"
    );
    await channel.publish(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "convert.image.bmp",
      Buffer.from(message + " convert.image.bmp")
    );
    await channel.publish(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "convert.bitmap.image",
      Buffer.from(message + " convert.bitmap.image")
    );
    await channel.publish(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "image.converted",
      Buffer.from(message + " image.converted")
    );
    await channel.close();
    await connection.close();
  }
}
