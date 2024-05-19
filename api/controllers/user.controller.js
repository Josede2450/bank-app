// All the logic goes here

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

// Req means request and that what whe ask to the database
//Res means response and that what the get from the data base

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const updateUser = async (req, res, next) => {
  // Check what inside of the textinputs

  if (req.user.id !== req.params.userId) {
    // Check the userr id and token
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    // Password must be at least 6 character
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }

    //Updating the user
    try {
      const updatedUser = await User.findByIdAndUpdate(
        // Searching the id of the user
        req.params.userId,
        {
          $set: {
            // Update here
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true } // Send back new information
      );
      const { password, ...rest } = updatedUser._doc; // Separate the password
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
