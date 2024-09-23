/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
// import { logger, errorLogger } from './shared/logger';
import { Server } from "http";
import config from "./config";

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception is detected", error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected successfully.");

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("failed to connect to database", error);
  }

  process.on("unhandledRejection", (error) => {
    // eslint-disable-next-line no-console
    console.log(
      "Unhandled Rejection is detected. We are closing our server",
      error
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on("SIGTERM", () => {
  console.log("SIGTERM is receieved");
  if (server) {
    server.close();
  }
});
