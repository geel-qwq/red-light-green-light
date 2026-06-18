"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { verifyEmailToken } from "@/actions/verify-email";

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    verifyEmailToken(token).then((result) => {
      if (result.success) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      } else {
        setStatus("error");
        setMessage(result.error ?? "Verification failed.");
      }
    }).catch(() => {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    });
  }, [token]);

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
      </div>

      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <Loader className="w-12 h-12 text-brand-blue animate-spin mx-auto" />
            <p className="text-brand-blue font-['Instrument_Sans'] font-semibold">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-brand-blue font-['Instrument_Sans'] font-semibold">{message}</p>
            <Link
              href="/login"
              className="inline-block bg-brand-blue text-white px-6 py-2.5 rounded-[18px] text-sm font-['Instrument_Sans'] hover:bg-brand-royal-blue transition-colors mt-4"
            >
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 font-['Instrument_Sans'] font-semibold">{message}</p>
            <Link
              href="/login"
              className="inline-block bg-brand-blue text-white px-6 py-2.5 rounded-[18px] text-sm font-['Instrument_Sans'] hover:bg-brand-royal-blue transition-colors mt-4"
            >
              Go to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
