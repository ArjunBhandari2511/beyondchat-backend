const User = require("../models/User");
const brcypt = require("bcryptjs");
const { sendVerificationEmail } = require("../services/emailService");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash Password
  const hashedPassword = await brcypt.hash(password, 10);

  // Generate a Verification Code
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // Save the user to Database
  const user = new User({
    name,
    email,
    password: hashedPassword,
    verificationCode,
  });
  await user.save();

  // Send Verification Email
  sendVerificationEmail(email, verificationCode);

  res
    .status(201)
    .json({ message: "User registered! Please verify your email" });
};

exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the verification code matches
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    user.isVerified = true;
    user.verificationCode = null; // Clear the verification code after successful verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error during verification", error);
    res.status(500).json({ message: "Server error" });
  }
};