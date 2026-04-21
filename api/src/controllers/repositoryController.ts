"use strict";
import fs from "fs";
import path from "path";

// Types
import type {
    Request,
    RequestHandler
} from "express";

import type {
    manifestType,
    pushRepoBody,
    pushRepoParams,
    pushRepoFileType
} from "../models/repoData.js";

import { safePaths, safeSegment } from "../utils.js";

// Yet another ugly function since express is stupid. (asserts to cast it to the type)
function assertRepoFile(file: any): asserts file is pushRepoFileType {
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

// I give up
function assertManifest(manifest: any): asserts manifest is manifestType {
    if (
        !manifest ||
        typeof manifest.field !== "string" ||
        typeof manifest.path !== "string"
    ) {
        throw new Error("Invalid manifest format");
    }
}

// Ugly function that guard against express being stupid as fuck.
function hasFiles(req: Request): req is Request & { files: Express.Multer.File[] } {
    return Array.isArray(req.files);
}

export const push_to_repository: RequestHandler<
  pushRepoParams,
  any,
  pushRepoBody
> = (req, res) => {
    const body = req.body as pushRepoBody;

    if (!hasFiles(req) || req.files.length === 0) {
        return res.status(400).json({ ok: false, error: "No files uploaded" });
    }

    // Stupid assert.
    req.files.forEach(assertRepoFile);

    const user = safeSegment(req.params.user);
    const project = safeSegment(req.params.project);
    const manifest: manifestType[] = JSON.parse(body.manifest);
    const files: pushRepoFileType[] = req.files;

    try {
        const fileMap: Map<string, pushRepoFileType> = new Map();

        if (!manifest)
            return res.status(404).json({ ok: false, error: "Missing manifest"});

        if (!Array.isArray(manifest))
            return res.status(400).json({ ok: false, error: "Manifest is in wrong format"});

        for (const file of files) {
            fileMap.set(file.fieldname, file);
        }

        const projectRoot = path.resolve("storage", user, "repositories",project);
        
        for (const entry of manifest) {
            // i dont like this
            assertManifest(entry);

            const upload = fileMap.get(entry.field);

            if (!upload)
                throw new Error("Missing upload for the file");

            const relPath = safePaths(entry.path);
            const targetPath = path.join(projectRoot, relPath);

            // finally
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
            fs.writeFileSync(targetPath, upload.buffer);
        }
    } catch (error) {
        // oops
        console.error("repositoryController: (push_to_repository) Error: ", error);
        return res.status(400).json({ ok: false, error: error});
    }

    return res.status(200).json({ ok: true, error: null});
};