"use strict";
import { Router } from "express";
import multer from "multer";

import {
    push_to_repository
} from "../controllers/repositoryController.js";
import type {pushRepoParams } from "../models/repoData.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post<pushRepoParams>(
    "/user/:user/project/:project/push",
    upload.any(),
    push_to_repository
);


export default router;