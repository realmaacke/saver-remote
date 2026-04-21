"use strict";
import express from "express";
import type { Request, Response } from "express";

import repoRouter from "./routes/repositoryRoute.js";
import authRouter from "./routes/authenticationRoute.js";

const app = express();
const port = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/repo", repoRouter);
app.use("/auth", authRouter);

app.get("/", (_: Request, res: Response) => {
    res.send("Hello Worlds!");
});


app.listen(port, () => {
    console.log(`[Saver]: API is running | PORT: (${port})`);
});