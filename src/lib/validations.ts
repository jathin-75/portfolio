export interface SchedulePayload {
  name: string;
  email: string;
  meetingType: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateScheduleInput(data: Partial<SchedulePayload>): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Please enter your full name (at least 2 characters)." };
  }
  if (!data.email || !validateEmail(data.email.trim())) {
    return { valid: false, error: "Please provide a valid email address." };
  }
  if (!data.meetingType || data.meetingType.trim() === "") {
    return { valid: false, error: "Please select a meeting type." };
  }
  if (!data.selectedDate || data.selectedDate.trim() === "") {
    return { valid: false, error: "Please select a valid meeting date." };
  }
  if (!data.selectedTime || data.selectedTime.trim() === "") {
    return { valid: false, error: "Please select an available time slot." };
  }
  return { valid: true };
}

export function validateContactInput(data: Partial<ContactPayload>): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Please enter your name." };
  }
  if (!data.email || !validateEmail(data.email.trim())) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  if (!data.subject || data.subject.trim().length < 3) {
    return { valid: false, error: "Please enter a subject (at least 3 characters)." };
  }
  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: "Message should be at least 10 characters long." };
  }
  return { valid: true };
}
