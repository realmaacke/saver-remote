"use strict";
import { Router, Request, Response } from "express";

// Validation
import { validateParams } from "../middleware/validationsMiddleware";
import { authenticate } from "../middleware/authMiddleware";

//DTO
import {
getProjectDTO,
initProject,
projectResponse,
BlobObject,
uploadProject
} from "../dto/project";

// Models
import { Decoding } from "../models/decoding";
import { Storage } from "../models/storage";

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

    console.log("INIT")

    // if (!result.success) {
    //     return res.status(400).json(projectResponse(
    //         false,
    //         null,
    //         "Body does not match the schema"
    //     ));
    // }

    // check if user is actually username

    // Check if project name is unique.

    // create project && add the files.

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
    authenticate, validateParams(uploadProject.params),
    async (req: Request, res: Response) => {
    let { username, project_name } = req.params;

    if (typeof username === "object") {
        username = username[0];
    }

    if (typeof project_name === "object") {
        project_name = project_name[0];
    }

    const result = uploadProject.body.safeParse(req.body);
    
    if (!result.success) {
        console.log(result.error);
        return res.status(400).json(projectResponse(false, null, "Malformed body"));
    }

    const uploadState = await Storage.upload_to_project(
        username,
        project_name,
        result.data.blobs,
        result.data.commit_hash
    );

    if (!uploadState.success) {
        return res.status(400).json(uploadState);
    }

    const chapterState = await Storage.store_chapter(
        result.data.commit_hash,
        result.data.chapter,
        username,
        project_name
    );
    // check that user is = username, and has permissions?
    // sql query for userId, use Token to get userId.

    // check for changes in remote project.
    // match and add diff

    // 

    return res.status(200).json(projectResponse(true, null, "Project has been updated"));

});

export default router;