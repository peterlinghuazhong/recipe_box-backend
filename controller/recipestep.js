const Recipestep = require("../models/recipestep");

// CREATE STEP
const createStep = async (req, res) => {
  try {
    const { recipe_id, instruction_text } = req.body;
    if (!recipe_id || !instruction_text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const count = await Recipestep.countDocuments({ recipe_id });
    const step = await Recipestep.create({
      recipe_id,
      step_number: count + 1,
      instruction_text,
    });

    res.status(201).json(step);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET STEPS
const getSteps = async (req, res) => {
  try {
    const { recipe_id } = req.query;
    const filter = recipe_id ? { recipe_id } : {};
    const steps = await Recipestep.find(filter).sort({ step_number: 1 });
    res.json(steps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STEP
const updateStep = async (req, res) => {
  try {
    const { instruction_text } = req.body;
    const step = await Recipestep.findById(req.params.id);
    if (!step) return res.status(404).json({ message: "Step not found" });

    step.instruction_text = instruction_text || step.instruction_text;
    const updated = await step.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE STEP
const deleteStep = async (req, res) => {
  try {
    const step = await Recipestep.findByIdAndDelete(req.params.id);
    if (!step) return res.status(404).json({ message: "Step not found" });
    res.json({ message: "Step deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createStep,
  getSteps,
  updateStep,
  deleteStep,
};
