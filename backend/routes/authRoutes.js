const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("USER SAVED:", savedUser);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: savedUser,
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: err.message,
    });
  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }

  const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.status(200).json({
  success: true,
  message: "Login Successful",
  token,
  user,
});

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Login Failed",
      error: err.message,
    });
  }
});


// ================= TEST ROUTES =================

router.get("/register", (req, res) => {
  res.send("Register Route Working");
});

router.get("/login", (req, res) => {
  res.send("Login Route Working");
});

// ================= UPDATE PROFILE PIC =================

router.put("/update-profile-pic", async (req, res) => {
  try {

    const { userId, profilePic } = req.body;

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        { profilePic },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Profile Picture Updated",
      user: updatedUser,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Update Failed",
    });

  }
});

// ================= FOLLOW USER =================

router.put("/follow", async (req, res) => {
  try {

    const { currentUserId, targetUserId } = req.body;

    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const currentUser =
      await User.findById(currentUserId);

    const targetUser =
      await User.findById(targetUserId);

    if (!targetUser.followers.includes(currentUserId)) {

      targetUser.followers.push(currentUserId);

      currentUser.following.push(targetUserId);

      await targetUser.save();
      await currentUser.save();
    }

    res.status(200).json({
      success: true,
      message: "User Followed",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Follow Failed",
    });

  }
});


// ================= UNFOLLOW USER =================

router.put("/unfollow", async (req, res) => {
  try {

    const { currentUserId, targetUserId } = req.body;

    const currentUser =
      await User.findById(currentUserId);

    const targetUser =
      await User.findById(targetUserId);

    targetUser.followers =
      targetUser.followers.filter(
        (id) =>
          id.toString() !== currentUserId
      );

    currentUser.following =
      currentUser.following.filter(
        (id) =>
          id.toString() !== targetUserId
      );

    await targetUser.save();
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "User Unfollowed",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unfollow Failed",
    });

  }
});
// GET USER BY ID

router.get("/user/:id", async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});

module.exports = router;