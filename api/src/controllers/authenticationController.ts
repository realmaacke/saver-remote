"use strict";
import type { Request, Response } from "express";

export const authenticateUser = (req: Request, res: Response) => {
    // Take key + username
    // Check if key in database is valid to the key that is sent in
    
    // TODO:: RESEARCH ABOUT "JWT" like features
    
    // if success -> 200
    // No middleware required?


    // Need of a limiter here especialy

    // model authDetails will be used for this, either incoming or outbound or both.
}

export const signKey = (req: Request, res: Response) => {
    // Add key in database to user.
    // Return 200 if success
    // Attach middleware
}

export const revokeKey = (req: Request, res: Response) => {
    // Grab the key in database and delete it.
    // Return 200 if success
    // Attatch middleware
}