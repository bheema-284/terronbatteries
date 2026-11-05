const express = require("express");
const router = express.Router();
const { warranties, evModels } = require("../data/batteryStore");

// GET /api/warranty/lookup/:serialNumber - Lookup warranty details
router.get("/lookup/:serialNumber", (req, res) => {
  const serial = req.params.serialNumber.trim().toUpperCase();
  const found = warranties.find((w) => w.serialNumber.toUpperCase() === serial);

  if (!found) {
    return res.status(404).json({
      success: false,
      error: `No warranty record found for serial number '${req.params.serialNumber}'`
    });
  }

  const modelInfo = (evModels || []).find((b) => b.id === found.batteryId);

  res.json({
    success: true,
    data: {
      ...found,
      batteryDetails: modelInfo || null
    }
  });
});

// POST /api/warranty/register - Register a new warranty
router.post("/register", (req, res) => {
  const { serialNumber, customerName, customerEmail, batteryId, purchaseDate } = req.body;

  if (!serialNumber || !customerName || !customerEmail || !batteryId) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: serialNumber, customerName, customerEmail, batteryId"
    });
  }

  const existing = warranties.find(
    (w) => w.serialNumber.toUpperCase() === serialNumber.trim().toUpperCase()
  );

  if (existing) {
    return res.status(409).json({
      success: false,
      error: "A warranty has already been registered for this serial number."
    });
  }

  const datePurchased = purchaseDate ? new Date(purchaseDate) : new Date();
  const model = (evModels || []).find((b) => b.id === batteryId);
  const years = 5;
  const expiry = new Date(datePurchased);
  expiry.setFullYear(expiry.getFullYear() + years);

  const newWarranty = {
    serialNumber: serialNumber.trim().toUpperCase(),
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim(),
    batteryId,
    purchaseDate: datePurchased.toISOString().split("T")[0],
    warrantyExpiry: expiry.toISOString().split("T")[0],
    status: "Active"
  };

  warranties.push(newWarranty);

  res.status(201).json({
    success: true,
    message: "Warranty registered successfully",
    data: newWarranty
  });
});

module.exports = router;

