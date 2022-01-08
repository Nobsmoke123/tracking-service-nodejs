import { getConnection } from "typeorm";
import { Coordinates } from "coordinates";
import { CoordinateHelper } from "../helpers/coordinateHelper";
import { Car } from "../entity/Car";

export class CarService {

  async createCar(car: {
    reference: string;
    latitude: string;
    longitude: string;
  }): Promise<Car> {
    try {
      const carRepo = await getConnection().getRepository(Car).create(car);
      return await getConnection().getRepository(Car).save(carRepo);
    } catch (error) {
      return error.message;
    }
  }

  async findAllCars(): Promise<Car[]> {
    try {
      return await getConnection().getRepository(Car).find();
    } catch (error) {
      return error.message;
    }
  }

  async findCarById(carId: string): Promise<Car> {
    try {
      return await getConnection().getRepository(Car).findOne(carId);
    } catch (error) {
      return error.message;
    }
  }

  async updateCarCoordinates(
    carReference: string,
    coordinates: Coordinates
  ): Promise<Car> {
    try {
      const car = await getConnection().getRepository(Car).findOne(carReference);

      if (!car) throw new Error("Car is not registered on this service.");

      const previousCoordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };

      // Check if the coordinates changed.
      CoordinateHelper.checkForEquality(previousCoordinates, coordinates, car);

      // update the car coordinates.
      getConnection().getRepository(Car).merge(car, {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      return await getConnection().getRepository(Car).save(car);
    } catch (error) {
      return error.message;
    }
  }
}
