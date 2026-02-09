const mongoose = require("mongoose");

const RecipestepSchema = new mongoose.Schema(
  {
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    step_number: {
      type: Number,
      required: true,
    },
    instruction_text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Recipestep", RecipestepSchema);
