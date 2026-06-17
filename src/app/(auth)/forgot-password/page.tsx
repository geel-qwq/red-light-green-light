"use client";

import { useActionState } from "react";
import { requestReset } from "@/actions/reset-password";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(requestReset, null);

  return (
    <div className="w-full max-w-lg mx-auto rounded-[29px] bg-white/83 border-2 border-white shadow-[0_0_9.9px_6px_rgba(0,0,0,0.25)] p-6 sm:p-8">
      <div className="mb-6">
        <h1
          className="w-full mx-auto font-['Koulen'] text-[36px] sm:text-[48px] font-normal text-brand-blue text-center select-none leading-none"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#1E3A8A",
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
        <p className="text-center font-['Instrument_Sans'] text-lg font-normal leading-normal text-brand-blue mt-2">
          Reset your password
        </p>
      </div>

      {state?.success ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-brand-blue font-['Instrument_Sans']">
            Check your email for a reset link.
          </p>
          <p className="text-gray-500 text-sm font-['Instrument_Sans']">
            If an account with that email exists, you&apos;ll receive a password reset link shortly.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-brand-goldenrod font-['Instrument_Sans'] text-sm hover:underline mt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-brand-blue font-['Instrument_Sans'] text-sm font-normal">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} color="#1E3A8A" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full h-12 min-h-[48px] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] placeholder:text-brand-gray pl-12 pr-6 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-blue text-white py-3 rounded-[18px] text-base font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center font-['Instrument_Sans'] text-sm text-brand-blue">
            <Link href="/login" className="text-brand-goldenrod underline hover:opacity-50 transition-opacity">
              Back to login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
