const nodemailer = require("nodemailer");

/**
 * Helper to ensure dates are strictly in DD-MM-YYYY format
 */
function formatDDMMYYYY(dateStr) {
  if (!dateStr) {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return `${d}-${m}-${y}`;
  }
  const clean = String(dateStr).trim();
  if (/^\d{2}-\d{2}-\d{4}$/.test(clean)) return clean;
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const parts = clean.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const d = String(parsed.getDate()).padStart(2, '0');
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const y = parsed.getFullYear();
    return `${d}-${m}-${y}`;
  }
  return clean;
}

/**
 * Configure Nodemailer Transporter
 * Supports Hostinger (smtp.hostinger.com:465) and Gmail (smtp.gmail.com:587)
 */
function getTransporter() {
  const user = process.env.EMAIL_USER || "info@terronbatteries.com";
  const pass = process.env.EMAIL_PASSWORD || "u8xd-jvz8-wizn-sthl";

  if (!user || !pass) {
    console.warn("⚠️ Email service not configured: EMAIL_USER or EMAIL_PASSWORD missing");
    return null;
  }

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
 * Send Test Ride Email Notification to Dealership and Customer Confirmation
 * @param {Object} booking
 */
async function sendTestRideNotification(booking) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("⚠️ Email transporter not available. Skipping email notification.");
    return { success: false, reason: "Transporter not configured" };
  }

  const formattedDate = formatDDMMYYYY(booking.date);
  const senderEmail = process.env.EMAIL_USER || "info@terronbatteries.com";
  const dealershipRecipients = process.env.EMAIL_TO || "info@terronbatteries.com,info@terrornbatteries.com";

  // HTML template for dealership lead notification
  const dealershipHtml = `
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
                <span class="detail-label">Preferred Date (DD-MM-YYYY)</span>
                <span class="detail-value" style="color: #38BDF8; font-weight: 800;">${formattedDate}</span>
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

  const dealershipMailOptions = {
    from: `"Terron EV Mobility" <${senderEmail}>`,
    to: dealershipRecipients,
    replyTo: booking.email && booking.email.includes('@') ? booking.email : senderEmail,
    subject: `🏍️ New Test Ride Booking: Terron ${booking.model} - ${booking.name} (${booking.phone}) - Date: ${formattedDate}`,
    html: dealershipHtml,
    text: `New Test Ride Booking:\n\nModel: Terron ${booking.model}\nCustomer: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nCity: ${booking.city}\nPreferred Date (DD-MM-YYYY): ${formattedDate}\nBooking ID: ${booking.bookingId}`
  };

  try {
    const dealershipResult = await transporter.sendMail(dealershipMailOptions);
    console.log(`✅ [Nodemailer] Dealership notification sent! Message ID: ${dealershipResult.messageId}`);

    // If customer provided an email address, also send them a branded confirmation receipt
    let customerResult = null;
    if (booking.email && booking.email.includes('@') && !booking.email.includes('Not provided')) {
      const customerHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0E1A2C; margin: 0; padding: 20px; color: #f1f5f9; }
              .container { max-width: 560px; margin: 0 auto; background: #111E31; border: 1px solid #1E3352; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
              .header { background: linear-gradient(135deg, #15243C 0%, #0E1A2C 100%); padding: 24px; border-bottom: 2px solid #EAB308; text-align: center; }
              .logo { font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #ffffff; margin: 0; }
              .sublogo { font-size: 11px; letter-spacing: 2px; color: #EAB308; text-transform: uppercase; margin-top: 4px; font-weight: 700; }
              .body-content { padding: 30px; }
              h2 { color: #ffffff; font-size: 20px; margin: 0 0 10px 0; font-weight: 800; }
              p { color: #cbd5e1; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0; }
              .card { background: #0E1A2C; border: 1px solid #1E3352; border-radius: 12px; padding: 18px; margin: 20px 0; }
              .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1E3352; font-size: 13px; }
              .row:last-child { border-bottom: none; }
              .label { color: #94a3b8; }
              .val { color: #ffffff; font-weight: 700; }
              .footer { background: #0A1320; padding: 16px; text-align: center; font-size: 11px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">TERRON</h1>
                <div class="sublogo">Sridewi Energies Private Limited</div>
              </div>
              <div class="body-content">
                <h2>Test Ride Request Confirmed!</h2>
                <p>Dear <strong>${booking.name}</strong>,</p>
                <p>Thank you for choosing <strong>Terron EV Mobility</strong>. Your official test ride request for the <strong>Terron ${booking.model}</strong> has been received by our showroom team.</p>
                
                <div class="card">
                  <div class="row"><span class="label">Booking ID:</span><span class="val" style="color: #38BDF8;">${booking.bookingId}</span></div>
                  <div class="row"><span class="label">Vehicle Model:</span><span class="val" style="color: #EAB308;">Terron ${booking.model}</span></div>
                  <div class="row"><span class="label">Scheduled Date:</span><span class="val" style="color: #38BDF8;">${formattedDate}</span></div>
                  <div class="row"><span class="label">Location:</span><span class="val">${booking.city}</span></div>
                  <div class="row"><span class="label">Contact Phone:</span><span class="val">${booking.phone}</span></div>
                </div>

                <p>Our regional Hyderabad showroom coordinator will reach out to you at <strong>${booking.phone}</strong> to confirm your slot time and prepare your scooter.</p>
                <p>Need assistance? Contact us directly at <a href="mailto:${senderEmail}" style="color: #EAB308; text-decoration: none;">${senderEmail}</a>.</p>
              </div>
              <div class="footer">
                Terron EV Mobility &bull; Sridewi Energies Private Limited &bull; Hyderabad, Telangana
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        customerResult = await transporter.sendMail({
          from: `"Terron EV Mobility" <${senderEmail}>`,
          to: booking.email,
          subject: `⚡ Your Test Ride Request: Terron ${booking.model} (${formattedDate})`,
          html: customerHtml,
          text: `Dear ${booking.name},\n\nYour test ride booking for Terron ${booking.model} on ${formattedDate} in ${booking.city} has been received. Our dealership team will call you at ${booking.phone} to confirm your appointment.\n\nThank you,\nTerron EV Mobility Team`
        });
        console.log(`✅ [Nodemailer] Customer confirmation sent to ${booking.email}! Message ID: ${customerResult.messageId}`);
      } catch (custErr) {
        console.warn(`⚠️ [Nodemailer] Could not send customer confirmation:`, custErr.message);
      }
    }

    return {
      success: true,
      dealershipMessageId: dealershipResult.messageId,
      customerMessageId: customerResult?.messageId || null,
      formattedDate
    };
  } catch (error) {
    console.error(`❌ [Nodemailer] Failed to send email notification:`, error.message);
    return { success: false, error: error.message, formattedDate };
  }
}

module.exports = {
  getTransporter,
  sendTestRideNotification,
  formatDDMMYYYY
};
