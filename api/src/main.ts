import express from "express";

const app = express();
const port = 8080;

// Routers
import authenticate from "./routes/authenticate";
import project from "./routes/project";

app.use(express.json());
app.use("/auth", authenticate);
app.use("/proj", project);


app.listen(port, function() {
    console.log(`[Saver API]: Listening on port: ${port}`);
});