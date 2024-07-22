
'use client'
import {useState, useEffect} from "react";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topbar";
import { DoctorType } from "@/app/dashboard/page"
import ProfileSection from "../../components/profileSettings";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
export default function Profile(){
    const [doctorData, setdoctorData] = useState<DoctorType | undefined>(undefined);
    const [userId, setUserId] = useState<String>();
    const [image, setImage]= useState("");
    const [name, setName]=useState("");
    useEffect(()=>{
    const fetchDoctorInformation=async()=>{
        const{data:userData, error:Error}=await supabase.auth.getUser();
        const userId=userData?.user?.id;
        const {data,error}=await supabase.from('doctor').select("*").eq("id", userId).single();
        if(data){
            setImage(data.image)
            setName(data.name);
        }
    }
    fetchDoctorInformation();
})
    return(
        <main className="bg-[#246BFD] flex ">
            <div className="mt-[30px]">
                <Navbar />
                </div>
                <div className="w-full bg-white rounded-l-[50px] ps-[30px] pt-[30px] overflow-x-hidden" >
                <ProfileSection firstName={name} lastName={doctorData?.lastName!} email={doctorData?.email!} image={image} />
            </div>
        </main>
    )
}