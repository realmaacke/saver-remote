import express from "express";

const app = express();
const port = 8080;

// Routers
import authenticate from "./routes/authenticate";
import project from "./routes/project";

app.use((req, res, next) => {
    if (req.method === 'POST' && req.path.startsWith('/proj/upload/')) {
        return next;
    }
    express.json()(req, res, next);
});


app.use("/auth", authenticate);
app.use("/proj", project);



app.listen(port, function() {
    console.log(`[Saver API]: Listening on port: ${port}`);
});