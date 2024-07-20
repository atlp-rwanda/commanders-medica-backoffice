'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import TopBar from "./profile/topElements";
import { DoctorType } from "@/app/dashboard/page"
import InputFields from "./profile/inputFields";
import { createClient } from "@/utils/supabase/client";
import Reviews from "./profile/reviews";
const supabase = createClient();
export default function ProfileSection({ firstName, lastName, email, image }: DoctorType) {
    const [position, setPosition] = useState("");
    const [name, setName] = useState("");
    const [currentTab, setCurrentTab]=useState("profile");
    useEffect(() => {
        const fetchDoctorInformation = async () => {
            const { data: userData, error: Error } = await supabase.auth.getUser();
            const userId = userData?.user?.id;
            const { data, error } = await supabase.from('doctor').select("*").eq("id", userId).single();
            if (data) {
                setPosition(data.role);
                setName(data.name);
            }
        }
        fetchDoctorInformation();
    })
 const renderContent=()=>{
    switch(currentTab){
        case "profile":
            return<InputFields/>;
        case "reviews":
            return <Reviews/>;
            default:
                return <InputFields/>
    }
 }
    return (
        <div>
            <div className="flex justify-between m-8">
                <div className="text-[24px]">My profile</div>
                <div><TopBar firstName={firstName} image={image!} /></div>
            </div>
            <div className="flex mt-[-60px]">
                <div className="w-[40%] h-[20%] p-[6%] bg-white rounded-xl shadow-md m-[5%]  flex flex-col items-center ">
                    <Image src={image|| require("../assets/images/profil.png")}
                        alt='doctor'
                        width={240}
                        height={240}
                        className="border-[1px] rounded-full" />
                    <p className="mt-3 text-[20px] font-bold ">Dr.{name}</p>
                    <p className="text-[#A2A3A4] text-[20px] ">{position}</p>
                </div>
                <div className="m-14">
                    <div className="flex">
                        <button  className={`mr-5 ${currentTab === "profile" ? "text-[#1A71FF] font-bold" : ""}`} onClick={()=>setCurrentTab("profile")}>Profile</button>
                        <Link  href="/auth/reset" className="mr-5">Change Password</Link>
                        <button className= {currentTab === "reviews" ? "text-[#1A71FF] font-bold" : ""} onClick={()=>setCurrentTab("reviews")}>Reviews</button>
                    </div>
                 
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}