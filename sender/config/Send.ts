import amqp from "amqp-ts";
import { SendConfigInterface } from "./SendConfigInterface";

require("dotenv").config();

export class Send implements SendConfigInterface {
  connect(): void {
    const connection = new amqp.Connection(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}${process.env.RABBITMQ_VHOST}`
    );
    const exchange = connection.declareExchange(
      process.env.RABBITMQ_WORKER_EXCHANGE,
      "fanout",
      {
        durable: true,
        autoDelete: false,
        arguments: null
      }
    );

    const queue1 = connection.declareQueue(process.env.RABBITMQ_QUEUE_ONE, {
      durable: true,
      exclusive: false,
      autoDelete: false,
      arguments: null
    });

    const queue2 = connection.declareQueue(process.env.RABBITMQ_QUEUE_SEC, {
      durable: true,
      exclusive: false,
      autoDelete: false,
      arguments: null
    });

    queue1.bind(exchange);
    queue2.bind(exchange);

    connection.completeConfiguration().then(() => {
      const message = new amqp.Message("Hello queues");
      exchange.send(message);
    });

    connection.close().then(console.log("Closing channel"));
  }
}
