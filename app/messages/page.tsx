'use client'
import MainSection from "@/components/MainSection";
import MessagesMain from "@/components/messagesSection";
import Navbar from "@/components/navbar";
import TopBar from "@/components/topbar";

export default function Messages() {
    return (
        <main className="bg-[#246BFD] flex">
            <div className="my-[30px] w-fit">
                <Navbar />
            </div>
            <div className="w-full">
              <MessagesMain/>
            </div>
        </main>
    )
}