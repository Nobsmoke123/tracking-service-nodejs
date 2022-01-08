import { Coordinates } from "coordinates";
import { NextFunction, Request, Response } from "express";
import { CarService } from "../services/car.service";

export class CarController {
  private carService;

  constructor(service: CarService) {
    this.carService = service;
  }

  public getCars = async (req: Request, res: Response, next: NextFunction) => {
    const cars = await this.carService.findAllCars();
    return res.status(200).json({ data: cars });
  };

  public addCar = async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      reference: req.body.reference,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };

    const car = await this.carService.createCar(data);

    return res.status(201).json({ data: car });
  };

  public updateCarCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    const coordinates : Coordinates = {
      latitude: String(req.body.latitude),
      longitude: String(req.body.longitude),
    };
    const carReference = req.params.reference;

    try {
      const car = await this.carService.updateCarCoordinates(carReference, coordinates);
      return res.status(201).json({ data: car });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
}
