import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // For use ENV

const app = express(); // Initializing express
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
