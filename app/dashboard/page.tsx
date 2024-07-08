"use client";
import MainSection from "../../components/MainSection";
import Navbar from "../../components/navbar";

export interface DoctorType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

export default function Dashboard() {
  return (
    <main className="bg-[#246BFD] flex">
      <div className="my-[30px] w-fit">
        <Navbar />
      </div>
      <div className="w-80%">
        <MainSection />
      </div>
    </main>
  );
}
