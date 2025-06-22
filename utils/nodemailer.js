import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmailOtp(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP VERIFICATION",
    html: `<div
  style="
    font-family: 'Segoe UI', sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #fefefe;
    border: 1px solid #ddd;
    border-radius: 10px;
  "
>
  <h2 style="text-align: center; color: #6c63ff">Threadly OTP Verification</h2>
  <p style="font-size: 16px; color: #333">Hey there 👋,</p>
  <p style="font-size: 16px; color: #333">
    Use the following OTP to verify your email address in
    <strong>Threadly</strong>. Don't share it with anyone .
  </p>
  <div style="text-align: center; margin: 30px 0">
    <span style="font-size: 32px; font-weight: bold; color: #6c63ff"
      >${otp}</span
    >
  </div>
  <p style="font-size: 14px; color: #999">
    This OTP is valid for 5 minutes. If you didn't request this, just ignore it
    ✌️.
  </p>
  <hr style="margin: 30px 0" />
  <p style="font-size: 12px; color: #aaa; text-align: center">
    &copy; ${new Date().getFullYear()} Threadly. All rights reserved.
  </p>
</div>`,
  };
  try {
    let response = await transporter.sendMail(mailOptions);
    return response.response;
  } catch (error) {
    return error;
  }
}

export { sendEmailOtp };
