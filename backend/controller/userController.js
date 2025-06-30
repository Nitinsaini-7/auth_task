import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  res.status(201).json({ token: generateToken(user._id), username: user.username, msg:"Registered Successfully" });
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  res.json({ token: generateToken(user._id), username: user.username, msg:"Login Successfully" });
};

// Update Profile
export const updateProfile = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findById(req.user.id);

  if (username) user.username = username;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();
  res.json({ msg: "Profile updated", username: user.username });
};

// Auth Middleware Helper
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Get all users (for admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Deletion failed" });
  }
};

