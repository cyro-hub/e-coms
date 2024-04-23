/** @format */

import express from "express";
import dotenv from "dotenv";
import "./config/database/dbconfig.mjs";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes/routes.mjs";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api", routes);

const __dirname = path.resolve();
app.use(express.static("dist"));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
