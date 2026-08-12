"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Briefcase,
  Code2,
  Layers,
  Users,
  MessageSquare
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getAvailableSlotsForDate, TimeSlot, formatDateReadable } from "@/lib/scheduling";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleMeetingModal({ isOpen, onClose }: ScheduleMeetingModalProps) {
  // Step state: 1: Type, 2: Date, 3: Time, 4: Info, 5: Success/Error
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("Technical Discussion");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);

  // Calendar month state
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    // Default selected date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    setSelectedDate(dateStr);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calendar logic
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const availableSlots: TimeSlot[] = selectedDate ? getAvailableSlotsForDate(selectedDate) : [];

  const handleSubmitBooking = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/schedule-meet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          meetingType: selectedType,
          selectedDate,
          selectedTime,
          notes
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Unable to confirm booking. Please try again.");
      }

      setBookingSuccessData(json.data);
      setStep(5); // Success step
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadICS = () => {
    if (!bookingSuccessData?.icalData) return;
    const blob = new Blob([bookingSuccessData.icalData], { type: "text/calendar;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `meeting-jathin-${selectedDate}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType("Technical Discussion");
    setName("");
    setEmail("");
    setNotes("");
    setErrorMsg("");
    setBookingSuccessData(null);
  };

  const getMeetingIcon = (iconName?: string) => {
    switch (iconName) {
      case "Code2": return <Code2 className="w-5 h-5 text-[#7A1F2B]" />;
      case "Briefcase": return <Briefcase className="w-5 h-5 text-[#7A1F2B]" />;
      case "Layers": return <Layers className="w-5 h-5 text-[#7A1F2B]" />;
      case "Users": return <Users className="w-5 h-5 text-[#7A1F2B]" />;
      default: return <MessageSquare className="w-5 h-5 text-[#7A1F2B]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 modal-overlay bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl modal-content flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111111]/95 backdrop-blur-md border-b border-white/10 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#7A1F2B]/20 text-[#9E2A3A] border border-[#7A1F2B]/40">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Schedule a Google Meet</h2>
              <p className="text-xs font-mono text-[#666666]">Direct calendar integration</p>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] text-[#A8A8A8] hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close scheduler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 pt-4 pb-2 border-b border-white/5 bg-[#080808]/40">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2">
              <span>Step {step} of 4</span>
              <span className="text-[#A8A8A8] font-semibold">
                {step === 1 && "Meeting Type"}
                {step === 2 && "Pick Date"}
                {step === 3 && "Select Time"}
                {step === 4 && "Your Details"}
              </span>
            </div>
            <div className="w-full bg-[#141414] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#7A1F2B] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body Steps */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* STEP 1: Meeting Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Select Meeting Type</h3>
                <p className="text-xs text-[#A8A8A8]">Choose the focus topic for our session.</p>
              </div>

              <div className="space-y-2.5">
                {PORTFOLIO_DATA.meetingTypes.map((type) => {
                  const isSelected = selectedType === type.title;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.title)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-[#141414] border-[#7A1F2B] shadow-md shadow-[#7A1F2B]/10"
                          : "bg-[#141414]/50 border-white/5 hover:border-white/20 hover:bg-[#141414]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-lg border ${isSelected ? "bg-[#7A1F2B]/30 border-[#7A1F2B]" : "bg-[#080808] border-white/10"}`}>
                          {getMeetingIcon(type.icon)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{type.title}</span>
                            <span className="text-[10px] font-mono font-normal text-[#A8A8A8] bg-white/5 px-2 py-0.5 rounded">
                              {type.duration}
                            </span>
                          </h4>
                          <p className="text-xs text-[#A8A8A8] mt-0.5">{type.description}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#7A1F2B] bg-[#7A1F2B]" : "border-white/20"}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Continue to Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Interactive Date Picker */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Select Date</h3>
                  <p className="text-xs text-[#A8A8A8]">Working availability (Mon — Sat)</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded bg-[#141414] hover:bg-[#1A1A1A] text-[#A8A8A8] hover:text-white border border-white/10 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white px-2">
                    {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded bg-[#141414] hover:bg-[#1A1A1A] text-[#A8A8A8] hover:text-white border border-white/10 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Monthly Calendar Grid */}
              <div className="bg-[#141414] border border-white/10 rounded-xl p-4">
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-[#666666] mb-2 font-semibold">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                  {/* Empty padding days */}
                  {Array.from({ length: firstDayOfMonth(currentMonth) }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2.5 text-transparent">-</div>
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth(currentMonth) }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                    const dateStr = dateObj.toISOString().split("T")[0];
                    const isSunday = dateObj.getDay() === 0;
                    const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
                    const isSelected = selectedDate === dateStr;

                    const isDisabled = isSunday || isPast;

                    return (
                      <button
                        key={dayNum}
                        disabled={isDisabled}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-2.5 rounded-lg transition-all text-xs font-mono font-medium ${
                          isSelected
                            ? "bg-[#7A1F2B] text-white shadow-md shadow-[#7A1F2B]/30 font-bold"
                            : isDisabled
                            ? "text-[#666666]/40 cursor-not-allowed opacity-30"
                            : "hover:bg-white/10 text-[#F5F5F5] cursor-pointer"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!selectedDate) {
                      setErrorMsg("Please select a date first.");
                      return;
                    }
                    setErrorMsg("");
                    setStep(3);
                  }}
                  className="px-6 py-3 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Select Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Time Slot Picker */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Select Time Slot</h3>
                <p className="text-xs font-mono text-[#A8A8A8]">
                  Date: <span className="text-white font-bold">{formatDateReadable(selectedDate)}</span> (IST)
                </p>
              </div>

              {availableSlots.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-[#A8A8A8] bg-[#141414] rounded-xl border border-white/10">
                  No available time slots on this date. Please choose a different weekday.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-3.5 rounded-xl border font-mono text-xs transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer ${
                          isSelected
                            ? "bg-[#7A1F2B] border-[#9E2A3A] text-white font-bold shadow-lg shadow-[#7A1F2B]/30"
                            : "bg-[#141414] border-white/10 hover:border-white/30 text-[#A8A8A8] hover:text-white"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!selectedTime) {
                      setErrorMsg("Please choose an available time slot.");
                      return;
                    }
                    setErrorMsg("");
                    setStep(4);
                  }}
                  className="px-6 py-3 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Enter Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Visitor Contact Details */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Your Contact Information</h3>
                <p className="text-xs text-[#A8A8A8]">Meeting invitation will be dispatched to this email.</p>
              </div>

              {/* Review Pill */}
              <div className="p-3 bg-[#141414] rounded-xl border border-white/10 text-xs font-mono text-[#A8A8A8] space-y-1">
                <p><span className="text-[#666666]">Topic:</span> <span className="text-white font-semibold">{selectedType}</span></p>
                <p><span className="text-[#666666]">When:</span> <span className="text-white font-semibold">{formatDateReadable(selectedDate)} at {selectedTime} IST</span></p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Your Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Session Notes / Agenda (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Briefly describe what you'd like to cover..."
                    className="w-full px-3 py-2 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  disabled={loading}
                  onClick={handleSubmitBooking}
                  className="px-6 py-3 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer min-h-[44px] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <span>Confirm & Book Meeting</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success / Confirmation Screen */}
          {step === 5 && bookingSuccessData && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded font-mono text-[10px] uppercase font-bold bg-white/5 text-[#A8A8A8]">
                  Reference ID: {bookingSuccessData.bookingId}
                </span>
                <h3 className="text-2xl font-extrabold text-white">Meeting Request Confirmed!</h3>
                <p className="text-xs text-[#A8A8A8] max-w-md mx-auto">
                  Your Google Meet slot with Kurapati Venkata Sai Jathin is reserved for{" "}
                  <strong className="text-white">{formatDateReadable(selectedDate)} at {selectedTime} IST</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar File</span>
                </button>

                <a
                  href={bookingSuccessData.googleMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] text-white font-mono text-xs border border-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                </a>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="text-xs font-mono text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
