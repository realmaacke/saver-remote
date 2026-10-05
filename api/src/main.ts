import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 8080; // change to env.

// Routers
import authenticate from "./routes/authenticate";
import project from "./routes/project";
import { projectResponse } from "./dto/project";

// These routes are not to use express.json()
const STREAM_ROUTES = [
    "/proj/upload"
];

app.use((req, res, next) => {
    if (req.method === 'POST'
        && STREAM_ROUTES.some(r => req.path.startsWith(r))
    ) {
        return next();
    }
    return express.json()(req, res, next);
});

// Routers.
app.use("/auth", authenticate);
app.use("/proj", project);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json(projectResponse(false, null, err.message || "Internal Server Error"));
});


// make it a middleware and log stats.
app.listen(port, function() {
    console.log(`[Saver API]: Listening on port: ${port}`);
});