import { AuthContext } from "@/app/dashboard/layout";
import Loading from "@/components/Loading";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";
import {
  Appointment,
  getColorByPackage,
  Patient,
} from "./upcomingAppointments";

export default function CancelledAppointments() {
  const currentUser = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const getPatientName = (patient: Patient) =>
    patient.full_name + " " + patient.nickname;

  const getAppointmentTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${parseInt(hours) >= 12 ? "PM" : "AM"}`;
  };

  useEffect(() => {
    if (!currentUser) return;
    const supabase = createClient();
    const fetchAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointment")
        .select(
          "id, date:appointment_date, time:appointment_time, package, duration, amount, cancellation_reason:Reason_couse_toUpdated, patient:patient_id(full_name, nickname, email, phone)"
        )
        .eq("doctor_id", currentUser.id)
        .eq("status", "Cancelled")
        .order("appointment_date", { ascending: true })
        .limit(5);

      setLoading(false);

      if (error) {
        console.log(error);
      }

      if (data) {
        setAppointments(data);
      }
    };
    fetchAppointments();
  }, [currentUser]);

  return (
    <section className="p-6 bg-white rounded-2xl shadow-md mb-3">
      <div className="flex flex-row">
        <h4 className="text-lg font-semibold flex-1">Cancelled Appointments</h4>
        <div className="w-32">
          <select className="bg-transparent focus:outline-none w-full">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This week</option>
            <option>This month</option>
          </select>
        </div>
      </div>
      <div className={"overflow-auto" + (loading ? " my-24" : " my-8")}>
        {loading && appointments.length == 0 && (
          <Loading loading={loading} label="Loading cancelled appointments" />
        )}
        {!loading && appointments.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No appointments found
          </p>
        )}
        {!loading && appointments.length > 0 &&
          appointments.map((appointment) => {
            const color = getColorByPackage(appointment.package);
            return (
              <div
                key={appointment.id}
                className="flex flex-row items-center justify-between py-2 my-1"
              >
                <div
                  className="avatar min-w-10 max-w-10 h-10 mr-4 border rounded-full p-0.5"
                  style={{ borderColor: color?.dark }}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${getPatientName(
                      appointment.patient
                    )}&background=${color?.light.replace(
                      "#",
                      ""
                    )}&font-size=0.35&rounded=true&bold=true`}
                    alt={getPatientName(appointment.patient)}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex-1 mr-12 whitespace-nowrap">
                  <p className="font-semibold">
                    {getPatientName(appointment.patient)}
                  </p>
                  <p className={`text-sm`} style={{ color: color?.dark }}>
                    {appointment.package}
                  </p>
                </div>
                <div className="flex items-center justify-center mx-12">
                  <p
                    className={`w-20 font-medium text-center text-sm rounded-lg px-2 py-1 whitespace-nowrap`}
                    style={{
                      backgroundColor: color?.light,
                      color: color?.dark,
                    }}
                  >
                    {getAppointmentTime(appointment.time)}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <button className="bg-primary-500 border border-primary-500 text-white px-4 py-0.5 rounded-full hover:bg-primary-700 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
