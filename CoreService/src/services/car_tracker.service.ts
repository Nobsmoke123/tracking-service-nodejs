import { CarService } from "./car.service";
import * as ws from "ws";
import EventEmitter from "../events/event_emitter";
import { Car } from "../entity/Car";
import { Coordinates } from "coordinates";
import { Client } from "clients";
import { CoordinateHelper } from "../helpers/coordinateHelper";

export class CarTrackerService {
  public clients: Client[] = [];
  private carService;

  constructor(service: CarService) {
    this.setupService();
    this.carService = service;
  }

  broadcastCarCoordinateChangeToSubscribedClients(car: Car): void {
    const clients = this.clients.filter(
      (client) => client.carReference === car.reference
    );
    for (const client of clients) {
      const throttleTimeout = 5000;

      if (Date.now() - client.broadcastedAt < throttleTimeout) return;

      client.socketClient.send(
        JSON.stringify({
          event: "coordinate_update",
          data: {
            latitude: car.latitude,
            longitude: car.longitude,
          },
        })
      );
      client.broadcastedAt = Date.now();
    }
  }

  checkCarProximityToClient(car: Car): void {
    const clients = this.clients.filter(
      (client) => client.carReference === car.reference
    );

    for (const client of clients) {
      const distance = CoordinateHelper.calculateDistanceBetweenCoordinates(
        client.coordinates,
        { longitude: car.longitude, latitude: car.latitude }
      );

      if (distance <= 100 && Number(distance) % 10 === 0) {
        client.socketClient.send(
          JSON.stringify({
            event: "proximity_message",
            data: {
              message: `Car with reference ${car.reference} is ${distance} meter(s) away from you.`,
              distance,
            },
          })
        );
      }
    }
  }

  removeClient(carReference: string) {
    this.clients = this.clients.filter((client) => client.carReference !== carReference);
  }
  
  setupService() {
    EventEmitter.on("coordinates_change", this.broadcastCarCoordinateChangeToSubscribedClients);
    EventEmitter.on("coordinates_change", this.checkCarProximityToClient);
  }

  async trackCar(
    carId: string,
    socketClient: ws,
    coordinates: Coordinates
  ): Promise<void> {
    const car = await this.carService.findCarById(carId);

    socketClient.send(
      JSON.stringify({
        event: "coordinates_update",
        data: {
          latitude: car.latitude,
          longitude: car.longitude,
        },
      })
    );

    //  create the client
    const client: Client = {
      id: this.clients.length + 1,
      socketClient,
      carReference: carId,
      coordinates,
      broadcastedAt: Date.now(),
    };

    //  Add the client to the list of clients
    this.clients.push(client);

    this.checkCarProximityToClient(car)

    socketClient.on("close", () => this.removeClient(client.carReference));
  }
}
