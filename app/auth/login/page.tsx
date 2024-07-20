"use client";
import Link from "next/link";
import { useState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: FormData) => {
    setError("");
    setPending(true);
    window.setTimeout(() => {
      login(e)
        .then((res) => {
          if (res?.error) {
            setError(res.error);
          }
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        })
        .finally(() => {
          setPending(false);
        });
    }, 1);
  };

  return (
    <div className="flex flex-row border border-primary-500 bg-primary-200 rounded-2xl max-w-[650px] mx-auto">
      <form
        action={handleSubmit}
        className="flex flex-col flex-1 border-r border-primary-500 rounded-2xl bg-white p-6"
      >
        <p className="text-primary-400 text-lg font-bold mb-3">Welcome back!</p>
        <p className="mb-3">Sign-in to your account and start the adventure</p>
        <p aria-live="polite" className="mb-3 text-red-600 font-semibold">
          {error}
        </p>

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
          />
        </div>
        <div className="flex flex-col mb-5">
          <div className="flex justify-between">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <Link href="/auth/reset" className="text-[#246BFD] font-medium">Forgot password?</Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="p-2 border rounded-lg border-neutral-400 focus:border-primary-500 focus:ring-2 outline-none font-serif"
          />
          
        </div>
        <div className="flex flex-row mb-5 gap-1 items-center">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button
          className="bg-primary-700 text-white px-5 py-2 rounded-lg mt-5 disabled:bg-primary-400 disabled:cursor-not-allowed"
          disabled={pending}
        >
          {pending ? "Loading..." : "Log in"}
        </button>
      </form>
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-lg font-semibold mb-5">Don't have an account?</p>
        <Link
          href="/auth/signup"
          className="bg-primary-700 text-white px-4 py-1.5 rounded-lg"
        >
          Sign up faster
        </Link>
      </div>
    </div>
  );
}
