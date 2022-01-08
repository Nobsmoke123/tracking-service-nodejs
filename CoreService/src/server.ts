import "reflect-metadata";
import app from "./app";
import { createConnection } from "typeorm";

/**
 * Start Express server.
 */

try {
  const server = app.listen(app.get("port"), () => {
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("Press CTRL-C to stop \n");
  });
} catch (error) {
  console.log("Error from the app.");
  console.log(`Error name: ${error.name}`);
  console.log(`Error message: ${error.message}`);
  console.log(`Error stack: ${error.stack}`);
}
