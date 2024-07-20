'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
export default function Reviews() {
    const [reviews, setReviews] = useState<any>([])
    const [loading, setLoading]=useState(true);
    useEffect(() => {
        const fetchReviews = async () => {
            const {data:User, error:Error}=await supabase.auth.getUser();
            const userId=User?.user?.id;
            const { data, error } = await supabase.from("reviews").select("*").eq("doctorId",userId)
            if (data) {
                console.log(data)
                setReviews(data);
            }
        if(error) throw error
        setLoading(false)
        }
        fetchReviews();
    }, [])

    if (loading) {
        return (
            <div className="w-[100%] p-[3%] bg-white rounded-xl shadow-md mt-6 flex flex-col items-center">
                <p className="text-[20px]">Loading...</p>
            </div>
        );
    }

    return (
        <div>
             {reviews.length === 0 ? (
        <div className="w-[100%] p-[3%] bg-white rounded-xl shadow-md mt-6 flex flex-col items-center">
          <p className="text-[20px]">You do not have any reviews yet.</p>
        </div>
      ) : (
            reviews.map((review: any, index: any) =>
                <div key={index} className="w-[100%] p-[3%] bg-white rounded-xl shadow-md mt-6  flex flex-col items-center ">
                    <div className="flex">
                        <div className="p-5 bg-[#F62088] w-[25px] h-[25px] rounded-full "><p className="mt-[-10px] ml-[-4px]">{review.name.slice(0, 1)}</p></div>
                        <div className="ml-5">
                            <p className="text-[20px] mb-1">{review.name}</p>
                            <p className="text-[#A2A3A4] text-[17px] mb-1">Patient</p>
                            <p className="text-[16px] font-regular">{review.content}</p>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
    
    )
}