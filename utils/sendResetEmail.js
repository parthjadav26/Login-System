import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendResetEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const url = `http://localhost:5000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: '🔒 Reset Your Password - Link Inside',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #fdfdfd; border: 1px solid #ddd;">
        <h2 style="color: #c0392b;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password. Click the button below to reset it. This link is valid for <strong>15 minutes</strong>.
        </p>
        <a href="${url}" style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #e74c3c; color: white; text-decoration: none; border-radius: 5px;">
          🔁 Reset Password
        </a>
        <p style="font-size: 14px; color: #999;">
          Didn't request a password reset? No problem, just ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

