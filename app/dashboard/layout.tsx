"use client";
import { createClient } from "@/utils/supabase/client";
import { getCurrentUser } from "@/utils/supabase/getUser";
import { createContext, useEffect, useState } from "react";
import { DoctorType } from "./page";

export const AuthContext = createContext<DoctorType | null>(null);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [doctor, setDoctor] = useState<DoctorType | null>(null);

  useEffect(() => {
    const data = getCurrentUser();
    data
      .then((user) => {
        if (user) {
          fetchDoctorData(user.user.id)
            .then((data) => {
              if (data) {
                setDoctor({
                  id: user.user.id,
                  firstName: user.user.user_metadata.first_name,
                  lastName: user.user.user_metadata.last_name,
                  email: user.user.user_metadata.email,
                  image: data.image,
                });
              }
            })
            .catch((error) => {
              setDoctor({
                id: user.user.id,
                firstName: user.user.user_metadata.first_name,
                lastName: user.user.user_metadata.last_name,
                email: user.user.user_metadata.email,
                image: "",
              });
              console.error("Error fetching doctor data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, []);

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
          return null;
        }
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      throw error; // or handle it as per your error handling strategy
    }
  };

  return <AuthContext.Provider value={doctor}>{children}</AuthContext.Provider>;
}
