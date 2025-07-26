import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `http://localhost:5000/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: '🌟 Verify Your Email - Action Required!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <h2 style="color: #333;">Welcome to Our Community 👋</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for signing up! To complete your registration, please verify your email address.
        </p>
        <a href="${url}" style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
          ✅ Verify Email
        </a>
        <p style="font-size: 14px; color: #999;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
