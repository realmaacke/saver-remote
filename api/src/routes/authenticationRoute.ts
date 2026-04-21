"use strict";

import { Router } from "express";
import type { Request, Response } from "express";

import {
    authenticateUser,
    signKey,
    revokeKey
} from "../controllers/authenticationController.js";

const router = Router();

router.get("/auth", (_: Request, res: Response) => {
    res.status(200).json({paths: ["/login", "/invoke_key", "/revoke_key"]})
});

router.get("/auth/login", authenticateUser);
router.get("/auth/invoke_key", signKey);
router.get("/auth/revoke_key", revokeKey)