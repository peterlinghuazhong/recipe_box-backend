const express = require("express");
const router = express.Router();
const { isUserOrAdmin, isAdmin } = require("../middleware/auth");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipe");

// Get all recipes
router.get("/", async (req, res) => {
  const recipes = await getRecipes();
  res.json(recipes);
});

// Get one recipe
router.get("/:id", async (req, res) => {
  const recipe = await getRecipe(req.params.id);
  if (!recipe) return res.status(404).json({ message: "Not found" });
  res.json(recipe);
});

// Create recipe
router.post("/", isUserOrAdmin, async (req, res) => {
  const { title, descriptions, img_url } = req.body; // URL comes from frontend
  const created_by = req.user._id;
  const recipe = await addRecipe(title, descriptions, img_url, created_by);
  res.status(201).json(recipe);
});

// Update recipe
router.put("/:id", isUserOrAdmin, async (req, res) => {
  const { title, descriptions, img_url } = req.body;
  const updated = await updateRecipe(
    req.params.id,
    title,
    descriptions,
    img_url,
  );
  res.json(updated);
});

// Delete recipe
router.delete("/:id", isAdmin, async (req, res) => {
  await deleteRecipe(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
