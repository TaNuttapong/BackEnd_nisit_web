import fastify from "fastify";
import config from "./config/config";

const server = fastify();
const port = parseInt(config?.PORT || "8000");

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
