import nodemailer from 'nodemailer';

/**
 * Utility to send emails via SMTP.
 * Configured via environment variables.
 */
const sendEmail = async ({ email, subject, message }) => {
  const isDev = process.env.NODE_ENV === 'development';
  const hasCreds = process.env.SMTP_USER && !process.env.SMTP_USER.includes('your-email');

  // Log to console in development so the user can always find the OTP
  if (isDev) {
    console.log('-----------------------------------------');
    console.log(`📩 [DEV EMAIL] To: ${email}`);
    console.log(`📌 Subject: ${subject}`);
    // Extract OTP if present in message for easier reading
    const otpMatch = message.match(/>(\d{6})</);
    if (otpMatch) console.log(`🔑 VERIFICATION CODE: ${otpMatch[1]}`);
    console.log('-----------------------------------------');
  }

  if (!hasCreds) {
    if (isDev) {
      console.log('💡 SMTP credentials not configured. Skipping actual email dispatch.');
      return { messageId: 'dev-mock-id' };
    }
    throw new Error('SMTP credentials are not configured.');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"MedSecure AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('SMTP dispatch failed:', error.message);
    if (isDev) {
      console.log('⚠️ Email dispatch failed, but continuing since we are in development mode.');
      return { messageId: 'failed-but-logged' };
    }
    throw error;
  }
};

export default sendEmail;
