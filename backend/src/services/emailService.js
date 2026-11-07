const nodemailer = require("nodemailer");

/**
 * Configure Nodemailer Transporter
 * Supports Hostinger (smtp.hostinger.com:465) and Gmail (smtp.gmail.com:587)
 */
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    console.warn("⚠️ Email service not configured: EMAIL_USER or EMAIL_PASSWORD missing");
    return null;
  }

  // Determine host and port: Hostinger uses smtp.hostinger.com:465 (secure: true)
  const host = process.env.EMAIL_HOST || (user.includes("terronbatteries.com") ? "smtp.hostinger.com" : "smtp.gmail.com");
  const port = parseInt(process.env.EMAIL_PORT, 10) || (host.includes("hostinger") ? 465 : 587);
  const secure = process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE === "true" : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Send Test Ride Email Notification to Dealership & Showroom Team
 * @param {Object} booking
 */
async function sendTestRideNotification(booking) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("⚠️ Email transporter not available. Skipping email notification.");
    return { success: false, reason: "Transporter not configured" };
  }

  const senderEmail = process.env.EMAIL_USER || "info@terronbatteries.com";
  const recipientEmails = process.env.EMAIL_TO || senderEmail;

  // HTML template for dealership lead notification
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0E1A2C; margin: 0; padding: 20px; color: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background: #111E31; border: 1px solid #1E3352; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #15243C 0%, #0E1A2C 100%); padding: 24px; border-bottom: 2px solid #EAB308; text-align: center; }
          .logo { font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #ffffff; margin: 0; }
          .sublogo { font-size: 11px; letter-spacing: 2px; color: #EAB308; text-transform: uppercase; margin-top: 4px; font-weight: 700; }
          .body-content { padding: 30px; }
          .badge { display: inline-block; background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.4); color: #EAB308; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
          h2 { color: #ffffff; font-size: 22px; margin: 0 0 10px 0; font-weight: 800; }
          p { color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; }
          .details-card { background: #0E1A2C; border: 1px solid #1E3352; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1E3352; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
          .detail-value { color: #ffffff; font-size: 14px; font-weight: 700; text-align: right; }
          .highlight { color: #38BDF8; font-weight: 800; }
          .actions { text-align: center; padding: 10px 0; }
          .btn { display: inline-block; background: #EAB308; color: #0f172a; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 6px; }
          .btn-secondary { background: #1E3352; color: #ffffff; }
          .footer { background: #0A1320; padding: 18px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1E3352; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">TERRON</h1>
            <div class="sublogo">Sridewi Energies Private Limited</div>
          </div>
          <div class="body-content">
            <span class="badge">⚡ New Test Ride Booking</span>
            <h2>Test Ride Request Received</h2>
            <p>A new customer has booked an official test ride appointment via the Terron EV Mobility website.</p>
            
            <div class="details-card">
              <div class="detail-row">
                <span class="detail-label">Booking ID</span>
                <span class="detail-value highlight">${booking.bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">EV Model</span>
                <span class="detail-value" style="color: #EAB308;">Terron ${booking.model}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Name</span>
                <span class="detail-value">${booking.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Mobile Number</span>
                <span class="detail-value"><a href="tel:${booking.phone}" style="color: #38BDF8; text-decoration: none;">${booking.phone}</a></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email Address</span>
                <span class="detail-value">${booking.email || 'Not provided'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">City / Region</span>
                <span class="detail-value">${booking.city}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Preferred Date</span>
                <span class="detail-value">${booking.date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Selected Colour</span>
                <span class="detail-value">${booking.color || 'Signature Finish'}</span>
              </div>
              ${booking.comments ? `
              <div class="detail-row">
                <span class="detail-label">Customer Notes</span>
                <span class="detail-value" style="font-style: italic;">${booking.comments}</span>
              </div>` : ''}
            </div>

            <div class="actions">
              <a href="tel:${booking.phone}" class="btn">Call Customer Now</a>
              ${booking.email && booking.email !== 'Not provided' ? `<a href="mailto:${booking.email}?subject=Terron EV Test Ride Confirmation" class="btn btn-secondary">Email Customer</a>` : ''}
            </div>
          </div>
          <div class="footer">
            TERRON EV MOBILITY &bull; Automated Showroom Lead System &bull; Hyderabad, Telangana
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"Terron EV Mobility" <${senderEmail}>`,
    to: recipientEmails,
    replyTo: booking.email && booking.email.includes('@') ? booking.email : senderEmail,
    subject: `🏍️ New Test Ride Booking: Terron ${booking.model} - ${booking.name} (${booking.phone})`,
    html: htmlContent,
    text: `New Test Ride Booking:\n\nModel: Terron ${booking.model}\nCustomer: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nCity: ${booking.city}\nDate: ${booking.date}\nBooking ID: ${booking.bookingId}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Nodemailer] Test ride notification email sent successfully! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ [Nodemailer] Failed to send email notification:`, error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  getTransporter,
  sendTestRideNotification
};
