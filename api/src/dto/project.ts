"use strict";
import { boolean, object, z } from "zod";

export function projectResponse(success: boolean, data: object|null, message: string = "") {
    return {
        success: success,
        data: data,
        message: message
    };
}

export const getProjectDTO = z.object({
    username: z.string(),
    project_name: z.string()
});

export const initProject = {
    params: getProjectDTO,
    body: z.object({
        data: z.record(z.string(), z.unknown()).nullable()
    })
}

export const uploadProject = {
    params: getProjectDTO,
    body: z.object({
        commit_hash: z.string(),
        blobs: z.array(z.object({
            hash: z.string(),
            mode: z.string().nullable(),
            content: z.string()
        }))
    })
}

export interface BlobObject {
    hash: string,
    mode: string | null,
    content: string
};

export interface TreeInterface {
    commit_hash: string
};