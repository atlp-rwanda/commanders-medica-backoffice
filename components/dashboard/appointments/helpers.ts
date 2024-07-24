import { UUID } from "crypto";
import { createContext } from "react";

export const AppointmentCalendarContext = createContext<{
  date: DateValue;
  setDate: (date: DateValue) => void;
}>({
  date: new Date(),
  setDate: () => {},
});

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export type Patient = {
  id: UUID;
  full_name: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  problem: string;
};

export type Appointment = {
  id: UUID;
  patient_id: UUID;
  doctor_id: UUID;
  date: string;
  time: string;
  status: "Booked" | "Approved" | "Completed" | "Cancelled" | "Rescheduled";
  package: "Messaging" | "Video Call" | "Voice Call";
  duration: string;
  amount: string;
  cancellation_reason: string;
  patient: Patient;
};

const colors = [
  {
    type: "Messaging",
    light: "#fdd2e7",
    dark: "#F62088",
  },
  {
    type: "Video Call",
    light: "#ccccff",
    dark: "#6666ff",
  },
  {
    type: "Voice Call",
    light: "#cfe7e6",
    dark: "#128983",
  },
];

export const getColorByPackage = (type: string) => {
  return colors.find((color) => color.type === type);
};

export const getPatientName = (patient: Patient) =>
  patient.full_name + " " + patient.nickname;

export const getAppointmentTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes} ${parseInt(hours) >= 12 ? "PM" : "AM"}`;
};

export const getAppointmentDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const getPatientAge = (dateOfBirth: string) => {
  if (!dateOfBirth) return "N/A";
  const dob = new Date(dateOfBirth);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const getAppointmentDuration = (time: string, duration: string) => {
  const [hours, minutes] = time.split(":");
  const [count, identifier] = duration.split(" ");
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  let endMinutes = totalMinutes;

  if (identifier === "minutes") {
    endMinutes += parseInt(count);
  } else {
    endMinutes += parseInt(count) * 60;
  }

  const endHours = Math.floor(endMinutes / 60);
  const endMinutesRemainder = endMinutes % 60;

  return `${hours}:${minutes} - ${endHours}:${endMinutesRemainder} ${
    endHours >= 12 ? "PM" : "AM"
  } (${duration})`;
};

export const getDate = (date: DateValue) => {
  const d = new Date(date?.toString() ?? "");
  return new Date(
    Date.parse(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} 00:00:00`)
  );
};
