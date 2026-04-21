"use strict";
import express from "express";
import type { Request, Response } from "express";


const app = express();
const port = process.env.PORT || 9999;


app.get("/", (_: Request, res: Response) => {
    res.send("Hello Worlds!");
});


app.listen(port, () => {
    console.log(`[Saver]: API is running | PORT: (${port})`);
});