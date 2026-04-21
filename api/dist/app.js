"use strict";
import express from "express";
const app = express();
const port = process.env.PORT || 9999;
app.get("/", (_, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`[Saver]: API is running | PORT: (${port})`);
});
//# sourceMappingURL=app.js.map