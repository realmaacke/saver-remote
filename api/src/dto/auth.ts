"use strict";
import { z } from "zod";

export const authTokenDTO = z.object({
    token: z.string(),
});

export const loginDTO = z.object({
    username: z.string(),
    password: z.string()
});
