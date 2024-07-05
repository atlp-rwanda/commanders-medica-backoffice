import AppointmentsMain from "@/components/appointmentSection";
import Modal from "@/components/modal";
import Navbar from "@/components/navbar";

export default function Appointments(){
    return (
        <main className="bg-[#246BFD]">
            <div>
                <Modal/>
            </div>
            <div className="flex">
            <section className="my-[30px] w-fit">
                <Navbar/>
            </section>
            <section className="w-[100%]">
                <AppointmentsMain/>
            </section>
            </div>
        </main>
    )
}