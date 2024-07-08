"use client";
import MessagesMain from "@/components/messages/messagesSection";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layout";

export interface AppointmentType {
  id: string;
  patient_id: string;
  doctor_id: string;
}

export interface MessageType {
  id: string;
  message: string;
  type: string;
  sender_id: string;
  created_at: string;
  appointment_id: string;
  audio_url: string;
  appointment: {
    id: string;
    patient_id: string;
    doctor_id: string;
    duration: string;
    appointment_date: string;
    appointment_time: string;
    patient: {
      full_name: string;
      profile_picture: string;
    };
  };
}

export default function Messages() {
  const router = useRouter();
  const currentUser = useContext(AuthContext);
  const [willRefresh, setwillRefresh] = useState<number>(0);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchAppointments = async (
    userId: string
  ): Promise<AppointmentType[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("appointment")
      .select("id, patient_id, doctor_id")
      .eq("doctor_id", userId);

    if (error) throw error;
    return data;
  };

  const fetchMessages = async (
    appointmentId: string
  ): Promise<MessageType[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .select(
        "id, message, sender_id, type,created_at, appointment_id,audio_url ,appointment(id,patient_id,doctor_id, duration, appointment_date, appointment_time ,patient(full_name,profile_picture))"
      )
      .eq("appointment_id", appointmentId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    console.log(data);
    return data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const appointments = await fetchAppointments(currentUser?.id!);

        const allMessages = await Promise.all(
          appointments.map((appointment) => fetchMessages(appointment.id))
        );

        setMessages(allMessages.flat());
        console.log(allMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllData();
  }, [willRefresh, currentUser]);

  useEffect(() => {
    const supabase = createClient();
    const createChannel = supabase
      .channel("public messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log(payload.new);
          setwillRefresh((num) => num + 1);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(createChannel);
    };
  }, []);

  return (
    <main className="bg-[#246BFD] flex">
      <div className="my-[30px] w-fit">
        <Navbar />
      </div>
      <div className="w-full h-[100vh]">
        <MessagesMain messages={messages} />
      </div>
    </main>
  );
}
