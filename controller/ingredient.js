const Ingredient = require("../models/ingredient");

// CREATE
const createIngredient = async (req, res) => {
  try {
    const { recipe_id, name, quantity, unit } = req.body;
    if (!recipe_id || !name || quantity == null || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ingredient = await Ingredient.create({
      recipe_id,
      name,
      quantity,
      unit,
    });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL (optional recipe filter)
const getIngredients = async (req, res) => {
  try {
    const { recipe_id } = req.query;
    const filter = recipe_id ? { recipe_id } : {};
    const ingredients = await Ingredient.find(filter).sort({ name: 1 });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });

    const { name, quantity, unit } = req.body;
    if (name !== undefined) ingredient.name = name;
    if (quantity !== undefined) ingredient.quantity = quantity;
    if (unit !== undefined) ingredient.unit = unit;

    const updated = await ingredient.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
