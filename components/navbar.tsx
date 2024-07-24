"use client";
import { logout } from "@/app/auth/actions";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const handleHide = () => {
    const desc = document.querySelectorAll(".desc");
    desc.forEach((item) => {
      item.classList.toggle("hide");
    });
    const container = document.querySelector("#container") as HTMLDivElement;
    container.classList.toggle("width");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="px-[30px] py-[30px] w-[200px] flex justify-center transition-all"
      id="container"
    >
      <div className="text-white flex flex-col gap-[20px] cursor-pointer">
        <div className="mb-[50px] p-2" id="menu" onClick={handleHide}>
          <Image
            src={require("../assets/icons/menu.svg")}
            alt="menu"
            width={30}
            height={30}
          />
        </div>
        <Link
          href="/dashboard"
          className="flex gap-[20px]  items-center hover:bg-[#FFFFFF40] rounded-xl py-2 px-4"
        >
          <div className="w-[30px]">
            <span>
              <Image src={require("../assets/icons/home.svg")} alt="home" />{" "}
            </span>
          </div>
          <span className="desc font-semibold">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/appointments"
          className="flex gap-[20px] items-center hover:bg-[#FFFFFF40] rounded-xl py-2 px-4"
        >
          <div className="w-[30px]">
            <span>
              <Image src={require("../assets/icons/calendar.svg")} alt="home" />{" "}
            </span>
          </div>
          <span className="desc font-semibold">Appointments</span>
        </Link>
        <Link
          href="/dashboard/messages"
          className="flex gap-[20px] items-center hover:bg-[#FFFFFF40] rounded-xl py-2 px-4"
        >
          <div className="w-[30px]">
            <span>
              <Image src={require("../assets/icons/messages.svg")} alt="home" />{" "}
            </span>
          </div>
          <span className="desc font-semibold">Messages</span>
        </Link>
        <Link href="/dashboard/profile" className="flex gap-[20px] items-center hover:bg-[#FFFFFF40] rounded-xl py-2 px-4">
          <div className="w-[30px]">
            <span>
              <Image src={require("../assets/icons/settings.svg")} alt="home" />{" "}
            </span>
          </div>
          <span className="desc font-semibold">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex gap-[20px] items-center hover:bg-[#FFFFFF40] rounded-xl py-2 px-4"
        >
          <div className="w-[30px]">
            <span>
              <Image src={require("../assets/icons/logout.svg")} alt="home" />{" "}
            </span>
          </div>
          <span className="desc font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}
