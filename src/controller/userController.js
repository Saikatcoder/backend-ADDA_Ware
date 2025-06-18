import User from "../models/usermodel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/usermodel.js";

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email", success: false });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Please enter at least 8 characters", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      success: true,
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};



export const adminLogin = async (req, res)=>{

}


