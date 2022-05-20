const dotenv = require('dotenv');
dotenv.config();
const redis = require('redis');
const {
    REDIS_HOST,
    REDIS_PORT
  } = process.env;

const redisClient = redis.createClient({
    socket: {
        port: REDIS_PORT,
        host: REDIS_HOST
    }
});

(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));

  await redisClient.connect();

  await redisClient.ping();
})();

module.exports = {
redisClient
}