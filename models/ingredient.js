const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ingredient", IngredientSchema);
