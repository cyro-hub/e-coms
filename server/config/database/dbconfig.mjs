import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to the database!!!!!");
  })
  .catch((err) => {
    console.log(err.message);
  });
