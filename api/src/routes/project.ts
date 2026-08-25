"use strict";
import { Router, Request, Response } from "express";

// Validation
import { validateParams } from "../middleware/validationsMiddleware";
import { authenticate } from "../middleware/authMiddleware";

//DTO
import { getProjectDTO } from "../dto/project";

const router = Router();

/**
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
 * This route will initialize a new project.
 * Params: username: string, project_name: string
 * Body: Files: ?
 */
router.post(
    '/:username/:project_name',
    authenticate, validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;

});

/**
 * This route add/alter files to an existing project.
*/
router.post(
    '/:username/:project_name',
    authenticate, validateParams(getProjectDTO),
    (req: Request, res: Response) => {

    const { username, project_name } = req.params;
});

export default router;