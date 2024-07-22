'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function InputFields() {
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [about, setAbout] = useState("");
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
const   [workhours, setWorkhours]=useState("");
  useEffect(() => {
    const fetchDoctorInformation = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error(userError);
        setIsLoading(false);
        return;
      }

      const userId = userData?.user?.id;
      const userEmail = userData?.user?.email??"";
      setEmail(userEmail);

      const { data, error } = await supabase.from('doctor').select("*").eq("id", userId).single();
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setHospital(data.hospital);
        setPosition(data.role);
        setName(data.name);
        setPhone(data.phone_number);
        setAbout(data.about);
        const workhours = data.time;
        const workhoursParts = workhours.split(", ");
        if (workhoursParts.length === 2) {
          const [daysPart, timesPart] = workhoursParts;
          const days = daysPart.split(" - ");
          const times = timesPart.split(" - ");
          
          if (days.length === 2) {
            setStartDay(days[0]);
            setEndDay(days[1]);
          }
          
          if (times.length === 2) {
            setStartTime(times[0]);
            setEndTime(times[1]);
          }
        }
      }
    }
    fetchDoctorInformation();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error(userError);
    }
    const userId = userData?.user?.id;
   const workhours= `${startDay} - ${endDay}, ${startTime} - ${endTime}`;
    const { data, error } = await supabase.from('doctor').update([{
      role: position,
      name: name,
      email: email,
      hospital: hospital,
      phone_number: phone,
      about: about,
      time: workhours
    }]).eq("id", userId);
    if (error) {
      console.log(error)
    }
    setMessage("Profile information updated succefully");
    setTimeout(()=>{
      setMessage("");
    },2000)
    setIsLoading(false);
  }
  return (
    <form className="mt-9">
       <p aria-live="polite" className="mt-3 text-[#4BB543]  bg-gray p-3 text-center font-semibold">{message}</p>
      <div className="flex">
        <div>
          <div className="flex flex-col mb-5">
            <label htmlFor="fullname" className="mb-1">
              Full Name:
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              autoFocus
              autoComplete="name"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="position" className="mb-1">
              Specialization:
            </label>
            <select
              id="position"
              name="position"
              required
              autoComplete="position"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option disabled value="">Select Specialization</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Immunologist">Immunologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="hospital" className="mb-1">
              Hospital:
            </label>
            <select
              id="hospital"
              name="hospital"
              required
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            >
              <option disabled value="">Select a hospital</option>
              <option value="CHUK<">CHUK</option>
              <option value="CHUB">CHUB</option>
              <option value="MASAKA Hospital">MASAKA Hospital</option>
              <option value="King FaisaL Hospital">King FaisaL Hospital</option>
              <option value="KABGAYI Hospital">KABGAYI Hospital</option>
              <option value="KIBAGABAGA HOSPITAL">KIBAGABAGA HOSPITAL </option>
              <option value="Muhima HOSPITAL ">Muhima HOSPITAL </option>
            </select>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="phone" className="mb-1">
              Phone number:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              autoComplete="phone"
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-3">
          <div className="flex flex-col mb-5">
            <label htmlFor="phone" className="mb-1">
              Bio:
            </label>
            <textarea
              id="about"
              name="about"
              required
              className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="work" className="mb-1">
              Working Hours:
            </label>
            <div className="flex">
              <select
                id="startDay"
                name="startDay"
                required
                className="p-1 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
              >
                <option disabled value="">Start Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday </option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>

              <select
                id="endDay"
                name="endDay"
                required
                className="p-1 mx-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
              >
                <option disabled value="">End Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="flex mt-2"> 
            <select
                id="startTime"
                name="startTime"
                required
                className="p-1  border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option disabled value="">Start Time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="13:00 PM">13:00 PM</option>
                <option value="14:00 PM">14:00 PM</option>
                <option value="15:00 PM">15:00 PM</option>
                <option value="16:00 PM">16:00 PM</option>
                <option value="17:00 PM">17:00  PM</option>
              </select>

              <select
                id="endTime"
                name="endTime"
                required
                className="p-1  ml-4 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option disabled value="">End Time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="13:00 PM">13:00 PM</option>
                <option value="14:00 PM">14:00 PM</option>
                <option value="15:00 PM">15:00 PM</option>
                <option value="16:00 PM">16:00 PM</option>
                <option value="17:00 PM">17:00 PM</option>
              </select>
          </div>
          </div>
        </div>
        </div>
        <button
          className="bg-primary-700 text-white px-9 py-2 rounded-lg mt-2 disabled:bg-primary-400 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Saving..." : "Edit profile"}
        </button>
       
    </form>
  );
}
