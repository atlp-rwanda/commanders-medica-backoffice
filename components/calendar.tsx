'use client'
import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function CalendarHolder(){
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece]
    const [dateValue, setDateValue] = useState<Value>(new Date());
    return(
        <div className="bg-white rounded-xl shadow-md p-5">
                        <div>
                            <Calendar
                                className={"rounded-xl border-none font-mono calendar"}
                                onChange={setDateValue}
                            />
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <p className="font-bold">Upcoming</p>
                            <Link href={""} className="text-[12px] text-[#1A71FF] mr-[10px]">View all</Link>
                        </div>
                        <div className="flex gap-[30px] items-center mt-[20px] p-1 bg-[#F0F9FD] rounded-xl">
                            <div className="ml-1 p-2 bg-gradient-to-tr from-[#1A71FF45] to-[#1A71FF] rounded-full h-[40px] w-[40px] flex items-center justify-center">
                                <p className="font-bold text-white">M</p>
                            </div>
                            <div>
                                <p className="text-[14px] font-semibold">Monthly doctor's meet</p>
                                <p className="text-[12px] text-[#0D0D0D60]">8 April, 2021   |   04:00 PM</p>
                            </div>
                        </div>
                    </div>
    )
}