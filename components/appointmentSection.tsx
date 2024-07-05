'use client'
import TopBar from "./topbar";
import Image from "next/image";
import { appointmentList } from "./userMessages";
import ListItem from "./listItem";
import CalendarHolder from "./calendar";
export default function AppointmentsMain() {
    return (

        <div className="bg-[#F8F8F8] rounded-l-[50px] ps-[30px] pt-[30px] overflow-x-hidden w-full flex">
            <section className="border-r-2 pr-2 border-gray-300 w-[100%]">
                <div>
                    <TopBar />
                </div>
                <section className="flex justify-between mr-4 my-4 ">
                    <div className="w-[60%]">
                        <section className="mt-6">
                            <div>
                                <span><h1 className="text-[20px]">Good morning &nbsp; <span className="text-[#246BFD] font-semibold text-[24px]">Dr.Kim</span></h1></span>
                            </div>
                            <div className="w-[100%] bg-white shadow-md  rounded-xl p-4 my-4">
                                <div>
                                    <div className="flex justify-between items-center pb-2 mr-4">
                                        <p className="font-medium text-[18px] my-2">Upcoming appointments</p>
                                        <div className="flex gap-2 items-center">
                                            <p className="text-gray-400">Today</p>
                                            <Image src={require("../assets/icons/accordion.svg")} alt="accordion" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[20px]">
                                        {
                                            appointmentList.map(item => {
                                                return (
                                                    <div className="flex justify-between items-center">
                                                        <div className="w-[45%]">
                                                            <ListItem name={item.name} visitType={item.visitType} time={item.time} color={item.color} />
                                                        </div>
                                                        <div className="w-[50%] flex justify-around">
                                                            <div>
                                                                <button className="rounded-full border-2 text-[#246BFD] border-[#246BFD] py-2 px-4">Cancel</button>
                                                            </div>
                                                            <div>
                                                                <button className="rounded-full text-[white] bg-[#246BFD] py-2 px-4">Reschedule</button>
                                                            </div>
                                                            <div>
                                                                <button className="rounded-full text-[white] bg-[#246BFD] py-2 px-4">Join</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div >
                        </section >
                    </div >
                    <section>
                        <CalendarHolder />
                    </section>
                </section>
                <section className="flex justify-between">
                    <div className="w-[55%] bg-white shadow-md  rounded-xl p-4 my-4">
                        <div>
                            <div className="flex justify-between items-center pb-2 mr-4">
                                <p className="font-medium text-[18px] my-2">Appointment requests</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-gray-400 mr-4">Today</p>
                                    <Image src={require("../assets/icons/accordion.svg")} alt="accordion" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            {
                                appointmentList.map(item => {
                                    return (
                                        <div className="flex justify-between items-center">
                                            <div className="w-[45%]">
                                                <ListItem name={item.name} visitType={item.visitType} time={item.time} color={item.color} />
                                            </div>
                                            <div className="w-[50%] flex justify-between">
                                                <div className="w-[45%]">
                                                    <button className="rounded-full border-2 text-[#246BFD] w-full border-[#246BFD] py-2 px-4">Cancel</button>
                                                </div>
                                                <div className="w-[45%]">
                                                    <button className="rounded-full text-[white] w-full bg-[#246BFD] py-2 px-4">Reschedule</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>

                    <div className="w-[40%] bg-white shadow-md  rounded-xl p-4 my-4">
                        <div>
                            <div className="flex justify-between items-center pb-2 mr-4">
                                <p className="font-medium text-[18px] my-2">Appointment requests</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-gray-400 mr-4">Today</p>
                                    <Image src={require("../assets/icons/accordion.svg")} alt="accordion" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            {
                                appointmentList.map(item => {
                                    return (
                                        <div className="flex justify-between items center">
                                            <div className="w-[70%]">
                                                <ListItem name={item.name} visitType={item.visitType} time={item.time} color={item.color} />
                                            </div>
                                            <div className="w-[30%] flex justify-center items-center">
                                                <div>
                                                    <button className="rounded-full text-[white] w-full bg-[#246BFD] py-2 px-4">Reschedule</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </section>

            </section >
        </div >
    )
}