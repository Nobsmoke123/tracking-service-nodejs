import { carService, carTrackingService } from "../services";
import { CarController } from "./car.controller";
import { CarTrackerController } from "./car_tracker.controller";

export const carController = new CarController(carService);
export const carTrackerController = new CarTrackerController(carTrackingService);
