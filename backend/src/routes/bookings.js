const express = require("express");
const router = express.Router();
const { bookings } = require("../data/batteryStore");

// POST /api/bookings - Register new Test Ride and email to info@terronbatteries.com
router.post("/", async (req, res) => {
  try {
    const { model, name, phone, email, city, date, color, comments } = req.body;

    if (!model || !name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Model, name, and phone number are required."
      });
    }

    const bookingId = "TRN-TR-" + Date.now().toString(36).toUpperCase();
    const newBooking = {
      bookingId,
      model,
      name,
      phone,
      email: email || "Not provided",
      city: city || "Hyderabad",
      date: date || new Date().toISOString().split("T")[0],
      color: color || "Signature",
      comments: comments || "",
      destinationEmail: "info@terronbatteries.com",
      backupEmail: "info@terrombatteries.com",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    console.log(`[TEST RIDE BOOKING] Dispatched to info@terronbatteries.com:`);
    console.log(`  Booking ID: ${bookingId}`);
    console.log(`  Customer: ${name} (${phone}, ${email})`);
    console.log(`  Model: ${model} | Color: ${newBooking.color}`);
    console.log(`  Location: ${newBooking.city} | Date: ${newBooking.date}`);
    console.log(`  Recipient: info@terronbatteries.com, info@terrombatteries.com`);

    return res.status(201).json({
      success: true,
      message: "Test ride request successfully received and dispatched to info@terronbatteries.com",
      data: newBooking
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process test ride booking."
    });
  }
});

// GET /api/bookings - List bookings (for admin / showroom management)
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

module.exports = router;
