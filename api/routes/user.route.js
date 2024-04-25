import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test); // we send the logic to the controller

export default router; // If we export like as a default we can change the name in the index page
