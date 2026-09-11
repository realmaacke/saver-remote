"use strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";
import { BlobObject, projectResponse } from "../dto/project";
import { createHash } from "node:crypto";

export const Storage = {
    /**
     * Returns path.
     * @param username - saver user's username
     * @param project_name - saver user's project name
     * @param type - meant to be used for "objects", "refs"....
     * @param other - was supposed to be for content-addressing (first two char = folder) now used for other stuff.
     * @returns {string} path.
     */
    get_storage_path(
        username: string,
        project_name: string,
        type: string | null = null,
        other: string | null = null
    ): string {
        return `storage/${username}/${project_name}/.saver${type ? "/" + type : ""}/${other ? "/" + other : ""}`;
    },

    /**
     * Generic method for storing bytes, used in other methods.
     * @param storage_path - where to store the file.
     * @param filename - filename
     * @param bytes  - content of file.
     */
    async store_file(storage_path: string, filename:string, bytes: Buffer) {
        const storage: string = path.join(process.cwd(), storage_path);
        const file_location = path.join(storage, filename);

        await mkdir(storage, {recursive: true });
        await writeFile(file_location, bytes);
    },

    /**
     * 
     * @param username  - saver user's username
     * @param project_name - saver user's project name.
     * @param data - BlobObject = {hash: string, mode: string | null, content: string}
     * Content is decoded at first. (base64), if mode is null it is a folder.
     * @param commit_hash - SHA256 string of commit.
     * @returns ProjectResponse - { success: boolean, data: any[] | null, message: string }
     */
    async upload_to_project(username: string, project_name: string, data: BlobObject[], commit_hash: string) {
        const base_path = this.get_storage_path(username, project_name, "objects");

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
                continue;
            }

            this.store_file(path.join(base_path, folder), fileName, bytes);
        }

        return projectResponse(true, null, "Files uploaded");
    },

    async create_project(username: string, project_name: string) {
        const storage_path = this.get_storage_path(username, project_name);
        await mkdir(storage_path, { recursive: true});
    },

    /**
     * Method that stores and updates a chapter.
     * This method auto makes the first chapter HEAD. (primary chapter)
     * @param commit_hash - identifier for the commit. sha256
     * @param chapter  - chapter name (i,e. main, master, dev)
     * @param username  - saver user's username
     * @param project_name - saver user's project name.
     * @returns ProjectResponse - { success: boolean, data: any[] | null, message: string }
     */
    async store_chapter(
        commit_hash: string,
        chapter: string,
        username: string,
        project_name: string
    ) {
        const heads_path = this.get_storage_path(username, project_name, "refs", "heads");
        const current_head = path.join(this.get_storage_path(username, project_name), "HEAD");
        const chapter_path = path.join(heads_path, chapter);

        await mkdir(heads_path, {recursive: true});

        fs.writeFileSync(chapter_path, commit_hash, { flag: 'w'});

        // check if head exists?
        if (fs.existsSync(current_head)) {
            return projectResponse(true, null, `Succesfully uploaded to ${project_name}`);
        }

        // Write HEAD to chapter if it does not exists.
        fs.writeFileSync(current_head, `ref: refs/heads/${chapter}`, {flag: 'w'});

        return projectResponse(true, null, `Succesfully uploaded to ${project_name}`);
    }
}