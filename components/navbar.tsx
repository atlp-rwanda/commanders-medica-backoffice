'use client'
import { combineChunks } from "@supabase/ssr";
import Image from "next/image"
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {useRouter} from "next/navigation"
const supabase = createClient();
export default function Navbar() {
    const router=useRouter();
    const handleHide = () => {
        // const hamburger= document.querySelector('#menu')
        const desc = document.querySelectorAll('.desc');
        desc.forEach((item) => {
            item.classList.toggle('hide');
        });
        const container = document.querySelector('#container') as HTMLDivElement;
        container.classList.toggle('width');

    }
    const signOut=async ()=>{
        const {error}=await supabase.auth.signOut();
        setTimeout(()=>{

            router.push("/auth/login")
        },80)
        
    }
    return (
        <div className="px-[30px] py-[30px] w-[200px] flex justify-center transition-all" id="container">
            <div className="text-white flex flex-col gap-[30px] cursor-pointer">
                <div className="mb-[50px] p-2" id='menu' onClick={handleHide}>
                    <Image src={require("../assets/icons/menu.svg")} alt="menu" width={30} height={30} />
                </div>
                <Link href={'/dashboard'} className="flex gap-[30px]  items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/home.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Dashboard</span>
                </Link>
                <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/calendar.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Calendar</span>
                </div>
                <Link href={'/messages'} className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/messages.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Messages</span>
                </Link>
                <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/reports.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Reports</span>
                </div>
                <Link href="/profile"> <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/settings.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Settings</span>
                </div>
                </Link>
                <button onClick={signOut}>
                <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/logout.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Logout</span>
                </div>
                </button>
            </div>
        </div>
    )
}