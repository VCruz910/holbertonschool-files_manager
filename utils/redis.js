const redis = require('redis');
const { promisify } = require('util');

// A Class to create the redis client for project
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log('Redis client not connected to the server: ${error}');
    });
  }

  // Connection to Redis Validator
  isAlive() {
    return this.client.connected;
  }

  // Getter Function
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  // Setter Function
  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  // Delete Function
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
