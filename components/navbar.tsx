'use client'
import { combineChunks } from "@supabase/ssr";
import Image from "next/image"
import Link from "next/link";
export default function Navbar() {
    const handleHide = () => {
        // const hamburger= document.querySelector('#menu')
        const desc = document.querySelectorAll('.desc');
        desc.forEach((item) => {
            item.classList.toggle('hide');
        });
        const container = document.querySelector('#container') as HTMLDivElement;
        container.classList.toggle('width');

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
                <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/settings.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Settings</span>
                </div>
                <div className="flex gap-[30px] items-center hover:bg-[#FFFFFF40] rounded-xl p-2">
                    <div className="w-[30px]">
                        <span><Image src={require("../assets/icons/logout.svg")} alt="home" /> </span>
                    </div>
                    <span className="desc">Logout</span>
                </div>
            </div>
        </div>
    )
}