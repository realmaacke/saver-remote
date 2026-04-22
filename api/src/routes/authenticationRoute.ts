"use strict";
import { Router } from "express";
import multer from "multer";

import type {
    challengeKeyParams,
    invokeKeyParams
} from "../models/authData.js";

import {
    challengeKeyController,
    invokeKeyController,
    loginController
} from "../controllers/authenticationController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post<invokeKeyParams>(
    "/user/:user/invoke_key",
    upload.any(),
    invokeKeyController
);

router.post<challengeKeyParams>(
    "/user/:user/challenge",
    upload.any(),
    challengeKeyController
);

router.post(
    "/login",
    loginController
)

export default router;