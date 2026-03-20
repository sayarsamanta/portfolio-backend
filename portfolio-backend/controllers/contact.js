const express = require("express");
const { Resend } = require("resend");
// const nodemailer = require("nodemailer");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ name, email, message }) => {
  const data = await resend.emails.send({
    from: process.env.SENDER_EMAIL,
    to: "sayarsamanta@gmail.com",
    reply_to: email,
    subject: `Portfolio Contact from ${name}`,
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f7; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);">

              <!-- Header -->
              <tr>
                <td style="text-align: center; padding-bottom: 30px;">
                  <h1 style="color: #2C2C2C; font-size: 24px; margin: 0;">Thank You for Reaching Out</h1>
                  <p style="color: #555555; font-size: 14px; margin: 5px 0 0;">Sayar Samanta | Portfolio & Professional Profile</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding-bottom: 20px;">
                  <p style="font-size: 16px; color: #333333; margin: 0;">Hi ${name},</p>
                </td>
              </tr>

              <!-- Message Body -->
              <tr>
                <td style="padding-bottom: 20px;">
                  <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 0;">
                    Thank you for contacting me. I have received your message and will review it promptly. I appreciate your interest and will respond as soon as possible.
                  </p>
                </td>
              </tr>

              <!-- User Message Block -->
              <tr>
                <td style="padding: 20px; background-color: #f2f2f7; border-left: 5px solid #4b0082; border-radius: 5px; font-style: italic; color: #555555;">
                  ${message}
                </td>
              </tr>

              <!-- Closing -->
              <tr>
                <td style="padding-top: 25px;">
                  <p style="font-size: 16px; color: #333333; margin: 0;">Best regards,</p>
                  <p style="font-size: 16px; color: #333333; margin: 5px 0 0 0;">
                    <strong>Sayar Samanta</strong><br/>
                    <span style="color: #4b0082;">Portfolio & Professional Profile</span>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding-top: 35px; text-align: center; font-size: 12px; color: #888888;">
                  <p>© 2026 Sayar Samanta. All rights reserved.</p>
                  <p>Connect professionally: <a href="https://www.linkedin.com/in/sayarsamanta" style="color: #4b0082; text-decoration: none;">LinkedIn</a></p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
      `,
  });

  return data;
};
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const response = await sendMail({
      name,
      email,
      message,
    });
    if (response) {
      res.status(200).json({ message: "Message sent successfully." });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
