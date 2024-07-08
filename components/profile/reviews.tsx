"use client";
import { AuthContext } from "@/app/dashboard/layout";
import { createClient } from "@/utils/supabase/client";
import { useContext, useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("doctorId", currentUser?.id);
      if (data) {
        console.log(data);
        setReviews(data);
      }
      if (error) throw error;
      setLoading(false);
    };
    fetchReviews();
  }, [currentUser]);

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
        <div className="w-[100%] p-12 bg-white rounded-xl shadow-md mt-6 flex flex-col items-center">
          <p className="text-[20px]">You do not have any reviews yet.</p>
        </div>
      ) : (
        reviews.map((review: any, index: any) => (
          <div
            key={index}
            className="w-[100%] p-[3%] bg-white rounded-xl shadow-md mt-6  flex flex-col items-center "
          >
            <div className="flex">
              <div className="p-5 bg-[#F62088] w-[25px] h-[25px] rounded-full ">
                <p className="mt-[-10px] ml-[-4px]">
                  {review.name.slice(0, 1)}
                </p>
              </div>
              <div className="ml-5">
                <p className="text-[20px] mb-1">{review.name}</p>
                <p className="text-[#A2A3A4] text-[17px] mb-1">Patient</p>
                <p className="text-[16px] font-regular">{review.content}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
