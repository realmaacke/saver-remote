"use strict";
import { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth";
export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    if (!Auth.verify_token(authHeader)) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    next();
}