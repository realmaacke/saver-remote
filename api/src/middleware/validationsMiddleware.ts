"use strict";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { projectResponse } from "../dto/project";

export function validateParams<T extends z.ZodType>(schema: T) {
  return (req: Request<z.infer<T>>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
        return res.status(400).json(projectResponse(
            false,
            null,
            "Parameters are invalid"
        ));
    }
    req.params = result.data;
    next();
  };
}