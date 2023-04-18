import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    },
  },
} as ICacheConfig;
