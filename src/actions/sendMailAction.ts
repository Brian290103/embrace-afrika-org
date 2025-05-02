"use server"; // Marks this as a Server Action
import nodemailer from "nodemailer";

interface EmailResult {
  success: boolean;
  message: string;
}

export async function sendEmail(
  email: string,
  subject: string,
  message: string,
  username: string,
): Promise<EmailResult> {
  const transporter = nodemailer.createTransport({
    host: "mail.embraceafrika.org",
    port: 465,
    secure: true, // Use `true` for 465, `false` for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // You might want to add some validation here to make sure the inputs are valid
  if (!email) {
    return { success: false, message: "Email address is required." };
  }
  if (!subject) {
    return { success: false, message: "Subject is required." };
  }
  if (!message) {
    return { success: false, message: "Message body is required." };
  }
  if (!username) {
    return { success: false, message: "Username is required" };
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // Consider making this a parameter if needed
      to: "info@embraceafrika.org", // Replace with your website's contact email address
      subject: subject, // Use the provided subject
      text: `Message from ${username} (${email}):\n\n${message}`, // Include username and email in plain text
      html: `<p><strong>Message from:</strong> ${username} (${email})</p><p>${message}</p>`, // Include username and email in HTML
      replyTo: email, // Use the provided email
    });
    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error: any) {
    `
    console.error(error);`;
    return {
      success: false,
      message: `Failed to send email: ${error.message}`,
    }; // Include the error message
  }
}
