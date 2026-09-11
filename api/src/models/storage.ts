"use strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";
import { BlobObject, projectResponse } from "../dto/project";
import { createHash } from "node:crypto";

export const Storage = {
    get_storage_path(username: string, project_name: string, other: string | null = null): string {
        return `storage/${username}/${project_name}/objects/${other ? "/" + other : ""}`;
    },

    async store_file(storage_path: string, filename:string, bytes: Buffer) {
        const storage: string = path.join(process.cwd(), storage_path);
        const file_location = path.join(storage, filename);

        await mkdir(storage, {recursive: true });
        await writeFile(file_location, bytes);
    },

    async upload_to_project(username: string, project_name: string, data: BlobObject[], commit_hash: string) {
        const base_path = this.get_storage_path(username, project_name);

        for (const blob of data) {
            let folder: string = blob.hash.substring(0, 2);
            let fileName: string  = blob.hash.substring(2);
            let bytes: Buffer = Buffer.from(blob.content, "base64");

            const correct_hash = createHash("sha256")
                .update(bytes).digest("hex");

            if (correct_hash !== blob.hash) {
                console.error(
                    `user: ${username} | project: ${project_name} | error: Hash missmatch: expected ${correct_hash} got: ${blob.hash}`
                );
                return projectResponse(false, null, `File: ${blob.hash} has mismatched hash`);
            }

            if (fs.existsSync(path.join(base_path, folder, fileName))) {
                console.log(`upload_to_project(), inside for loop, check if file exists`);
                console.log(`upload_to_project(), ${path.join(base_path, folder, fileName)}`);
                continue;
            }

            this.store_file(path.join(base_path, folder), fileName, bytes);
        }
    },

    async create_project(username: string, project_name: string) {
        const storage_path = this.get_storage_path(username, project_name);
        await mkdir(storage_path, { recursive: true});
    }
}