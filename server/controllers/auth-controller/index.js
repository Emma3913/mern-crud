const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, useremail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ useremail }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username or useremail already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    useremail,
    password: hashPassword,
    role,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

module.exports = registerUser;
