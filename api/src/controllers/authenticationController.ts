"use strict";
import path from "path";
import fs from "fs";

import crypto from "crypto";

import SshPK from "sshpk";

import { safeSegment } from "../utils.js";

import type { Request } from "express";

import type { RequestHandler } from "express";
import type {
    invokeKeyParams,
    invokeKeyType,
    challengeKeyParams,
    challengeKeyBody,
    challengePayload
} from "../models/authData.js";

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

function challengeKey(publicKey: any, message: any, signatureBase64: any) {
    try {
        const signature = Buffer.from(signatureBase64, "base64");
        return crypto.verify("sha256", Buffer.from(message, "utf8"), { key: publicKey, format: "pem"}, signature);

    } catch (error) {
        console.error(`Could not challenge key, error: `, error);
        return false;
    }
}

function convertRsaToPEM(file: Buffer): string {
    const sshKey: string = file.toString("utf8").trim();
    return SshPK.parseKey(sshKey, "ssh").toString("pem");
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
        fs.writeFileSync(targetPath, convertRsaToPEM(file.buffer));
    } catch (error) {
        console.error("authenticationController: (invokeKeyController) Error: ", error);
        return res.status(400).json({ ok: false, error: error});
    }
    return res.status(200).json({ ok: true, error: null});
}

export const challengeKeyController: RequestHandler<
    challengeKeyParams,
    any,
    challengeKeyBody
> = (req, res) => {
    const user: string = req.params.user;
    const body: challengeKeyBody = req.body;

    if (!body.json || typeof body.json !== "string") {
        throw new Error("Undefined json");
    }

    const jsonBody: challengePayload = JSON.parse(body.json);

    if (!jsonBody || typeof jsonBody.message !== "string" || typeof jsonBody.signature !== "string") {
        throw new Error("json is invalid");
    }

    const keyFolder: string  = path.resolve("storage", user, "keys");
    
    const allKeys: string[] = fs.readdirSync(keyFolder);

    let validKey = false;
    for (const keyFile of allKeys) {
        let fileContent = fs.readFileSync((keyFolder + "/" + keyFile), {encoding: 'utf8'}).trim();
        
        if (challengeKey(fileContent, jsonBody.message, jsonBody.signature)) {
            validKey = true;
            break;
        }
    }

    if (!validKey) {
        return res.status(401).json({ok: false, error: "could not match keys"})
    }

    return res.status(200).json({
        ok: true,
        error: null
    });
}