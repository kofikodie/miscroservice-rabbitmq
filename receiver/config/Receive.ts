import { ReceiverInterface } from "./ReceiverInterface";
import amqp = require("amqplib/callback_api");

require("dotenv").config();

export class Receive implements ReceiverInterface {
  receiver(): void {
    amqp.connect(
      {
        protocol: process.env.RABBITMQ_PROTOCOL,
        hostname: process.env.RABBITMQ_HOST,
        port: parseInt(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        vhost: process.env.RABBITMQ_VHOST
      },
      (err, conn) => {
        if (err) {
          throw err;
        }
        conn.createChannel((err, ch) => {
          if (err) {
            throw err;
          }
          ch.assertQueue(process.env.RABBITMQ_QUEUE_ONE, {
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null
          });
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            process.env.RABBITMQ_QUEUE_ONE
          );
          ch.consume(
            process.env.RABBITMQ_QUEUE_ONE,
            msg => {
              console.log(" [x] Received %s", msg.content.toString());
              ch.ack(msg);
            },
            {
              noAck: false
            }
          );
        });
      }
    );
  }
}
