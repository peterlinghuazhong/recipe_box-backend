const Comment = require("../models/comment");

// Get all comments (for a recipe)
const getComments = async (req, res) => {
  const { recipe_id } = req.query;
  const filter = recipe_id ? { recipe_id } : {};

  try {
    const comments = await Comment.find(filter)
      .populate("user_id", "name role") // <-- populate 'name' from User
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a comment
const createComment = async (req, res) => {
  const { recipe_id, content } = req.body;
  const user_id = req.user.id; // from auth middleware

  if (!recipe_id || !content)
    return res.status(400).json({ message: "All fields required" });

  try {
    const comment = await Comment.create({ recipe_id, content, user_id });
    const populated = await comment.populate("user_id", "name role");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update comment
const updateComment = async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    comment.content = content;
    await comment.save();
    const populated = await comment.populate("user_id", "name role");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getComments, createComment, updateComment, deleteComment };
