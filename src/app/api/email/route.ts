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
const token = Math.random().toString(36).slice(2);
// Function to send email
async function sendEmail() {
  const info = await transporter.sendMail({
    from: '"Mh miyad " <mhmiyad.dev@outlook.com>', // sender address
    to: "mhmiyad6565@gmail.com", // list of receivers
    subject: "Please Submit your OTP", // Subject line
    text: "Dear Mh miyad", // plain text body
    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Of Your Luck</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet">
</head>

<body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
          style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 16px;">
          <tr>
            <td align="center" bgcolor="#000000"
              style="padding: 10px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
              LOGO
            </td>
            <td align="center" bgcolor="#000000"
              style="padding: 10px 0; color: #ffffff; font-size: 24px; font-weight: bold;">
              FACEBOOK
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 20px; text-align: center; font-size: 16px;">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos minus similique, dolorem vero ipsam,
              aspernatur sunt, est corporis labore obcaecati cum voluptate! Quam maiores quia laudantium commodi
              architecto reprehenderit. Velit!
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center" style="padding: 20px;">
              <span style="color: blue; font-weight: bold; font-size: 40px; letter-spacing: 10px;">${token}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`,
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
