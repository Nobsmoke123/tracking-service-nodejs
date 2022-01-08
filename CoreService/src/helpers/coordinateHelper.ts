import { Coordinates } from "coordinates";
import { Car } from "../entity/Car";
import eventEmitter from "../events/event_emitter";

export class CoordinateHelper {
  static calculateDistanceBetweenCoordinates(
    pointA: Coordinates,
    pointB: Coordinates
  ): Number {
    const pointALatitude = Number(pointA.latitude);
    const pointALongitude = Number(pointA.longitude);

    const pointBLatitude = Number(pointB.latitude);
    const pointBLongitude = Number(pointB.longitude);

    /**
     * Haversine
      formula: 	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
      c = 2 ⋅ atan2( √a, √(1−a) )
      d = R ⋅ c
     */
    // φ is latitude, λ is longitude,
    const R = 6371e3; // R is earth’s radius (mean radius = 6,371km) in metres
    const φ1 = (pointALatitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (pointBLatitude * Math.PI) / 180;
    const Δφ = ((pointBLatitude - pointALatitude) * Math.PI) / 180;
    const Δλ = ((pointBLongitude - pointALongitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2); // a is the square of half the chord length between the points.

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // c is the angular distance in radians

    return R * c; // distance in metres
  }
  
  static checkForEquality(
    oldCoordinates: Coordinates,
    newCoordinates: Coordinates,
    car: Car
  ): void {
    if (
      oldCoordinates.longitude !== newCoordinates.longitude ||
      oldCoordinates.latitude !== newCoordinates.latitude
    ) {
      eventEmitter.emit("coordinates_change", car);
    }
  }
}
