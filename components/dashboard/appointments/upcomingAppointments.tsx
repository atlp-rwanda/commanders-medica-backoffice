import { AuthContext } from "@/app/dashboard/layout";
import Loading from "@/components/Loading";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";
import {
  Appointment,
  AppointmentCalendarContext,
  getAppointmentTime,
  getColorByPackage,
  getDate,
  getPatientName,
} from "./helpers";

export default function UpcomingAppointments() {
  const currentUser = useContext(AuthContext);
  const { date } = useContext(AppointmentCalendarContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

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
        .eq("status", "Approved")
        .gt("appointment_date", getDate(date).toISOString())
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
  }, [currentUser, date]);

  const cancelAppointment = async (appointment: Appointment) => {
    const supabase = createClient();
    setUpdating(true);
    const { data, error } = await supabase
      .from("appointment")
      .update({ status: "Cancelled" })
      .eq("id", appointment.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data && data.length > 0) {
      setSelectedAppointment(null);
      window.location.reload();
    }
    setUpdating(false);
  };

  return (
    <>
      {selectedAppointment && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-6 rounded-xl min-w-80">
            {updating && (
              <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-xl min-w-80">
                  <p className="text-center">Updating...</p>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <header className="flex justify-between items-center">
                <h5 className="font-semibold">Confirm</h5>
                <button
                  className="text-gray-500"
                  onClick={() => setSelectedAppointment(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>
              <div className="flex flex-col items-center mt-2 mb-6">
                <p>Are you sure you wan't to cancel this appointment?</p>
              </div>

              <div className="flex flex-row items-center justify-end gap-2 mt-2">
                <button
                  className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
                  onClick={() => cancelAppointment(selectedAppointment)}
                  disabled={updating}
                >
                  Yes, cancel
                </button>
                <button
                  className="bg-red-200 text-red-500 px-8 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  onClick={() => setSelectedAppointment(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
      <section className="p-6 bg-white rounded-2xl shadow-md flex-1 mb-3">
        <div className="flex flex-row">
          <h4 className="text-lg font-semibold flex-1">
            Upcoming appointments
          </h4>
        </div>
        <div className={"overflow-auto" + (loading ? " my-24" : " my-8")}>
          {loading && appointments.length == 0 && (
            <Loading loading={loading} label="Loading upcoming appointments" />
          )}
          {!loading && appointments.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No appointments found
            </p>
          )}
          {!loading &&
            appointments.length > 0 &&
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
                  <div className="flex flex-row items-center justify-center gap-3">
                    <button
                      className="text-red-500 border border-red-500 px-4 py-0.5 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      Cancel
                    </button>
                    <button className="bg-primary-500 border border-primary-500 text-white px-4 py-0.5 rounded-full hover:bg-primary-700 transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-primary-500 border border-primary-500 text-white px-4 py-0.5 rounded-full hover:bg-primary-700 transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
