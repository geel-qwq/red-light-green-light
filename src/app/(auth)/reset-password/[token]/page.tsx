"use client";

import { useActionState, useState } from "react";
import { resetPassword } from "@/actions/reset-password";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
          Set a new password
        </p>
      </div>

      {state?.success ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-brand-blue font-['Instrument_Sans'] font-semibold">
            Password reset successful!
          </p>
          <p className="text-gray-500 text-sm font-['Instrument_Sans']">
            You can now log in with your new password.
          </p>
          <Link
            href="/login"
            className="inline-block bg-brand-blue text-white px-6 py-2.5 rounded-[18px] text-sm font-['Instrument_Sans'] hover:bg-brand-royal-blue transition-colors mt-4"
          >
            Go to login
          </Link>
        </div>
      ) : (
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="token" value={token} />

          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-brand-blue font-['Instrument_Sans'] text-sm font-normal">
              New Password
            </label>
            <div className="relative">
              <Lock size={16} color="#1E3A8A" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full h-12 min-h-[48px] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] placeholder:text-brand-gray pl-12 pr-12 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
              >
                {showPassword ? <EyeOff size={20} color="#1E3A8A" /> : <Eye size={20} color="#1E3A8A" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-brand-blue font-['Instrument_Sans'] text-sm font-normal">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} color="#1E3A8A" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Confirm your password"
                className="w-full h-12 min-h-[48px] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] placeholder:text-brand-gray pl-12 pr-12 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
              >
                {showConfirm ? <EyeOff size={20} color="#1E3A8A" /> : <Eye size={20} color="#1E3A8A" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-blue text-white py-3 rounded-[18px] text-base font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
