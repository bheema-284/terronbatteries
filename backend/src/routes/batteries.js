const express = require("express");
const router = express.Router();
const { evModels } = require("../data/batteryStore");

// GET /api/batteries - List all Terron EV models
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let result = [...evModels];

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
        b.badge.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// GET /api/batteries/:id - Get specific EV model specs
router.get("/:id", (req, res) => {
  const model = evModels.find((b) => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!model) {
    return res.status(404).json({
      success: false,
      error: `Model '${req.params.id}' not found`
    });
  }
  res.json({
    success: true,
    data: model
  });
});

module.exports = router;
