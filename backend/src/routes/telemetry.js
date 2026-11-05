const express = require("express");
const router = express.Router();
const { getTelemetry, updateTelemetrySettings } = require("../data/batteryStore");

// GET /api/telemetry/live - Get live BMS telemetry
router.get("/live", (req, res) => {
  const telemetry = getTelemetry();
  res.json({
    success: true,
    data: telemetry
  });
});

// POST /api/telemetry/simulate - Update/simulate state (e.g., toggle charging, change load)
router.post("/simulate", (req, res) => {
  const { current, soc, bmsStatus, protectionFlags } = req.body;
  const updates = {};
  if (typeof current === "number") updates.current = current;
  if (typeof soc === "number") updates.soc = Math.min(100, Math.max(0, soc));
  if (bmsStatus) updates.bmsStatus = bmsStatus;
  if (protectionFlags) updates.protectionFlags = protectionFlags;

  const updated = updateTelemetrySettings(updates);
  res.json({
    success: true,
    message: "BMS telemetry state updated",
    data: updated
  });
});

module.exports = router;

