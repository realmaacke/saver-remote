"use strict";
import path from "path";
import fs from "fs";
import { error } from "console";

const StorageManagement = {

    safeSegment: function safeSegment(input) {
        const s = String(input || "").trim();

        if (!s) {
            throw new Error("Empty path segment");
        }

        if (s.includes("/") || s.includes("\\") || s === "." || s === "..") {
            throw new Error(`Invalid path segment: ${input}`);
        }

        return s;
    },

    safePaths: function safePaths(input) {
        const normalized = path.posix.normalize(String(input));

        if (
            normalized === ".." ||
            normalized.startsWith("../") ||
            path.isAbsolute(normalized)
        ) {
            throw new Error(`Invalid path: ${input}`);
        }
        return normalized;
    },

    storeKeys: function storeKeys(files, username) {
        const file = files[0];

        const projectRoot = path.resolve("repositories", username, "keys");
        const targetPath = path.join(projectRoot, file.originalname);

        fs.mkdirSync(path.dirname(targetPath), {recursive: true});
        fs.writeFileSync(targetPath, file.buffer);

        return { ok: true, msg: "Stored key succesfuly", error: null };
    },

    storeProject: function storeProject(manifest, files, username, project, upload) {
        const fileMap = new Map();

        for (const file of files || []) {
            fileMap.set(file.fieldname, file);
        }

        const projectRoot = path.resolve("repositories", username, project);

        for (const entry of manifest) {
            if (!entry || typeof entry.field !== "string" || typeof entry.path !== "string") {
                throw new Error("Invalid manifest entry");
            }

            const upload = fileMap.get(entry.field);

            if (!upload) {
                throw new Error(`Missing upload file for field: ${entry.field}`);
            }

            const relPath = this.safePaths(entry.path);
            const targetPath = path.join(projectRoot, relPath);

            fs.mkdirSync(path.dirname(targetPath), { recursive: true} );
            fs.writeFileSync(targetPath, upload.buffer);
        }

        return { ok: true, msg: "upload succesfull", error: null };
    }
};

export default StorageManagement;