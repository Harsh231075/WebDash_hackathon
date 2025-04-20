import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import Profile from '../models/Profile.js';

// 🔑 Generate Token Function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ REGISTER (no token here)
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword, role });

    // ✅ Create empty Profile doc after user registration
    await Profile.create({
      user: user._id,
      hero: {
        name: name,
        role: '',
        quote: '',
        avatar: '',
        coverImage: '',
        location: ''
      },
      basic: {
        avatar: '',
        name: name,
        email: email,
        phone: '',
        location: '',
        bio: ''
      },
      education: { university: '', },
      professional: {},
      achievements: [],
      certificates: [],
      photos: []
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Error while registering user", error: err.message });
  }
};

// ✅ LOGIN (token generated here)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
