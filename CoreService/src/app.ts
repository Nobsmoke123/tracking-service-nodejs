import express from "express";
import app from "./helpers";
import appRouter from "./routes";

/**
 * Set up the app configs
 */
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

export default app;
