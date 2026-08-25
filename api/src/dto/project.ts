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