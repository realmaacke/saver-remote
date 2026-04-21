"use strict";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import StorageManagement from "./src/storageManagement.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * TODO
 * 1. Add headers for credentials
 * 2. Add storage for ssh keys
 * 
 * Restructure user storage
 * 
 * proposal:
 *  user -> {
 *    repositories: {
 *      name -> files
 *    }
 *    
 *    user -> ssh_keys ...
 *    
 * }
 * 
 */

app.post("/users/:user/invoke_key", upload.any(), (req, res) => {
    try {
        const user = StorageManagement.safeSegment(req.params.user);

        console.log(req.files);

        return res.status(200).json(StorageManagement.storeKeys(req.files, user));
    } catch (error) {
        console.error(error);
    
        return res.status(500).json({
            ok: false,
            error: null
        })
    }
});

app.post("/users/:user/projects/:project/upload", upload.any(), (req, res) => {
    try {
        const user = StorageManagement.safeSegment(req.params.user);
        const project = StorageManagement.safeSegment(req.params.project);

        if (!req.body.manifest) {
            return res.status(400).json({
                ok: false,
                error: "Missing manifest"
            });
        }

        const manifest = JSON.parse(req.body.manifest);
        if (!Array.isArray(manifest)) {
            return res.status(400).json({
                ok: false,
                error: "Manifest must be an array"
            });
        }

        return res.status(200).json(
            StorageManagement.storeProject(
                manifest,
                req.files,
                user,
                project,
                upload
            )
        );
    } catch (err) {
        return res.status(500).json({
            ok: false,
            error: err.message
        });
    } finally {
        return res.status(200).json({
            ok: true,
            error: "finaly reached"
        });
    }
});

app.listen(9019, () => {
    console.log("Saver is starting");
});