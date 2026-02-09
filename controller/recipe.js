const Recipe = require("../models/Recipe");

// Get all recipes
const getRecipes = async () => {
  return await Recipe.find()
    .populate("created_by", "name email role")
    .sort({ createdAt: -1 });
};

// Get one recipe
const getRecipe = async (id) => {
  return await Recipe.findById(id).populate("created_by", "name email role");
};

// Add recipe
const addRecipe = async (title, descriptions, img_url, created_by) => {
  const recipe = new Recipe({
    title,
    descriptions,
    image_url: img_url,
    created_by,
  });
  await recipe.save();
  return recipe.populate("created_by", "name email role");
};

// Update recipe
const updateRecipe = async (id, title, descriptions, img_url) => {
  return await Recipe.findByIdAndUpdate(
    id,
    { title, descriptions, ...(img_url && { image_url: img_url }) },
    { new: true },
  ).populate("created_by", "name email role");
};

// Delete recipe
const deleteRecipe = async (id) => {
  return await Recipe.findByIdAndDelete(id);
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
