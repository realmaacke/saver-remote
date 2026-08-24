"use strict";
import { Router } from "express";
import authResponse from "../dto/authResponse";

// DTO
import {
    loginDTO
} from "../dto/auth";
import { Auth } from "../models/auth";

const router = Router();

// Used to renew token.
router.get("/renew", (req, res) => {
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
router.post("/connect", (req, res) => {
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
    
    console.log(`User: ${username} is trying to connect`);
    return res.status(200).json(Auth.login_user(username, password));
});

export default router;