"use client";
import Navbar from "@/components/navbar";
import ProfileSection from "@/components/profileSettings";

export default function Profile() {
  return (
    <main className="bg-[#246BFD] flex ">
      <div className="mt-[30px]">
        <Navbar />
      </div>
      <div className="w-full bg-white rounded-l-[50px] ps-[30px] pt-[30px] overflow-x-hidden">
        <ProfileSection />
      </div>
    </main>
  );
}
