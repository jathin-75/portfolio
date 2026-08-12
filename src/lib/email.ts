import { Resend } from "resend";
import nodemailer from "nodemailer";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

// Universal Email Dispatcher
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<{ success: boolean; provider: string; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // 1. Primary Option: Resend SDK
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromAddress = process.env.RESEND_FROM_EMAIL || "Kurapati.dev <onboarding@resend.dev>";
      
      const { data, error } = await resend.emails.send({
        from: fromAddress,
        to,
        subject,
        html,
        replyTo: replyTo || PORTFOLIO_DATA.personal.socials.directEmail
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, provider: "Resend" };
    } catch (err: any) {
      console.error("[EMAIL ERROR - RESEND]", err);
    }
  }

  // 2. Secondary Option: Nodemailer / SMTP (e.g. Gmail App Password)
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: `"Kurapati Venkata Sai Jathin" <${smtpUser}>`,
        to: Array.isArray(to) ? to.join(", ") : to,
        subject,
        html,
        replyTo: replyTo || PORTFOLIO_DATA.personal.socials.directEmail
      });

      return { success: true, provider: "Nodemailer SMTP" };
    } catch (err: any) {
      console.error("[EMAIL ERROR - SMTP]", err);
    }
  }

  // 3. Fallback: Log payload
  console.log("[EMAIL SIMULATED DISPATCH]", {
    to,
    subject,
    replyTo,
    timestamp: new Date().toISOString()
  });

  return {
    success: true,
    provider: "Simulated Log Mode (Add RESEND_API_KEY or SMTP_USER & SMTP_PASS in .env.local)"
  };
}

// Send Meeting Notifications (Sends to BOTH Jathin & Visitor)
export async function sendMeetingNotifications(params: {
  visitorName: string;
  visitorEmail: string;
  meetingType: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
  googleMeetUrl: string;
}) {
  const { visitorName, visitorEmail, meetingType, selectedDate, selectedTime, notes, googleMeetUrl } = params;
  const jathinEmail = PORTFOLIO_DATA.personal.socials.directEmail;

  // HTML template for Jathin (Host)
  const hostHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080808; color: #F5F5F5; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #7A1F2B; margin-top: 0;">🗓️ New Meeting Booked!</h2>
      <p style="font-size: 16px; color: #F5F5F5;">A new session has been scheduled through your portfolio.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #141414; border-radius: 8px; overflow: hidden;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Attendee:</td>
          <td style="padding: 12px; color: #FFFFFF;">${visitorName} (&lt;<a href="mailto:${visitorEmail}" style="color: #7A1F2B;">${visitorEmail}</a>&gt;)</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Meeting Topic:</td>
          <td style="padding: 12px; color: #FFFFFF;">${meetingType}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Date & Time:</td>
          <td style="padding: 12px; color: #FFFFFF;">${selectedDate} at ${selectedTime} IST</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Notes:</td>
          <td style="padding: 12px; color: #FFFFFF;">${notes || "No notes provided"}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${googleMeetUrl}" style="background-color: #7A1F2B; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Google Calendar / Meet</a>
      </div>
    </div>
  `;

  // HTML template for Visitor (Confirmation)
  const visitorHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080808; color: #F5F5F5; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #7A1F2B; margin-top: 0;">✓ Meeting Request Confirmed</h2>
      <p style="font-size: 16px; color: #F5F5F5;">Hi ${visitorName},</p>
      <p style="font-size: 14px; color: #A8A8A8;">Your session with <strong>Kurapati Venkata Sai Jathin</strong> has been reserved.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #141414; border-radius: 8px; overflow: hidden;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Topic:</td>
          <td style="padding: 12px; color: #FFFFFF;">${meetingType}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Date & Time:</td>
          <td style="padding: 12px; color: #FFFFFF;">${selectedDate} at ${selectedTime} IST</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #A8A8A8; font-weight: bold;">Host:</td>
          <td style="padding: 12px; color: #FFFFFF;">Kurapati Venkata Sai Jathin (${jathinEmail})</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${googleMeetUrl}" style="background-color: #7A1F2B; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Add to Google Calendar</a>
      </div>
    </div>
  `;

  // Send email to Jathin (Host)
  const resHost = await sendEmail({
    to: jathinEmail,
    subject: `[Meeting Booked] ${meetingType} with ${visitorName}`,
    html: hostHtml,
    replyTo: visitorEmail
  });

  // Send confirmation email to Visitor
  const resVisitor = await sendEmail({
    to: visitorEmail,
    subject: `[Confirmation] Session with Kurapati Venkata Sai Jathin`,
    html: visitorHtml,
    replyTo: jathinEmail
  });

  return { resHost, resVisitor };
}

// Send Direct Contact Form Message (Sends to Jathin & confirmation to Visitor)
export async function sendContactFormEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = params;
  const jathinEmail = PORTFOLIO_DATA.personal.socials.directEmail;

  const hostHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080808; color: #F5F5F5; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #7A1F2B; margin-top: 0;">💬 New Portfolio Message</h2>
      <p style="font-size: 14px; color: #A8A8A8;">Received from your website contact form:</p>
      
      <div style="background-color: #141414; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px 0;"><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}" style="color: #7A1F2B;">${email}</a>&gt;)</p>
        <p style="margin: 0 0 8px 0;"><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;" />
        <p style="margin: 0; white-space: pre-wrap; color: #FFFFFF;">${message}</p>
      </div>

      <p style="font-size: 12px; color: #666666;">Reply directly to this email to respond to ${name}.</p>
    </div>
  `;

  const visitorHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #080808; color: #F5F5F5; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #7A1F2B; margin-top: 0;">✓ Message Received</h2>
      <p style="font-size: 16px; color: #F5F5F5;">Hi ${name},</p>
      <p style="font-size: 14px; color: #A8A8A8;">Thank you for reaching out! Your message regarding "<strong>${subject}</strong>" has been delivered to Kurapati Venkata Sai Jathin.</p>
      <p style="font-size: 14px; color: #A8A8A8;">Jathin will review your inquiry and reply to you at <strong>${email}</strong> shortly.</p>
    </div>
  `;

  const resHost = await sendEmail({
    to: jathinEmail,
    subject: `[Portfolio Inquiry] ${subject}`,
    html: hostHtml,
    replyTo: email
  });

  const resVisitor = await sendEmail({
    to: email,
    subject: `[Received] Message to Kurapati Venkata Sai Jathin`,
    html: visitorHtml,
    replyTo: jathinEmail
  });

  return { resHost, resVisitor };
}
