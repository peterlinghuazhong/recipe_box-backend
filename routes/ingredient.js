const express = require("express");
const router = express.Router();
const { isAdmin, isUserOrAdmin } = require("../middleware/auth");

const {
  createIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require("../controller/ingredient");

router.get("/", getIngredients);
router.get("/:id", getIngredientById);
router.post("/", isUserOrAdmin, createIngredient);
router.put("/:id", isUserOrAdmin, updateIngredient);
router.delete("/:id", isAdmin, deleteIngredient);

module.exports = router;
