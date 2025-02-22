import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

redisClient.on("Connect", () => {
  console.log("Redis client connected");
});

redisClient.on("disconnect", () => {
  console.log("Redis client disconnected");
});

export default redisClient;
