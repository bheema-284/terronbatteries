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

// Configured Origins including https://terronbatteries.com
const allowedOrigins = [
  "https://terronbatteries.com",
  "https://www.terronbatteries.com",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

// CORS Middleware with CLIENT_URL support
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all legitimate browser origins
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Root greeting & info (serves both / and /api)
app.get(["/", "/api"], (req, res) => {
  res.json({
    message: "⚡ Welcome to Terron Batteries & EV Mobility API",
    version: "1.0.0",
    clientUrl: process.env.CLIENT_URL || "https://terronbatteries.com",
    docs: {
      health: "/api/system/health",
      batteries: "/api/batteries",
      telemetry: "/api/telemetry/live",
      warrantyLookup: "/api/warranty/lookup/:serialNumber",
      bookings: "/api/bookings (POST: Test Ride Dispatch to info@terronbatteries.com)"
    }
  });
});

// Routes - supports both with and without /api prefix for Vercel serverless rewrites
app.use(["/api/system", "/system"], systemRoutes);
app.use(["/api/batteries", "/batteries"], batteryRoutes);
app.use(["/api/telemetry", "/telemetry"], telemetryRoutes);
app.use(["/api/warranty", "/warranty"], warrantyRoutes);
app.use(["/api/bookings", "/bookings"], bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server when executed directly (local dev), but NOT when imported as a Vercel serverless function
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL && require.main === module) {
  app.listen(PORT, () => {
    console.log(`⚡ Terron Batteries Backend running on http://localhost:${PORT}`);
    console.log(`⚡ Allowed CLIENT_URL: ${process.env.CLIENT_URL || "https://terronbatteries.com"}`);
  });
}

module.exports = app;
