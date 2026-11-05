const express = require("express");
const router = express.Router();
const { batteries } = require("../data/batteryStore");

// GET /api/batteries - List all battery products with optional filtering by category
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let result = [...batteries];

  if (category && category !== "All") {
    result = result.filter(
      (b) => b.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.chemistry.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/batteries/:id - Get battery specifications by ID
router.get("/:id", (req, res) => {
  const battery = batteries.find((b) => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!battery) {
    return res.status(404).json({
      success: false,
      error: `Battery with id '${req.params.id}' not found`
    });
  }
  res.json({
    success: true,
    data: battery
  });
});

module.exports = router;

