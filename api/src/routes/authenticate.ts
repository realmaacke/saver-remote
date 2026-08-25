"use strict";
import { Router, Request, Response } from "express";
import authResponse from "../dto/authResponse";

// DTO
import {
    loginDTO
} from "../dto/auth";
import { Auth } from "../models/auth";
import { database } from "../models/database";

const router = Router();

// Used to renew token.
router.get("/renew", (req : Request, res: Response) => {
    const authHeader = req.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json(authResponse(
            null,
            false,
            "Invalid token"
        ));
    }

    return res.status(200).json(Auth.renew_token(authHeader));
});

// Login => token
router.post("/connect", async (req: Request, res: Response) => {
    const result = loginDTO.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(authResponse(
            null,
            false,
            "Invalid type or structure of params."
        ));
    }
    // check db and stuff to ensure that it is correct.
    const username = result.data.username;
    const password = result.data.password;
    
    const connectResult = await database.connectUser(username, password);
    
    if (!connectResult.success) {
        return res.status(400).json(authResponse(null, connectResult.success, connectResult.message));
    }

    return res.status(200).json(authResponse(
        connectResult.data?.token ?? null,
        connectResult.success,
        connectResult.message
    ));
});

router.post('/create', async  (req: Request, res: Response) => {
    const result = loginDTO.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json(authResponse(
            null,
            false,
            "Invalid type or structure of params"
        ));
    }
    const { username, password } = result.data;

    const creationResult = await database.createUser(username, password);

    if (!creationResult.success) {
        return res.status(400).json(authResponse(null, creationResult.success, creationResult.message));
    }

    return res.status(200).json(authResponse(null, creationResult.success, creationResult.message))
});

export default router;