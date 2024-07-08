"use client";
import AppointmentRequests from "@/components/dashboard/appointments/appointmentRequests";
import CancelledAppointments from "@/components/dashboard/appointments/cancelledAppointments";
import UpcomingAppointments from "@/components/dashboard/appointments/upcomingAppointments";
import Navbar from "@/components/navbar";
import TopBar from "@/components/topbar";
import Link from "next/link";
import { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../layout";

type ValuePiece = Date | null;
type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export default function AppointmentsPage() {
  const currentUser = useContext(AuthContext);
  const [date, setDate] = useState<DateValue>(new Date());

  return (
    <main className=" bg-primary-500 flex">
      <div className="py-[30px] w-[230px]">
        <Navbar />
      </div>
      <div className="bg-[#F8F8F8] p-8 rounded-l-[50px] w-full overflow-hidden">
        <TopBar
          firstName={currentUser?.firstName ?? ""}
          image={currentUser?.image ?? ""}
        />
        <div className="flex mb-12 mt-6 gap-8">
          <div className="col flex-[2] overflow-hidden flex flex-col">
            <h1 className="text-xl mb-6">
              Good morning &nbsp;
              <span className="font-semibold text-3xl text-primary-500">
                Dr. {currentUser?.firstName}!
              </span>
            </h1>
            <UpcomingAppointments />
          </div>
          <div className="col max-w-[320px]">
            <div className="bg-white rounded-xl shadow-md p-5 mb-3">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-semibold">Calendar</h5>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.73976 7.68237C5.08716 7.3325 5.65273 7.3315 6.00137 7.68014L8.68446 10.3632C9.10984 10.7886 9.79952 10.7886 10.2249 10.3632L12.908 7.68014C13.2566 7.3315 13.8222 7.3325 14.1696 7.68237V7.68237C14.5153 8.0305 14.5143 8.59263 14.1674 8.93953L10.2249 12.882C9.79952 13.3074 9.10984 13.3074 8.68446 12.882L4.74198 8.93953C4.39507 8.59263 4.39408 8.0305 4.73976 7.68237V7.68237Z"
                    fill="#5F647E"
                  />
                </svg>
              </div>
              <div>
                <Calendar
                  className={"calendar"}
                  locale="en-US"
                  onChange={setDate}
                />
              </div>
              <div className="flex justify-between items-center pt-4">
                <p className="font-bold">Upcoming</p>
                <Link
                  href={""}
                  className="text-[12px] text-[#1A71FF] mr-[10px]"
                >
                  View all
                </Link>
              </div>
              <div className="flex gap-[30px] items-center mt-[20px] p-1 bg-[#F0F9FD] rounded-xl">
                <div className="ml-1 p-2 bg-gradient-to-tr from-[#1A71FF45] to-[#1A71FF] rounded-full h-[40px] w-[40px] flex items-center justify-center">
                  <p className="font-bold text-white">M</p>
                </div>
                <div>
                  <p className="text-[14px] font-semibold">
                    Monthly doctor's meet
                  </p>
                  <p className="text-[12px] text-[#0D0D0D60]">
                    8 April, 2021 | 04:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 mb-8">
          <div className="col flex-[1] overflow-hidden">
            <AppointmentRequests />
          </div>
          <div className="col flex-[1] overflow-hidden">
            <CancelledAppointments />
          </div>
        </div>
      </div>
    </main>
  );
}
