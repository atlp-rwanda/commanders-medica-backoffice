"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPassword() {
  const [message, setMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handlePasswordReset = async () => {
    setPending(true);
    if (newpassword !== confirmpassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setPending(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newpassword });
    if (error) {
      console.log(error);
      setPending(false);
    } else {
      setMessage({ type: "success", text: "Passwords was reset successfully" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };
  return (
    <div className="flex flex-row border border-primary-500 bg-primary-200 rounded-2xl max-w-[650px] mx-auto">
      <form className="flex flex-col flex-1 border-r border-primary-500 rounded-2xl bg-white p-6">
        <p className="text-primary-400 text-lg font-bold mb-3">
          Create new password!
        </p>
        {message?.type === "error" && (
          <p
            aria-live="polite"
            className="mb-3 text-red-600 text-center font-semibold"
          >
            {message.text}
          </p>
        )}

        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="mb-1">
            New Password:
          </label>
          <input
            id="newpassword"
            name="newpassword"
            type="password"
            required
            autoFocus
            className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none font-serif"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <div className="flex justify-between">
            <label htmlFor="password" className="mb-1">
              Confirm Password:
            </label>
          </div>
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            required
            className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none font-serif"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-primary-700 text-white px-5 py-2 rounded-lg mt-5 disabled:bg-primary-400 disabled:cursor-not-allowed"
          disabled={pending}
          onClick={handlePasswordReset}
        >
          {pending ? "Loading..." : "Next"}
        </button>
        {message?.type === "success" && (
          <p
            aria-live="polite"
            className="mt  §-3 text-[#4BB543] text-center font-semibold"
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}
