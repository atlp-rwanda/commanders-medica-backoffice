"use client";
import { AuthContext } from "@/app/dashboard/layout";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import InputFields from "./profile/inputFields";
import Reviews from "./profile/reviews";
import TopBar from "./profile/topElements";

export default function ProfileSection() {
  const [position, setPosition] = useState("");
  const [currentTab, setCurrentTab] = useState("profile");
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctorInformation = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("doctor")
        .select("*")
        .eq("id", currentUser?.id)
        .single();
      if (data) {
        setPosition(data.role);
      }
    };
    fetchDoctorInformation();
  }, [currentUser]);

  const renderContent = () => {
    switch (currentTab) {
      case "profile":
        return <InputFields />;
      case "reviews":
        return <Reviews />;
      default:
        return <InputFields />;
    }
  };

  return (
    <div>
      <div className="flex justify-between m-8">
        <div className="text-[24px]">My profile</div>
        <div>
          <TopBar
            firstName={currentUser?.firstName ?? ""}
            image={currentUser?.image ?? ""}
          />
        </div>
      </div>
      <div className="flex mt-[-60px]">
        <div className="w-[40%] h-[20%] p-[6%] bg-white rounded-xl shadow-md m-[5%]  flex flex-col items-center ">
          <Image
            src={currentUser?.image || require("../assets/images/profil.png")}
            alt="doctor"
            width={240}
            height={240}
            className="border-[1px] rounded-full"
          />
          <p className="mt-3 text-[20px] font-bold ">
            Dr. {currentUser?.firstName} {currentUser?.lastName}
          </p>
          <p className="text-[#A2A3A4] text-[20px] ">{position}</p>
        </div>
        <div className="m-14">
          <div className="flex">
            <button
              className={`mr-5 ${
                currentTab === "profile" ? "text-[#1A71FF] font-bold" : ""
              }`}
              onClick={() => setCurrentTab("profile")}
            >
              Profile
            </button>
            <Link href="/auth/reset" className="mr-5">
              Change Password
            </Link>
            <button
              className={
                currentTab === "reviews" ? "text-[#1A71FF] font-bold" : ""
              }
              onClick={() => setCurrentTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
