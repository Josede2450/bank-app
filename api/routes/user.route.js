import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test); // we send the logic to the controller
router.put("/update/:userId", verifyToken, updateUser); // We have to add userid

export default router; // If we export like as a default we can change the name in the index page
