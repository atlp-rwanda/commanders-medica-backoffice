"use client";
import { AuthContext } from "@/app/dashboard/layout";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Appointment,
  getColorByPackage,
  Patient,
} from "./dashboard/appointments/upcomingAppointments";
import ListItem from "./listItem";
import TopBar from "./topbar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MainSection() {
  const currentUser = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getPatientName = (patient: Patient) =>
    patient.full_name + " " + patient.nickname;

  useEffect(() => {
    if (!currentUser) return;
    const supabase = createClient();
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointment")
        .select(
          "id, date:appointment_date, time:appointment_time, package, duration, amount, cancellation_reason:Reason_couse_toUpdated, patient:patient_id(full_name, nickname, email, phone)"
        )
        .eq("doctor_id", currentUser.id)
        .eq("status", "Approved")
        .gt("appointment_date", new Date().toISOString())
        .order("appointment_date", { ascending: true })
        .limit(5);

      if (error) {
        console.log(error);
      }

      if (data) {
        setAppointments(data);
      }
    };
    fetchAppointments();
  }, [currentUser]);

  const [dateValue, setDateValue] = useState<Value>(new Date());

  return (
    <div className="bg-[#F8F8F8] rounded-l-[50px] ps-[30px] pt-[30px] overflow-x-hidden w-[100%]">
      <div>
        <TopBar
          firstName={currentUser?.firstName ?? ""}
          image={currentUser?.image ?? ""}
        />
      </div>
      <section className="pt-[30px] flex justify-between flex-wrap w-full">
        <section className="w-[60%] max-[1190px]:w-[90%]">
          <div>
            <span>
              <h1 className="text-[22px]">
                Good morning &nbsp;{" "}
                <span className="text-[#246BFD] text-[26px] font-semibold">
                  Dr {currentUser?.firstName}!
                </span>
              </h1>
            </span>
          </div>
          <section className="bg-gradient-to-tr relative from-[#1A71FF33] to-[#246BFD] w-[100%] p-4 rounded-3xl mt-[30px]">
            <div>
              <div>
                <p className="font-medium text-[20px] my-2">Visits for today</p>
                <p className="font-semibold text-[30px]">140</p>
              </div>
              <section className="w-[55%] flex justify-between py-2 max-[761px]:w-[100%]">
                <div className="bg-[#FFFFFF55] p-4 rounded-xl">
                  <p>New Patients</p>
                  <br />
                  <div className="flex">
                    <p className="font-semibold text-[30px]"> 50</p>
                    <div className="bg-[#DFFDDD] flex gap-3 rounded-3xl justify-center ml-[1.2rem] p-2 relative left-[15%]">
                      <p className="text-[#008000]">50%</p>
                      <Image
                        src={require("../assets/icons/upward.svg")}
                        alt="downward"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFFFF55] p-4 rounded-xl">
                  <p>Old Patients</p>
                  <div className="flex pt-4 items-center">
                    <p className="font-semibold text-[30px]">64</p>
                    <div className="bg-[#FBC3C3] flex gap-3 rounded-xl items-center ml-[1rem] h-[20px] p-1">
                      <p className="text-[#D30404] text-[14px]">24%</p>
                      <Image
                        src={require("../assets/icons/downward.svg")}
                        alt="downward"
                        width={15}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-[40%] absolute right-[-10px] bottom-[0] max-[761px]:hidden">
              <Image
                src={require("../assets/images/doctor.png")}
                alt="doctor"
                width={250}
              />
            </div>
          </section>
          <section className="w-[100%] flex bg-white rounded-xl shadow-md p-5 mt-5 max-[720px]:flex-wrap">
            <div className="w-[50%] max-[720px]:w-[80%] p-2">
              <div className="flex justify-between items-center pb-2 text-[18px]">
                <p className="font-medium my-2">Upcoming appointments</p>
                <div className="flex gap-2 items-center  ">
                  <p className=" text-gray-500 font-light">Today</p>
                  <Image
                    src={require("../assets/icons/accordion.svg")}
                    alt="accordion"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[20px]">
                {appointments.length === 0 && (
                  <p className="text-center text-gray-500 py-12">
                    No appointments found
                  </p>
                )}
                {appointments.length > 0 &&
                  appointments.map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      name={getPatientName(appointment.patient)}
                      visitType={appointment.package}
                      time={appointment.time}
                      color={getColorByPackage(appointment.package)?.dark!}
                    />
                  ))}
              </div>
            </div>
            <div className="w-[50%] p-4 border-[1px] border-[#58B6DE] ml-[20px] rounded-xl max-[720px]:w-[80%]">
              <div className="text-[18px] font-medium">
                <p>Consultation</p>
              </div>
              <div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-[30px]">
                    <div className="w-[50px]">
                      <div
                        className={`border-[1px] border-[#F62088] p-1 rounded-full flex justify-center items-center`}
                      >
                        <span
                          className={`bg-[#F6208815] p-2 w-[45px] flex justify-center rounded-full`}
                        >
                          SM
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold">
                        Stacy Mitchell
                      </p>
                      <p className={`text-[#F62088] text-[14px]`}>
                        Male - 28 Years 3 Months
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`bg-[#F6208815] w-[30px] h-[30px] rounded-full  mr-[10px] flex justify-center items-center p-2`}
                    >
                      <Image
                        src={require("../assets/icons/threedots.svg")}
                        alt="three dots"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-[30px] pt-4 text-[12px]">
                  <div className="flex flex-col gap-[10px] items-center">
                    <Image
                      src={require("../assets/icons/fever.svg")}
                      alt="fever"
                      className=""
                    />
                    <p className="font-medium">Fever</p>
                  </div>
                  <div className="flex flex-col gap-[10px] items-center">
                    <Image
                      src={require("../assets/icons/cough.svg")}
                      alt="fever"
                      className=""
                    />
                    <p className="font-medium">Cough</p>
                  </div>
                  <div className="flex flex-col gap-[10px] items-center">
                    <Image
                      src={require("../assets/icons/heartburn.svg")}
                      alt="fever"
                      className=""
                    />
                    <p className="font-medium">Heart burn</p>
                  </div>
                </div>
                <div className="border-b-[1px] border-[#58B6DE] w-[100%] h-[1px] my-4"></div>
                <div className="flex flex-col gap-[10px]">
                  <div className="flex w-full gap-[30px]">
                    <p className="font-medium  w-[40%]">Last checked</p>
                    <p className="w-[60%] text-[12px]">
                      Dr Everly on 21 April 2021 Prescription{" "}
                      <span className="text-[#1A71FF]">#2J983KT0</span>
                    </p>
                  </div>
                  <div className="flex w-full gap-[30px]">
                    <p className="font-medium w-[40%]">Observations</p>
                    <p className="w-[60%] text-[12px]">
                      High fever and cough at normal hemoglobin levels.
                    </p>
                  </div>
                  <div className="flex w-full gap-[30px]">
                    <p className="font-medium w-[40%]">Prescription</p>
                    <p className="w-[60%] text-[12px]">
                      Paracetmol - 2 times a day Dizopam - Day and Night before
                      meal Wikoryl
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section
          id="right-side"
          className="mr-[30px] p-5 border-black rounded-xl w-[35%] max-[1190px]:w-[60%] max-[700px]:w-[80%]"
        >
          <div className="bg-white rounded-xl shadow-md p-5">
            <div>
              <Calendar
                className={"calendar"}
                locale="en-US"
                onChange={setDateValue}
              />
            </div>
            <div className="flex justify-between items-center pt-4">
              <p className="font-bold">Upcoming</p>
              <Link href={""} className="text-[12px] text-[#1A71FF] mr-[10px]">
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
          <div className="bg-white rounded-xl shadow-md p-5 mt-5">
            <div className="flex gap-4 items-center">
              <p>
                <svg width="9" height="10" viewBox="0 0 9 10">
                  <circle cx="4.5115" cy="5.00944" r="4.09653" fill="#BFEBBF" />
                </svg>
              </p>
              <p className="text-[#0D0D0D60] text-[14px]">DAILY</p>
            </div>

            <div>
              <p className="font-semibold">
                Equitable medical education with efforts toward real change
              </p>
              <div>
                <Image
                  src={require("../assets/images/article.png")}
                  alt="article"
                  className="w-[100%]"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
