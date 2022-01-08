import app from "./app";
import { createConnection } from "typeorm";
import { Car } from "./entity/Car";

/**
 * Start Express server.
 */

createConnection()
  .then((db) => {
    const userRepository = db.getRepository(Car);
    
    console.log("Database connection active:__ ");

    try {
      console.log("The repository is");
      console.log(userRepository);

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
  })
  .catch((error) => {
    console.log("An error from the database");
    console.log(`Error name: ${error.name}`);
    console.log(`Error message: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
  });
