import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config(); // For use ENV

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express(); // Initializing express
app.use(express.json()); // To recieve json in the database

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
