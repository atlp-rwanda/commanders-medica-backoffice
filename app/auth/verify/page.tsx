"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Reset() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const email = searchParams.get("email");

  const handelReset = async () => {
    setPending(true);
    const supabase = createClient();
    const otpCode = code;
    const { data, error } = await supabase.auth.verifyOtp({
      email: email!,
      token: otpCode,
      type: "email",
    });

    if (error) {
      setMessage({ type: "error", text: "invalid otp" });
    } else {
      setMessage({ type: "sucess", text: "Valid Otp provided" });
      setTimeout(() => {
        router.push("/auth/newpassword");
      }, 1000);
    }
    setPending(false);
  };

  return (
    <div className="flex flex-row border border-primary-500 bg-primary-200 rounded-2xl max-w-[650px] mx-auto">
      <form className="flex flex-col flex-1 border-r border-primary-500 rounded-2xl bg-white p-6">
        <p className="text-primary-400 text-lg font-bold mb-3">Verify OTP</p>
        <p className="mb-3">Enter the otp you received on your email </p>
        {message?.type === "error" && (
          <p
            aria-live="polite"
            className="mb-3 text-red-600  text-center font-semibold"
          >
            {message.text}
          </p>
        )}

        <div className="flex flex-col mb-5">
          <label htmlFor="otp" className="mb-1">
            OTP:
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            required
            autoFocus
            autoComplete="off"
            className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className="bg-primary-700 text-white px-5 py-2 rounded-lg mt-5 disabled:bg-primary-400 disabled:cursor-not-allowed"
          onClick={handelReset}
          disabled={pending}
        >
          {pending ? "Verifying..." : "Verify"}
        </button>
        {message?.type === "success" && (
          <p
            aria-live="polite"
            className="mt-3 text-[#4BB543] text-center font-semibold"
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default function ResetPage() {
  return (
    <Suspense>
      <Reset />
    </Suspense>
  );
}
