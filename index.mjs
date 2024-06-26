/** @format */

import express from "express";
import dotenv from "dotenv";
import "./config/database/dbconfig.mjs";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes/routes.mjs";

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/v1", routes);

const __dirname = path.resolve();

// app.use(express.static("dist"));
app.use("/", express.static(path.join(__dirname, "dist")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
