import amqp = require("amqplib/callback_api");
import { SendConfigInterface } from "./SendConfigInterface";
import { ClientHttp2Session } from "http2";
import { Replies } from "amqplib";
import AssertQueue = Replies.AssertQueue;

require("dotenv").config();

export class Send implements SendConfigInterface {
  connect(): void {
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
        conn.createChannel((err, ch) => {
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
              console.log(
                " [*] Waiting for messages in %s. To exit press CTRL+C",
                q.queue
              );
              ch.bindQueue(q.queue, process.env.RABBITMQ_WORKER_EXCHANGE, "");
            }
          );
          ch.sendToQueue(
            process.env.RABBITMQ_QUEUE_ONE,
            Buffer.from("hello motherfather"),
            {
              persistent: true
            }
          );
          console.log(" [x] Sent hello motherfather");
        });
      }
    );
  }
}
