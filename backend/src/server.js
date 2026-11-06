const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const batteryRoutes = require("./routes/batteries");
const telemetryRoutes = require("./routes/telemetry");
const warrantyRoutes = require("./routes/warranty");
const systemRoutes = require("./routes/system");
const bookingRoutes = require("./routes/bookings");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Root greeting & info
app.get("/", (req, res) => {
  res.json({
    message: "⚡ Welcome to Terron Batteries API",
    version: "1.0.0",
    docs: {
      health: "/api/system/health",
      batteries: "/api/batteries",
      telemetry: "/api/telemetry/live",
      warrantyLookup: "/api/warranty/lookup/:serialNumber",
      bookings: "/api/bookings (POST: Test Ride Dispatch to info@terronbatteries.com)"
    }
  });
});

// Routes
app.use("/api/system", systemRoutes);
app.use("/api/batteries", batteryRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/warranty", warrantyRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`⚡ Terron Batteries Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;

