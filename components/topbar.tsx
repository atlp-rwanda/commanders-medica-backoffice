import Image from "next/image";
export default function TopBar({
  firstName,
  image,
}: {
  firstName: string;
  image: string;
}) {
  return (
    <section className="flex justify-between sm:flex-wrap ">
      <div className="relative w-[60%]">
        <div className="absolute w-full">
          <input
            placeholder="Search"
            className="border-[1px] w-[100%] p-2 rounded-xl bg-[#E5E5E5]"
          />
          <div className="relative left-[94%] max-[631px]:left-[80%] bottom-[30px]">
            <Image src={require("../assets/icons/search.svg")} alt="search" />
          </div>
        </div>
      </div>
      <div className="flex gap-[40px] pl-[40px] items-center mr-[50px]">
        <div className="w-[30px]">
          <Image
            src={require("../assets/icons/notification.svg")}
            alt="messages"
          />
        </div>
        <div className="w-[30px]">
          <Image
            src={require("../assets/icons/notify.svg")}
            alt="notifications"
          />
        </div>
        <div className="border-[1px] p-2 rounded-xl">
          <div className="flex gap-[10px]">
            <div className="w-[20px]">
              <Image
                src={
                  image == "" ? require("../assets/images/doctor.png") : image
                }
                alt="doctor"
                width={20}
                height={20}
                className="border-[1px] rounded-full"
              />
            </div>
            <div>
              <span>Dr. {firstName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
