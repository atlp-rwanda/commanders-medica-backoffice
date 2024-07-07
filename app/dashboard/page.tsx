"use client";
import { createClient } from "@/utils/supabase/client";
import { getCurrentUser } from "@/utils/supabase/getUser";
import { useEffect, useState } from "react";
import MainSection from "../../components/MainSection";
import Navbar from "../../components/navbar";
export interface DoctorType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}
export default function Dashboard() {
  const [doctorData, setdoctorData] = useState<DoctorType | undefined>(
    undefined
  );
  const [userId, setUserId] = useState<String>();
  const [image, setImage] = useState<String>();

  const fetchDoctorData = async (userId: string) => {
    try {
      if (userId) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("doctor")
          .select("image")
          .eq("id", userId)
          .single();

        if (error) {
          console.log(error);
        }

        return data;
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      throw error; // or handle it as per your error handling strategy
    }
  };

  useEffect(() => {
    const data = getCurrentUser();
    data
      .then((user) => {
        console.log(user);
        if (user) {
          setdoctorData({
            id: user.user.id,
            firstName: user.user.user_metadata.first_name,
            lastName: user.user.user_metadata.last_name,
            email: user.user.user_metadata.email,
          });
          setUserId(user.user.id);
          console.log("doctorData", doctorData);
          console.log("userId", user.user.id);
          if (user.user.id) {
            fetchDoctorData(user.user.id)
              .then((data) => {
                setImage(data.image);
                console.log("image", image);
              })
              .catch((err) => {
                console.log("error", err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, doctorData, image]);

  return (
    <main className="bg-[#246BFD] flex">
      <div className="my-[30px] w-fit">
        <Navbar />
      </div>
      <div className="w-80%">
        <MainSection
          firstName={doctorData?.firstName!}
          lastName={doctorData?.lastName!}
          email={doctorData?.email!}
          image={image as any}
        />
      </div>
    </main>
  );
}
