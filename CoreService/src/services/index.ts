import { CarTrackerService } from "./car_tracker.service";
import { CarService } from "./car.service";

export const carService = new CarService();
export const carTrackingService = new CarTrackerService(carService);