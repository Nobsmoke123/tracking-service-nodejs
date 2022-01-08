import { check } from "express-validator";
import validate from "./validate.middleware";

export const createCarVerifyer = () => {
  return [
    check("longitude")
      .notEmpty()
      .withMessage("longitude is required")
      .isNumeric()
      .withMessage("longitude must be a number"),
    check("name")
      .isString()
      .withMessage("name must be a string")
      .notEmpty()
      .withMessage("name is required"),
    check("latitude")
      .notEmpty()
      .withMessage("latitude is required")
      .isNumeric()
      .withMessage("latitude must be a number"),
    
    validate,
  ];
};
