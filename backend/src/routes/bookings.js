const express = require("express");
const router = express.Router();
const { bookings } = require("../data/batteryStore");
const { sendTestRideNotification, formatDDMMYYYY } = require("../services/emailService");

// POST /api/bookings - Register new Test Ride and send email notification
router.post("/", async (req, res) => {
  try {
    const { model, name, phone, email, city, date, color, comments } = req.body;

    if (!model || !name || !phone) {
      return res.status(400).json({
        success: false,
        error: "Model, customer name, and phone number are required."
      });
    }

    const bookingId = "TRN-TR-" + Date.now().toString(36).toUpperCase();
    const formattedDate = formatDDMMYYYY(date);

    const newBooking = {
      bookingId,
      model,
      name,
      phone,
      email: email || "Not provided",
      city: city || "Hyderabad",
      date: formattedDate, // ALWAYS DD-MM-YYYY
      color: color || "Signature",
      comments: comments || "",
      destinationEmail: process.env.EMAIL_TO || "info@terronbatteries.com,info@terrornbatteries.com",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    // 1. Save to in-memory store
    bookings.push(newBooking);

    // 2. Dispatch email notification via Nodemailer
    const emailResult = await sendTestRideNotification(newBooking);

    return res.status(201).json({
      success: true,
      message: "Test ride request successfully received and email notification processed.",
      data: newBooking,
      emailDispatched: emailResult.success,
      emailDetails: emailResult
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
