import * as ws from "ws";
import { Request, NextFunction } from "express";

export const clientConnectionVerifyer = (
  client: ws,
  req: Request,
  next: NextFunction
) => {
  if (!req.query.latitude) {
    client.send(
      JSON.stringify({
        event: "error",
        data: "latitude is required",
      })
    );

    if (!req.query.longitude) {
      client.send(
        JSON.stringify({
          event: "error",
          data: "longitude is required",
        })
      );
      client.close();
    }

    client.close();
  }
  next();
};
