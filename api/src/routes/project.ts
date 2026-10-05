"use strict";
import { Router, Request, Response } from "express";
import  readLine from "node:readline";
// Validation
import { validateParams } from "../middleware/validationsMiddleware";
import { authenticate } from "../middleware/authMiddleware";

//DTO
import {
getProjectDTO,
projectResponse,
UploadLine,
uploadSchema,
} from "../dto/project";
import { Storage } from "../models/storage";
import { asyncHandler } from "../middleware/asyncMiddleware";

const router = Router();

/**
 * Route name: get_project
 * /project/:username/project_name => Return Project
 * This route will respond with the object.
 */
router.get(
    '/:username/:project_name',
    validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;
});

/**
 * Route name: init_project
 * This route will initialize a new project.
 * Params: username: string, project_name: string
 * Body: none
 */
router.get(
    '/init/:username/:project_name',
    authenticate, validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;

    return res.status(200).json(projectResponse(
        true,
        null,
        "Project has been created"
    ));
});

/**
 * Route name: append_project
 * This route add/alter files to an existing project.
*/
router.post(
    '/upload/:username/:project_name',
    authenticate, validateParams(uploadSchema.params),
    asyncHandler(async (req: Request, res: Response) => {
    let { username, project_name } = req.params;

    if (typeof username === "object") username = username[0];
    if (typeof project_name === "object") project_name = project_name[0];

    // let buffer: string = "";

    const lines: UploadLine[] = [];

    const rl = readLine.createInterface({
        input: req,
        crlfDelay: Infinity
    });
    
    let lineNumber: number = 0;

    for await (const line of rl) {
        lineNumber++;
        const trimmed = line.trim();
        
        if (!trimmed) continue;

        let parsed: unknown;
        
        try {
            parsed = JSON.parse(trimmed);
        } catch {
            return res.status(400).json(projectResponse(false, null, "Invalid NDJSON format"));
        }

        console.log(parsed)
        const result = uploadSchema.schemas.combined.safeParse(parsed);

        if (!result.success) {
            return res.status(400).json(projectResponse(false, null, "Invalid NDJSON structure"));
        }

        lines.push(result.data);
    }

    const storage_res =  await Storage.upload_to_project_NDJSON(username, project_name, lines);


    if (!storage_res.success) {
        return res.status(400).json(projectResponse(false, null, storage_res.message));
    }

    return res.status(200).json(projectResponse(true, null, storage_res.message));
}));

export default router;