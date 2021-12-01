import express from "express";
import colors from "colors"; colors.enable();
import bodyParser from "body-parser";

const app = express();
const port = 3000;

import { Router } from "./routes/Router";
app.use(bodyParser.json());
app.use(Router());

app.listen(port, () => {
    console.log("Wystartowało!".rainbow);
});