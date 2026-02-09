const express = require("express");
const router = express.Router();
const { isAdmin, isUserOrAdmin } = require("../middleware/auth");
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comment");

router.get("/", getComments); // get all comments (optional by recipe)
router.post("/", isUserOrAdmin, createComment); // create comment (user or admin)
router.put("/:id", isUserOrAdmin, updateComment); // update comment
router.delete("/:id", isAdmin, deleteComment); // delete comment (admin only)

module.exports = router;
