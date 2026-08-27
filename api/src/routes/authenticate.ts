"use strict";
import { Router, Request, Response } from "express";
import authResponse, { genericResponse } from "../dto/authResponse";

// DTO
import {
    loginDTO
} from "../dto/auth";
import { Auth } from "../models/auth";
import { database } from "../models/database";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/getUserInfo", authenticate, async (req: Request, res: Response) => {
    // It will never be empty since authenticate is middleware. 
    const authHeader = req.get("Authorization") ||"";
    const userId_res = Auth.get_userId(authHeader);

    if (!userId_res.success || !userId_res.userId) {
        return res.status(400).json(genericResponse(
            userId_res.userId,
            false,
            "Could not retrive usedId"
        ));
    }

    const result = await database.getUserById(userId_res.userId);

    if (!result.success || !result.data) {
        return res.status(400).json(genericResponse(
            null,
            false,
            "Could not retrive userId"
        ));
    }

    return res.status(200).json({
        userId: result.data.user_id,
        username: result.data.username,
        success: result.success,
        message: result.message
    });
});

// Used to renew token.
router.get("/renew", authenticate, (req : Request, res: Response) => {
    // It will never be empty since authenticate is middleware.
    const authHeader = req.get("Authorization") || "";
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