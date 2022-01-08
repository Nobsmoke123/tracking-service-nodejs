import { check } from "express-validator";
import validate from "./validate.middleware";

export const updateCarCoordinates = () => {
  return [
    check("longitude")
      .notEmpty()
      .withMessage("longitude is required")
      .isNumeric()
      .withMessage("longitude must be a number"),
    validate,
    check("latitude")
      .notEmpty()
      .withMessage("latitude is required")
      .isNumeric()
      .withMessage("latitude must be a number"),
  ];
};
