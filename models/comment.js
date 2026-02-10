const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // <-- MUST be exactly "User" (matches model name)
      required: true,
    },
    recipe_id: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    content: {
      type: String,

      required: true,
    },
  },
  { timestamps: true },
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;
