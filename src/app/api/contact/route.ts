import { NextResponse } from "next/server";
import { validateContactInput } from "@/lib/validations";
import { sendContactFormEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateContactInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Dispatch automatic dual emails (Message to Jathin + Receipt to Visitor)
    const emailResult = await sendContactFormEmail({
      name,
      email,
      subject,
      message
    });

    console.log("[CONTACT MESSAGE CONFIRMED & DISPATCHED]", {
      name,
      email,
      subject,
      emailResult,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! Check your inbox for confirmation."
    });
  } catch (error: any) {
    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred. Please try again later."
      },
      { status: 500 }
    );
  }
}
