"use strict";
import { boolean, object, success, z } from "zod";

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

const start =  z.object({
    type: z.literal("start"),
    commit_hash: z.string(),
    chapter: z.string()
});

const chunk = z.object({
    type: z.literal("chunk"),
    hash: z.string(),
    mode: z.string().optional(),
    content: z.string()
});

const done = z.object({
    type: z.literal("done"),
    success: z.boolean(),
    message: z.string()
});

export const uploadSchema = {
    params: z.object({
        username: z.string(),
        project_name: z.string()
    }),

    schemas: {
        start,
        chunk,
        done,

        combined: z.discriminatedUnion("type", [
            start,
            chunk,
            done,
        ]),
    },
};
export type UploadLine = z.infer<typeof uploadSchema.schemas.combined>;
export type startLine = z.infer<typeof uploadSchema.schemas.start>;
export type chunkLine = z.infer<typeof uploadSchema.schemas.chunk>;
export type doneLine = z.infer<typeof uploadSchema.schemas.done>;