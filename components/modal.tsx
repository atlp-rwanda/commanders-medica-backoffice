'use client'
import Image from "next/image"
export default function Modal() {
    const handleHide=()=>{
        const modal=document.querySelector('.modal') as HTMLDivElement;
        modal.classList.toggle('hide');
        console.log("modal clicked");
    }
    return (
        <div className="modal">
            <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
                
                <div className="w-[400px] bg-white rounded-xl shadow-md p-4">
                {/* <div className="w-[20px] relative top-[-10px] z-[1000] left-[100%]">
                    <Image src={require("../assets/icons/close.svg")} alt="close"/>
                </div> */}
                    <div className="flex justify-center cursor-pointer" onClick={handleHide}>
                        <div className="w-[40%]">
                            <Image src={require("../assets/images/modal.png")} className="w-100%" alt={"modal"} />
                        </div>
                    </div>
                    <h1 className="text-center text-[20px] font-medium text-[#246BFD] py-4">Do you want to cancel the appointments</h1>
                    <p>Once you cancel this appointment you’ll have a week to be able to reschedule it!</p>
                    <div className="flex justify-end gap-[10px] mt-10">
                        <button className="rounded-full text-[white] w-full bg-[#246BFD] py-2 px-4" onClick={handleHide}>Yes, cancel</button>
                        <button className="rounded-full text-[#246BFD] w-full bg-[#F9F9F9] py-2 px-4">No, Reschedule</button>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full blur-md  bg-black opacity-50">

            </div>
        </div>
    )
}