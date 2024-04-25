import User from "../models/user.model.js"; // To use our schema
import bcryptjs from "bcryptjs"; // For hash the password

export const signup = async (req, res) => {
  const { username, email, password } = req.body; // This is the data that we request to the database

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({ message: error.message });
  }
};
