"use strict";
import { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth";
import authResponse from "../dto/authResponse";
export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.get("Authorization");
    const authVerification = Auth.verify_token(authHeader || "");
    
    
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json(authResponse(
            null,
            false,
            "Invalid header"
        ));
    }

    if (!authVerification.success) {
        return res.status(401).json(authVerification);
    }
    next();
}