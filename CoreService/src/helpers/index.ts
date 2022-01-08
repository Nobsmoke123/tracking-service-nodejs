import express from "express";
import { Application } from "express";
import { createConnection } from "typeorm";

import expressWs from 'express-ws';

const app: Application = express();
expressWs(app);

createConnection()
  .then(async (connection) => console.log("Database connection active:__ "))
  .catch((error) => {
    console.log("An error from the database");
    console.log(`Error name: ${error.name}`);
    console.log(`Error message: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
  });

export default app;