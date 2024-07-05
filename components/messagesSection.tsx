import MessageList from "./listMessages";
import TopBar from "./topbar";
import Image from "next/image";
import { userMessages } from "./userMessages";
export default function MessagesMain() {
    return (

        <div className="bg-[#F8F8F8] rounded-l-[50px] ps-[30px] pt-[30px] overflow-x-hidden w-full flex">
            <section className="border-r-2 pr-2 border-gray-300 w-[40%]">
                <div className="flex flex-col">
                    <div className="relative">
                        <div className="absolute w-full">
                            <input placeholder="Search" className="border-[1px] w-[100%] p-2 rounded-xl bg-[#E5E5E5]" />
                            <div className="relative left-[94%] max-[631px]:left-[80%] bottom-[30px]">
                                <Image src={require('../assets/icons/search.svg')} alt="search" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-[50px] py-[20px]">
                        <div>
                            <p className="text-[20px] font-semibold">Recents Messages</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        {
                            userMessages.map((message) => {
                                return <MessageList key={message.name} name={message.name} message={message.message} time={message.time} date={message.date} />
                            })
                        }
                    </div>
                </div>
            </section>
            <section className="w-[60%]">
                <div className="flex justify-between mx-[30px] items-center">
                    <div className="flex gap-[30px] items-center">
                        <div className="w-[50px]">
                            <div className={`border-[1px] border-[#F62088] p-1 rounded-full flex justify-center items-center`}>
                                <span className={`bg-[#F6208815] p-2 w-[45px] flex justify-center rounded-full`}>SM</span></div>
                        </div>
                        <div>
                            <p className="font-semibold">Samuel Mugisha</p>
                        </div>
                    </div>
                    <div>
                        <div className={` w-[100%]  p-1 mr-[10px] flex items-center  gap-[30px]`}>

                            {
                                ["phone", "camera", "menublue"].map((item) => {
                                    return (
                                        <div className="w-[30px]">
                                            <Image src={require(`../assets/icons/${item}.svg`)} alt={item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="mx-[30px] pt-[30px] flex flex-col gap-[30px]">
                    <div>
                        <div className="w-[40%] bg-gray-200 rounded-xl p-2 flex items-end">
                            <p>Hello, good afternoon too Andrew 😁</p>
                            <p>16:00</p>
                        </div>
                    </div>
                    <div>
                        <div className="w-[40%] bg-gray-200 rounded-xl p-2 flex items-end">
                            <p>Can you tell me the problem you are having? So that I can identify it.</p>
                            <p className="pl-1">16:01</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-[40%] bg-[#246BFD] text-white rounded-xl p-2 flex items-end">
                            <p>Can you tell me the problem you are having? So that I can identify it.</p>
                            <p className="pl-1 flex gap-[5px] items-center">16:01 <span className="w-[20px]">
                                <Image src={require("../assets/icons/tick.svg")} alt="tick" />
                            </span></p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-[40%] text-white rounded-xl p-2 flex gap-2">
                            <div>
                                <Image src={require("../assets/images/legs.png")} alt="leg1" />
                            </div>
                            <div>
                                <Image src={require("../assets/images/leg1.png")} alt="leg1" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-[40%] bg-[#246BFD20] text-white rounded-full p-4 flex  items-center gap-[5px]">
                            <div className="flex items-center gap-[5px]">
                                <div className="w-[20px]">
                                    <Image src={require("../assets/icons/play.svg")} alt="play" width={20}  />
                                </div>
                                <div className="flex items-center">
                                    <div id="circle" className="bg-[#246BFD] z-[1] h-[0.7rem] w-[0.7rem] rounded-full mr-[-8px]">

                                    </div>
                                    <div id="progress" className="bg-[#5089FF50] h-[0.4rem]  w-[10rem] rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-[#246BFD]">
                                <p className="pl-1 flex gap-[5px] items-center">16:01 <span className="w-[20px]">
                                    <Image src={require("../assets/icons/bluetick.svg")} alt="tick" />
                                </span></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative top-[20px] bottom-0 w-[100%] pb-[45px]">
                        <div className="w-[100%] bg-gray-200 rounded-xl p-2 flex gap-[20px] items-center">
                            <div className="relative w-[90%]">
                                <div>
                                    <input type="text" id="search" name="search" placeholder="Type here" className="rounded-xl pl-[50px] p-4 w-full" />
                                </div>
                                <div className="absolute left-[20px] bottom-[35%]">
                                    <Image src={require("../assets/icons/emoji.svg")} alt="emoji" />
                                </div>
                                <div className="flex gap-[10px] absolute bottom-[35%] right-[20px]">
                                    <div>
                                        <Image src={require("../assets/icons/link.svg")} alt="link" />
                                    </div>
                                    <div>
                                        <Image src={require("../assets/icons/appareil.svg")} alt="link" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#246BFD] flex justify-center items-center rounded-full w-[50px] h-[50px] p-2">
                                <Image src={require("../assets/icons/record.svg")} alt="record" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}