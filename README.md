# miscroservice-rabbitmq

### Usage
create .env
```sh
RABBITMQ_HOST=$YOUR_HOST_VALUE
RABBITMQ_PORT=$YOUR_PORT_VALUE
RABBITMQ_USER=$YOUR_USER_VALUE
RABBITMQ_PASSWORD=$YOUR_PASSWORD_VALUE
RABBITMQ_VHOST=$YOUR_VHOST_VALUE
RABBITMQ_WORKER_EXCHANGE=$YOUR_EXCHANGE_VALUE
RABBITMQ_QUEUE_ONE=$YOUR_QUEUE_NAME_VALUE
RABBITMQ_QUEUE_SEC=$YOUR_QUEUE_NAME_VALUE

```
start docker containers
```sh
$ docker build -t nameOfYourImage:version .
```

go to RabbitMQ management page
```
http://localhost:15672/
```

produce a message
```sh
$ docker run --rm nameOfYourImage:version npm run send
```

start a consumer
```sh
$ docker run --rm nameOfYourImage:version npm run consume
```
