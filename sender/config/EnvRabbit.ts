import * as typedEnv from '@freighthub/typed-env';
import { NonEmptyString, PortNumber } from '@freighthub/typed-env/dist/src/types';
import dotenv from 'dotenv';

dotenv.config();

const schema = typedEnv.envSchema({
    rabbitmq: typedEnv.envGroup(
        {
            PORT: PortNumber,
            HOST: NonEmptyString,
            PROTOCOL: NonEmptyString,
            USER: NonEmptyString,
            PASSWORD: NonEmptyString,
            VHOST: NonEmptyString,
            WORKER_EXCHANGE: NonEmptyString,
            QUEUE_ONE: NonEmptyString,
            QUEUE_SEC: NonEmptyString,
        },
        'RABBITMQ',
    ),
});

const { rabbitmq } = typedEnv.loadFromEnv(schema);

export default rabbitmq;
