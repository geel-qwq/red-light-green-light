"use client";

import { signIn, getSession } from "next-auth/react"; // 1. Added getSession import
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      // 2. Fetch the session immediately after successful login
      const session = await getSession();
      const userRole = session?.user?.role; // Accessing the user's role

      // 3. Conditional routing based on the Role enum in your schema
      if (userRole === "SUPERADMIN") {
        router.push("/superadmin/dashboard");
      } else if (userRole === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (userRole === "TECHNICIAN") {
        router.push("/technician/dashboard");
      } else {
        router.push("/user/dashboard");
      }
      
      router.refresh();
    }
  }

  return (
    <div className="w-[90%] max-w-4xl mx-auto rounded-[29px] bg-white/83 border-2 border-white shadow-[0_0_9.9px_6px_rgba(0,0,0,0.25)] p-4 md:p-8">
      <div className="mb-10">
        <h1
          className="w-full max-w-118 mx-auto font-['Koulen'] text-[48px] md:text-[64px] lg:text-[86px] font-normal text-brand-blue text-center select-none"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#1E3A8A",
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
        <p className="text-center font-['Instrument_Sans'] text-xl md:text-2xl lg:text-[24px] font-normal leading-normal text-brand-blue">
          Welcome! Please login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl mx-auto" >
        <div className="flex flex-col gap-2 w-full">
          <label className="text-brand-blue font-['Instrument_Sans'] text-base font-normal leading-[122.098%]">
            Login with Email / Phone Number
          </label>
          {error && <p className="text-sm text-red-500 absolute right-2 top-2">{error}</p>}
          <input
            name="email"
            type="email"
            required
            placeholder="Enter email / phone number"
            defaultValue="admin@lgu.gov.ph"
            className="w-full h-[7.23vh] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray px-6 focus:outline-none shrink-0"
          />
        </div>

        <div className="relative flex items-center w-full mb-1">
          <Lock size={16} color="#1E3A8A" className="absolute left-5 pointer-events-none" />
          <label className="absolute -top-6 text-brand-blue font-['Instrument_Sans'] text-base font-normal leading-[122.098%]">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter password"
            defaultValue="admin123"
            className="w-full h-[7.23vh] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray pl-13 pr-6 focus:outline-none shrink-0"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 z-10 focus:outline-none hover:cursor-pointer hover:opacity-50 transition-opacity"
          >
            {showPassword ? <EyeOff size={20} color="#1E3A8A" /> : <Eye size={20} color="#1E3A8A"/>}
          </button>
        </div>

        <label className="flex items-center mt-1 select-none">
          <label className="flex items-center gap-2 font-['Instrument_Sans'] text-brand-blue">
            <input type="checkbox" name="terms" required className="accent-brand-blue cursor-pointer" />
            Remember me
          </label>
        </label>

        <label className="flex items-center gap-1.5">
          <input type="button" className="none"/>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-blue text-white py-2 rounded-[18px] text-lg font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        </label>

        <label className="font-normal leading-normal text-brand-blue">
          <p className="font-['Instrument_Sans'] text-base text-center m-6 -mt-8">
            Don't have an account? <span className="text-brand-goldenrod underline cursor-pointer hover:opacity-50 transition-opacity">
               <Link href={"/register"}>Register</Link>
               </span>
          </p>
        </label>
      </form>
    </div>
  );
}