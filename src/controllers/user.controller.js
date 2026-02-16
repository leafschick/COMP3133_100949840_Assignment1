const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Employee = require("../models/Employee");

// SIGNUP (for REST — not used by GraphQL but fine to keep)
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// GET ALL EMPLOYEES (for GraphQL)
const getAllEmployees = async () => {
  try {
    return await Employee.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { signup, getAllEmployees };
