import { Coordinates } from "coordinates";
import * as ws from "ws";

export interface Client{
  id: number;
  socketClient: ws;
  coordinates: Coordinates;
  carReference: string;
  broadcastedAt: number;
}