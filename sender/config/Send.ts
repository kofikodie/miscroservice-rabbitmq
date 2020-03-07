import amqp = require("amqplib/callback_api");
import { SendConfigInterface } from "./SendConfigInterface";
import { ClientHttp2Session } from "http2";
import { Replies } from "amqplib";
import AssertQueue = Replies.AssertQueue;

require("dotenv").config();

export class Send implements SendConfigInterface {
  publisher(message?: string): void {
    amqp.connect(
      {
        protocol: process.env.RABBITMQ_PROTOCOL,
        hostname: process.env.RABBITMQ_HOST,
        port: parseInt(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        vhost: process.env.RABBITMQ_VHOST
      },
      (err: ClientHttp2Session, conn) => {
        if (err) {
          throw err;
        }
        conn.createChannel((err, ch) => {
          if (err) {
            throw err;
          }
          ch.assertExchange(process.env.RABBITMQ_WORKER_EXCHANGE, "fanout", {
            durable: true,
            autoDelete: false,
            arguments: null
          });
          ch.assertQueue(
            process.env.RABBITMQ_QUEUE_ONE,
            {
              durable: true,
              exclusive: false,
              autoDelete: false,
              arguments: null
            },
            (err, q: AssertQueue) => {
              ch.bindQueue(q.queue, process.env.RABBITMQ_WORKER_EXCHANGE, "");
            }
          );
          ch.assertQueue(
            process.env.RABBITMQ_QUEUE_SEC,
            {
              durable: true,
              exclusive: false,
              autoDelete: false,
              arguments: null
            },
            (err, q: AssertQueue) => {
              ch.bindQueue(q.queue, process.env.RABBITMQ_WORKER_EXCHANGE, "");
            }
          );
          ch.sendToQueue(process.env.RABBITMQ_QUEUE_ONE, Buffer.from(message), {
            persistent: true
          });
          ch.sendToQueue(process.env.RABBITMQ_QUEUE_SEC, Buffer.from(message), {
            persistent: true
          });
          console.log(`[x] Sent ${message}`);
        });
      }
    );
  }
}
