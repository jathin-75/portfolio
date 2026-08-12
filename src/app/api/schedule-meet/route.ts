import { NextResponse } from "next/server";
import { validateScheduleInput } from "@/lib/validations";
import { generateICalFile, generateGoogleCalendarTemplateUrl } from "@/lib/scheduling";
import { sendMeetingNotifications } from "@/lib/email";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateScheduleInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, meetingType, selectedDate, selectedTime, notes } = body;

    // Generate direct Google Calendar Event creation link prefilled with session data
    const gcalUrl = generateGoogleCalendarTemplateUrl({
      title: meetingType,
      description: `Meeting request with Kurapati Venkata Sai Jathin.\nAttendee: ${name} (${email})\nMeeting Type: ${meetingType}\nNotes: ${notes || "None"}`,
      dateStr: selectedDate,
      timeStr: selectedTime,
      organizerEmail: PORTFOLIO_DATA.personal.socials.directEmail
    });

    // Generate iCal payload
    const icalContent = generateICalFile({
      title: `${meetingType}`,
      description: `Meeting request with Kurapati Venkata Sai Jathin.\nMeeting Type: ${meetingType}\nDate: ${selectedDate}\nTime: ${selectedTime}\nNotes: ${notes || "None"}`,
      dateStr: selectedDate,
      timeStr: selectedTime,
      organizerEmail: PORTFOLIO_DATA.personal.socials.directEmail,
      attendeeEmail: email,
      attendeeName: name
    });

    // Dispatch automatic dual email notifications (Host + Visitor)
    const emailResult = await sendMeetingNotifications({
      visitorName: name,
      visitorEmail: email,
      meetingType,
      selectedDate,
      selectedTime,
      notes,
      googleMeetUrl: gcalUrl
    });

    console.log("[SCHEDULING CONFIRMED & EMAILS DISPATCHED]", {
      name,
      email,
      meetingType,
      selectedDate,
      selectedTime,
      emailResult,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: "Meeting request successfully scheduled! Confirmation emails dispatched.",
      data: {
        bookingId: `MEET-${Date.now().toString(36).toUpperCase()}`,
        name,
        email,
        meetingType,
        selectedDate,
        selectedTime,
        googleMeetUrl: gcalUrl,
        calendlyFallbackUrl: PORTFOLIO_DATA.personal.calendlyFallbackUrl,
        icalData: icalContent,
        emailStatus: emailResult
      }
    });
  } catch (error: any) {
    console.error("Error processing meeting schedule:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unable to confirm meeting reservation. Please try again."
      },
      { status: 500 }
    );
  }
}
