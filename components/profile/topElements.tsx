import Image from "next/image"
export default function TopBar({firstName, image}:{firstName:string, image:string}){
    return (
        <section className=" ">
    
        <section className="flex justify-end mt-[-10px]">
                <div className="flex  gap-[40px] pl-[40px] items-center mr-[50px]">
                    <div className="w-[30px]">
                        <Image src={require('../../assets/icons/notification.svg')} alt="messages" />
                    </div>
                    <div className="w-[30px]">
                        <Image src={require('../../assets/icons/notify.svg')} alt="notifications" />
                    </div>
                    <div className="border-[1px] p-2 rounded-xl">
                        <div className="flex gap-[10px]">
                            <div className="w-[20px]">
                                <Image src={image}
                                    alt='doctor'
                                    width={30}
                                    height={30}
                                    className="border-[1px] rounded-full"
                                />
                            </div>
                            <div>
                                <span>Dr.{firstName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </section>
    )     
}