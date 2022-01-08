import { NextFunction, Request } from "express";
import * as ws from "ws";
import { CarTrackerService } from "../services/car_tracker.service";
import { Coordinates } from "../types/coordinates";

export class CarTrackerController {
  public carTrackerService;

  constructor(service: CarTrackerService) {
    this.carTrackerService = service;
  }

  public connectToService = async (socketClient: ws, req: Request, next: NextFunction) => {
    const carReference = req.params.reference;
    const coordinates : Coordinates  = {
      latitude: req.query.latitude as string,
      longitude: req.query.longitude as string,
    };
    
    try {
      await this.carTrackerService.trackCar(carReference, socketClient, coordinates);
    } catch (e) {
      socketClient.send(
        JSON.stringify({
          event: "error",
          data: e.message,
        })
      );
      socketClient.close();
    }
  };
}
