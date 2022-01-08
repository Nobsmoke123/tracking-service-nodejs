import { Router } from "express";
import { carController, carTrackerController } from "../controllers";
import { createCarVerifyer } from "../middlewares/create_car_verifyer";
import { updateCarCoordinates } from "../middlewares/updateCarCoordinates";
import { clientConnectionVerifyer } from "../middlewares/client_connection_verifyer";

const router = Router();

router.get("/cars", carController.getCars);
router.post("/cars", createCarVerifyer(), carController.addCar);
router.put("/cars/:reference/coordinates", updateCarCoordinates(), carController.updateCarCoordinates);

//Websocket route
router.ws('/track-car/:reference/trackCar', clientConnectionVerifyer, carTrackerController.connectToService);

export default router;
