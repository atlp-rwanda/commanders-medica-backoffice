import { MessageType } from "@/app/dashboard/messages/page";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import MessageList from "./listMessages";
import MessageSender from "./sendMessage";
export type MessageProps = {
  messages: MessageType[];
};
export default function MessagesMain({ messages }: MessageProps) {
  // console.log('messages', messages);
  const [username, setUsername] = useState<string>();
  const [appointmentId, setAppointmentId] = useState<string>();
  const [duration, setDuration] = useState<string>("");
  const [appDate, setAppDate] = useState<string>("");
  const [appTime, setAppTime] = useState<string>("");
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const handleChanges = (
    str: string,
    appId: string,
    appdate: string,
    apptime: string,
    duration: string
  ) => {
    setUsername(str);
    setAppointmentId(appId);
    setAppDate(appdate);
    setAppTime(apptime);
    setDuration(duration);
  };
  const checkSession = (duration: string, appDate: string, appTime: string) => {
    const currentDate: Date = new Date();
    const appointmentDate: Date = new Date(appDate);
    const setTime = new Date(
      appointmentDate.setHours(
        parseInt(appTime.split(":")[0]),
        parseInt(appTime.split(":")[1])
      )
    );
    appointmentDate.setHours(
      parseInt(appTime.split(":")[0]) + parseInt(duration.split(" ")[0]),
      parseInt(appTime.split(":")[1])
    );
    if (currentDate > appointmentDate || currentDate < setTime) {
      return true;
    } else {
      return false;
    }
  };
  const handleAbbr = (str: string) => {
    if (str) {
      const arr = str
        .split(" ")
        .map((word) => word[0])
        .join("");
      return arr.toUpperCase();
    }
  };
  const groupedMessages = useMemo(() => {
    const grouped = messages.reduce((acc, message) => {
      const patientId = message.appointment?.patient_id;
      if (!patientId) return acc;

      if (
        !acc[patientId] ||
        new Date(message.created_at) > new Date(acc[patientId].created_at)
      ) {
        acc[patientId] = message;
      }
      return acc;
    }, {} as Record<string, MessageType>);

    return Object.values(grouped);
  }, [messages]);
  useEffect(() => {
    setIsEnded(checkSession(duration, appDate, appTime));
  }, [duration, appDate, appTime]);

  return (
    <div className="h-screen bg-[#F8F8F8] rounded-l-[50px] overflow-hidden flex">
      <section className="border-r-2 border-gray-300 w-[40%] flex flex-col">
        <div className="p-[30px] pb-0">
          <div className="relative">
            <input
              placeholder="Search"
              className="border-[1px] w-full p-2 rounded-xl bg-[#E5E5E5]"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Image
                src={require("../../assets/icons/search.svg")}
                alt="search"
              />
            </div>
          </div>
          <div className="mt-[20px]">
            <p className="text-[20px] font-semibold">Recent Messages</p>
          </div>
        </div>
        <div className="flex-1 justify-between overflow-y-auto px-[30px] py-[20px]">
          {groupedMessages.map((message) => (
            <button
              key={message.id}
              className="w-full"
              onClick={() =>
                handleChanges(
                  message.appointment?.patient?.full_name,
                  message.appointment_id,
                  message.appointment.appointment_date,
                  message.appointment.appointment_time,
                  message.appointment.duration
                )
              }
            >
              <MessageList
                name={message.appointment?.patient?.full_name!}
                message={message.message!}
                time={message.created_at?.substring(11, 16)}
                date={message.created_at?.substring(0, 10)}
                type={message.type}
              />
            </button>
          ))}
        </div>
      </section>

      {username && (
        <section className="w-[60%] flex flex-col">
          <div className="flex justify-between items-center p-[30px]">
            <div className="flex gap-[30px] items-center">
              <div className="w-[50px]">
                <div className="border-[1px] border-[#F62088] p-1 rounded-full flex justify-center items-center">
                  <span className="bg-[#F6208815] p-2 w-[45px] flex justify-center rounded-full">
                    {handleAbbr(username!)}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold">{username}</p>
              </div>
            </div>
            <div className="flex items-center gap-[30px]">
              {["phone", "camera", "menublue"].map((item) => (
                <div key={item} className="w-[30px]">
                  <Image
                    src={require(`../../assets/icons/${item}.svg`)}
                    alt={item}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-[30px] pb-[30px]">
            {messages ? (
              messages.length > 0 ? (
                messages
                  .filter((message) => message.appointment_id == appointmentId)
                  .map((message) => {
                    const isDoctor =
                      message.sender_id === message.appointment?.doctor_id;
                    return (
                      <div
                        className={`flex ${
                          isDoctor ? "justify-end" : "justify-start"
                        } mb-[20px] max-w-full`}
                        key={message.id}
                      >
                        {message.type === "message" ? (
                          <div
                            className={`min-w-52 max-w-[55%] ${
                              isDoctor
                                ? "bg-[#246BFD] text-white"
                                : "bg-gray-200"
                            } rounded-2xl px-4 py-3 flex flex-col`}
                          >
                            <p style={{ overflowWrap: "break-word" }}>
                              {message.message}
                            </p>
                            <div className="flex justify-end items-center gap-1">
                              <p className="text-xs">
                                {message.created_at?.substring(11, 16)}
                              </p>
                              {isDoctor && (
                                <span className="w-[15px]">
                                  <Image
                                    src={require("../../assets/icons/tick.svg")}
                                    alt="tick"
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                        ) : message.type === "image" ? (
                          <div className="min-w-[40%] max-w-[55%] p-2 flex flex-col">
                            <Image
                              src={message.message}
                              alt={message.message}
                              width={100}
                              height={100}
                            />
                          </div>
                        ) : (
                          <div className="min-w-[50%] max-w-[60%] p-2 flex flex-col">
                            <audio
                              controls
                              className="w-full"
                              src={message.audio_url || message.message}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
              ) : (
                <div>
                  <p>You have no messages</p>
                </div>
              )
            ) : (
              <div>
                <p>Loading messages...</p>
              </div>
            )}
          </div>
          {isEnded ? (
            <div className="flex justify-center p-[30px]">
              <div className="p-2 bg-gray-300 rounded-md w-fit">
                <p>Session ended</p>
              </div>
            </div>
          ) : (
            <div className="p-[30px]">
              <MessageSender
                sender_id={messages[0]?.sender_id}
                doctor_id={messages[0]?.appointment.doctor_id}
                appointment_id={appointmentId as string}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
