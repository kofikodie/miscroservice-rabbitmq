import amqp from "amqplib/callback_api";
import { ClientHttp2Session } from "http2";
import { SendConfigInterface } from "./SendConfigInterface";

require("dotenv").config();

export class Send implements SendConfigInterface {
  connect(): void {
    amqp.connect(
      {
        hostname: process.env.RABBITMQ_HOST,
        port: parseInt(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        vhost: process.env.RABBITMQ_VHOST
      },
      (err: ClientHttp2Session, conn) => {
        conn.createChannel((err, ch) => {
          // set exchange that is being used
          ch.assertExchange(process.env.RABBITMQ_WORKER_EXCHANGE, "fanout", {
            durable: true,
            autoDelete: false,
            arguments: null
          });
          // set queue that is being used
          ch.assertQueue(
            process.env.RABBITMQ_QUEUE,
            { durable: true, exclusive: false, autoDelete: false, arguments: null },
            (err, q) => {
              console.log(
                " [*] Waiting for messages in %s. To exit press CTRL+C",
                q.queue
              );
              // bind the queue to the exchange
              ch.bindQueue(q.queue, process.env.RABBITMQ_WORKER_EXCHANGE, "");
              // consume from the queue, one message at a time.
              ch.consume(
                q.queue,
                function(msg) {
                  console.log("Message received: %s", msg.content.toString());
                  //save message to db
                  //acknowledge receipt of message to amqp
                  console.log("Acknowledging message");
                  ch.ack(msg, true);
                },
                { noAck: false }
              );
            }
          );
        });
      }
    );
  }
}
