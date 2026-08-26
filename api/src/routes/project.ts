"use strict";
import { Router, Request, Response } from "express";

// Validation
import { validateParams } from "../middleware/validationsMiddleware";
import { authenticate } from "../middleware/authMiddleware";

//DTO
import { getProjectDTO, initProject, projectResponse } from "../dto/project";

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
 * Body: Files: ?
 */
router.post(
    '/:username/:project_name',
    authenticate, validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;
    const result = initProject.body.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(projectResponse(
            false,
            null,
            "Body does not match the schema"
        ));
    }

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
    'add/:username/:project_name',
    authenticate, validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;

    // check that user is = username, and has permissions?
    // sql query for userId, use Token to get userId.

    // check for changes in remote project.
    // match and add diff

    // 

    return res.status(200).json(projectResponse(true, null, "Project has been updated"));

});

export default router;