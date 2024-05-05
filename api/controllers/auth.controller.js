import User from "../models/user.model.js"; // To use our schema
import bcryptjs from "bcryptjs"; // For hash the password
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; // For validate teher user (Need to know how it works)
import { json } from "express";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; // This is the data that we request to the database

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password

  const newUser = new User({
    //Passing to the database using our schema
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save(); // Saving in to the dabase
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email }); // Find one is going to search for us

    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password); // Compare the passwrod
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      // Auth
      expiresIn: "30m", // Will log out in 30 minutes
    });

    const { password: pass, ...rest } = validUser._doc; // Separte the password from the rest

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest); //Save it to the cookien on the browser
  } catch (error) {
    next(error);
  }
};
