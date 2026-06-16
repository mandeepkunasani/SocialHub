const express = require("express");
const router = express.Router();

const Post = require("../models/Post");


// ================= CREATE POST =================

router.post("/create", async (req, res) => {
  try {
    const { userId, username, content, image, } = req.body;

    const newPost = new Post({
      userId,
      username,
      content,
      image,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post: savedPost,
    });

  } catch (err) {
    console.log("CREATE POST ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Post Creation Failed",
      error: err.message,
    });
  }
});


// ================= GET ALL POSTS =================

router.get("/", async (req, res) => {
  try {

    const posts = await Post.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (err) {

    console.log("FETCH POSTS ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Error Fetching Posts",
      error: err.message,
    });

  }
});


// ================= TEST ROUTE =================

router.get("/test", (req, res) => {
  res.send("Post Route Working ");
});

// ================= LIKE POST =================

router.put("/like/:id", async (req, res) => {
  try {

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    post.likes += 1;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Liked",
      likes: post.likes,
    });

  } catch (err) {

    console.log("LIKE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Like Failed",
      error: err.message,
    });

  }
});

// ================= ADD COMMENT =================

router.put("/comment/:id", async (req, res) => {
  try {

    const { username, text } = req.body;

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    post.comments.push({
      username,
      text,
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Added",
      post,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Comment Failed",
    });

  }
});
// GET USER POSTS COUNT

router.get("/count/:userId", async (req, res) => {
  try {

    const count = await Post.countDocuments({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      count,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});

// ================= DELETE POST =================

router.delete("/:id", async (req, res) => {
  try {

    const deletedPost =
      await Post.findByIdAndDelete(
        req.params.id
      );

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });

  } catch (err) {

    console.log("DELETE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });

  }
});
// ================= EDIT POST =================

router.put("/edit/:id", async (req, res) => {
  try {

    const { content } = req.body;

    const updatedPost =
      await Post.findByIdAndUpdate(
        req.params.id,
        { content },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Post Updated",
      post: updatedPost,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Edit Failed",
    });

  }
});

module.exports = router;