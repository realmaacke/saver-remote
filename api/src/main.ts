import express from "express";

const app = express();
const port = 8080;

// Routers
import authenticate from "./routes/authenticate";

app.use(express.json());
app.use("/auth", authenticate);


app.listen(port, function() {
    console.log(`[Saver API]: Listening on port: ${port}`);
});