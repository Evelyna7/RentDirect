import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(email, code, subject = 'Verification code') {
  // tu código actual de nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: `Your code is: ${code}`
  };
  await transporter.sendMail(mailOptions);
}
