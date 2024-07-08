"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  if (user && user.user_metadata.role !== "doctor") {
    supabase.auth.signOut();
    return { error: "You have to be a doctor to access this dashboard." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    gender: formData.get("gender") as string,
    position: formData.get("position") as string,
    hospital: formData.get("hospital") as string,
    password: formData.get("password") as string,
    certificate: formData.get("certificate-file") as File,
    cv: formData.get("cv-file") as File,
    profileImg: formData.get("profile-img-file") as File,
  };

  const {
    error,
    data: { user },
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.fullname.split(" ")[0],
        last_name: data.fullname.trim().split(" ").slice(1).join(" ") || "",
        gender: data.gender,
        role: "doctor",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // upload the certificate file
  const { error: certError, data: certificateData } = await supabase.storage
    .from("files")
    .upload(
      `certificates/${user ? user.id : data.certificate.name}`,
      data.certificate
    );

  if (certError) {
    return { error: certError.message };
  }

  // upload the cv file
  const { error: cvError, data: cvData } = await supabase.storage
    .from("files")
    .upload(`cv/${user ? user.id : data.cv.name}`, data.cv);

  if (cvError) {
    return { error: cvError.message };
  }

  // upload the profile image
  const { error: imgError, data: profileImgData } = await supabase.storage
    .from("files")
    .upload(
      `doctors/${user ? user.id : data.profileImg.name}`,
      data.profileImg
    );

  if (imgError) {
    return { error: imgError.message };
  }

  const { data: certificateURL } = supabase.storage
    .from("files")
    .getPublicUrl(certificateData.path);

  const { data: cvURL } = supabase.storage
    .from("files")
    .getPublicUrl(cvData.path);

  const { data: profileImgURL } = supabase.storage
    .from("files")
    .getPublicUrl(profileImgData.path);

  // create a new user in the database
  const { error: spbsError } = await supabase.from("doctor").insert({
    name: data.fullname,
    role: data.position,
    email: data.email,
    hospital: data.hospital,
    certificate: certificateURL.publicUrl,
    cv: cvURL.publicUrl,
    image: profileImgURL.publicUrl,
  });

  if (spbsError) {
    return { error: spbsError.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
