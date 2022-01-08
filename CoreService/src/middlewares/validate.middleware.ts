import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const error = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for (const i of errors) {
        error.push(i)
      }
      return res.status(400).json({errors})
    }
    return next();
}

export default validate;