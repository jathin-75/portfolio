export interface TimeSlot {
  time: string;
  available: boolean;
  period: "AM" | "PM";
}

// Generate available time slots for a given date (IST working hours)
export function getAvailableSlotsForDate(dateString: string): TimeSlot[] {
  const dateObj = new Date(dateString);
  const dayOfWeek = dateObj.getDay();

  // Closed on Sundays
  if (dayOfWeek === 0) {
    return [];
  }

  const standardSlots: TimeSlot[] = [
    { time: "10:00 AM", available: true, period: "AM" },
    { time: "11:30 AM", available: true, period: "AM" },
    { time: "02:00 PM", available: true, period: "PM" },
    { time: "03:30 PM", available: true, period: "PM" },
    { time: "05:00 PM", available: true, period: "PM" },
    { time: "06:30 PM", available: true, period: "PM" }
  ];

  // Saturday lighter schedule
  if (dayOfWeek === 6) {
    return standardSlots.slice(0, 3);
  }

  return standardSlots;
}

// Helper to convert dateStr (YYYY-MM-DD) and timeStr (10:00 AM) to UTC Date objects
function getUtcTimes(dateStr: string, timeStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);

  let hours = 10;
  let minutes = 0;

  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }

  // Treat input time as IST (UTC+5:30)
  const localMs = Date.UTC(year, month - 1, day, hours, minutes);
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const startUtc = new Date(localMs - istOffsetMs);
  const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);

  return { startUtc, endUtc };
}

// Generate direct Google Calendar Event creation URL with prefilled title, date, guests & Google Meet setting
export function generateGoogleCalendarTemplateUrl(params: {
  title: string;
  description: string;
  dateStr: string;
  timeStr: string;
  organizerEmail: string;
}): string {
  const { title, description, dateStr, timeStr, organizerEmail } = params;
  const { startUtc, endUtc } = getUtcTimes(dateStr, timeStr);

  const formatGCalDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");
  const datesParam = `${formatGCalDate(startUtc)}/${formatGCalDate(endUtc)}`;

  const baseUrl = "https://calendar.google.com/calendar/render";
  const searchParams = new URLSearchParams({
    action: "TEMPLATE",
    text: `${title} — Kurapati Venkata Sai Jathin`,
    dates: datesParam,
    details: `${description}\n\nOrganizer: Kurapati Venkata Sai Jathin (${organizerEmail})`,
    add: organizerEmail,
    location: "Google Meet"
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

// Generate iCalendar (.ics) content for client download
export function generateICalFile(params: {
  title: string;
  description: string;
  dateStr: string;
  timeStr: string;
  organizerEmail: string;
  attendeeEmail: string;
  attendeeName: string;
}): string {
  const { title, description, dateStr, timeStr, organizerEmail, attendeeEmail, attendeeName } = params;
  const { startUtc, endUtc } = getUtcTimes(dateStr, timeStr);

  const formatDateToICS = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");

  const dtStart = formatDateToICS(startUtc);
  const dtEnd = formatDateToICS(endUtc);
  const dtStamp = formatDateToICS(new Date());

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kurapati Venkata Sai Jathin//Portfolio Scheduler//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:meet-${Date.now()}@kurapati.dev
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${title} - Kurapati Venkata Sai Jathin
DESCRIPTION:${description.replace(/\n/g, "\\n")}
ORGANIZER;CN="Kurapati Venkata Sai Jathin":mailto:${organizerEmail}
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${attendeeName}:mailto:${attendeeEmail}
STATUS:CONFIRMED
LOCATION:Google Meet
END:VEVENT
END:VCALENDAR`;
}

export function formatDateReadable(dateStr: string): string {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr + "T00:00:00");
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
