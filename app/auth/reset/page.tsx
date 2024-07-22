"use client";
import Link from "next/link";
import { useState } from "react";
import { login } from "../actions";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export default function Reset() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [email, setEmail]=useState("");
  const router= useRouter();

const handelReset=async()=>{
  setPending(true);
  const {data, error}= await supabase.auth.resetPasswordForEmail(email)
if(error){
  setError("you did not enter an email");
  setPending(false);
}
else{
  alert("a reset otp was sent to your email");
  router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
}
setPending(false)
}

  return (
    <div className="flex flex-row border border-primary-500 bg-primary-200 rounded-2xl max-w-[650px] mx-auto">
      <form
        className="flex flex-col flex-1 border-r border-primary-500 rounded-2xl bg-white p-6"
      >
        <p className="text-primary-400 text-lg font-bold mb-3">Forgot Password?</p>
        <p className="mb-3">Enter your email and we’ll send you instructions</p>


        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-1">
            User Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="bg-primary-700 text-white px-5 py-2 rounded-lg mt-5 disabled:bg-primary-400 disabled:cursor-not-allowed"
        onClick={handelReset}
        disabled={pending}>
          {pending?"Loading":"Send Reset OTP"}
        </button>
        <p aria-live="polite" className="mb-3 text-red-600  text-center font-semibold">
          {error}
        </p>
        <div className="text-center mt-4">
        <Link
          href="/auth/login"
          className="px-4 py-1.5 rounded-lg"
        >
       Back to login
        </Link>
        </div>
      </form>
    </div>
    
  );
}
