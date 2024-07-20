type MessageType={
    name: string;
    message: string;
    type: string;
    time?: string;
    date?: string;
}
export default function MessageList({name, message, type, time, date}:MessageType){
    const handleAbbr = (str: string) => {
        if(str){
        const arr = str.split(" ").map((word) => word[0]).join('');
        return arr.toUpperCase();
        }
    }
    const handleMessage= (str: string) => {
        if(str?.length > 40) return `${str.slice(0,40)}...`;
        return str;
    }
    return (

        <div className="flex justify-between items-center w-[100%]">
            <div className="flex gap-[30px]">
                <div className="w-[50px]">
                    <div className={`border-[1px] border-[#F62088] p-1 rounded-full flex justify-center items-center`}>
                        <span className={`bg-[#F628815] p-2 w-[45px] flex justify-center rounded-full`}>{handleAbbr(name)}</span></div>
                </div>
                <div>
                    <p className="font-semibold">{name}</p>
                   { type==='message'?(
                    <p className="max-w-[80%] truncate">{handleMessage(message)}</p>)
                    : type==='audio'?(
                        <p className={``}><b>Audio file</b></p>)
                    :(
                        <p className={``}><b>Image file</b></p>)
                    
                   } 
                </div>
            </div>
            <div>
                <div className={` w-[100%]  p-1 mr-[10px] flex flex-col items-center justify-center font-semibold text-[14px]`}>
                    <p>{time}</p>
                    <p>{date}</p>
                    </div>
            </div>
        </div>

    )
}