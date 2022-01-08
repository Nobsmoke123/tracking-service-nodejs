import { getConnection } from "typeorm";
import { Coordinates } from "coordinates";
import { CoordinateHelper } from "../helpers/coordinateHelper";
import { Car } from "../entity/Car";

export class CarService {
  private carRepository = getConnection().getRepository(Car);

  async createCar(car: {
    reference: string;
    latitude: string;
    longitude: string;
  }): Promise<Car> {
    try {
      const carRepo = this.carRepository.create(car);
      return await this.carRepository.save(carRepo);
    } catch (error) {
      return error.message;
    }
  }

  async findAllCars(): Promise<Car[]> {
    try {
      console.log("The repository is:");
      console.log(this.carRepository);
      // return await this.carRepository.find();
    } catch (error) {
      return error.message;
    }
  }

  async findCarById(carId: string): Promise<Car> {
    try {
      return await this.carRepository.findOne(carId);
    } catch (error) {
      return error.message;
    }
  }

  async updateCarCoordinates(
    carReference: string,
    coordinates: Coordinates
  ): Promise<Car> {
    try {
      const car = await this.carRepository.findOne(carReference);

      if (!car) throw new Error("Car is not registered on this service.");

      const previousCoordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };

      // Check if the coordinates changed.
      CoordinateHelper.checkForEquality(previousCoordinates, coordinates, car);

      // update the car coordinates.
      this.carRepository.merge(car, {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
      return await this.carRepository.save(car);
    } catch (error) {
      return error.message;
    }
  }
}
