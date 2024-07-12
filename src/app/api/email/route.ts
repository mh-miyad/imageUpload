import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Function to send email
async function sendEmail() {
  const info = await transporter.sendMail({
    from: '"Mh miyad " <mhmiyad.dev@outlook.com>', // sender address
    to: "mhmiyad6565@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>miyad test email</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return info.messageId;
}

// Next.js API route
export async function GET(req: NextRequest) {
  try {
    const messageId = await sendEmail();
    return NextResponse.json({ message: `Message sent: ${messageId}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
