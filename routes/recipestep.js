const express = require("express");
const router = express.Router();
const { isAdmin, isUserOrAdmin } = require("../middleware/auth");

const {
  createStep,
  getSteps,
  updateStep,
  deleteStep,
} = require("../controller/recipestep");

router.get("/", getSteps);
router.post("/", isUserOrAdmin, createStep);
router.put("/:id", isUserOrAdmin, updateStep);
router.delete("/:id", isAdmin, deleteStep);

module.exports = router;
