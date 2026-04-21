"use strict";
import path from "path";
import fs from "fs";

import { safeSegment } from "../utils.js";

import type { Request } from "express";

import type { RequestHandler } from "express";
import type { invokeKeyParams, invokeKeyType } from "../models/authData.js";

// Yet another ugly function since express is stupid. (asserts to cast it to the type)
function assertFileType(file: any): asserts file is invokeKeyType {
  if (
    !file ||
    typeof file.fieldname !== "string" ||
    typeof file.originalname !== "string" ||
    typeof file.encoding !== "string" ||
    typeof file.mimetype !== "string" ||
    !Buffer.isBuffer(file.buffer)
  ) {
    throw new Error("Invalid file format");
  }
}

function hasFiles(req: Request): req is Request & { files: Express.Multer.File[] } {
    return Array.isArray(req.files);
}

export const invokeKeyController: RequestHandler<
    invokeKeyParams,
    any,
    any
> = (req, res) => {
    if (!hasFiles(req) || req.files.length === 0) {
        return res.status(400).json({ ok: false, error: "No files uploaded"});
    }
    const user = safeSegment(req.params.user);

    try {
        assertFileType(req.files[0]);
        const file: invokeKeyType = req.files[0];
        
        const projectRoot = path.resolve("storage", user, "keys");
        const targetPath = path.join(projectRoot, file.originalname);

        fs.mkdirSync(path.dirname(targetPath), {recursive: true});
        fs.writeFileSync(targetPath, file.buffer);
    } catch (error) {
        console.error("authenticationController: (invokeKeyController) Error: ", error);
        return res.status(400).json({ ok: false, error: error});
    }
    return res.status(200).json({ ok: true, error: null});
}

export const challengeKeyController = () => {

}