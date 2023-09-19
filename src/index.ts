import config from "./config/config";
import server from "./server";

async function startServer() {
  const app = server();
  const host = config.HOST;
  const port = parseInt(config.PORT ?? "8000");
  const swaggerUrl = config.SWAGGER_URL;

  try {
    await app.listen({ port });
    console.log(`Server is listening at ${host}:${port}`);
    console.log(`Server Swagger UI is available at ${swaggerUrl}`);
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

startServer();
