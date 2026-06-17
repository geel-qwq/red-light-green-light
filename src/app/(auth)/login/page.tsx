"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return "Enter a valid email address";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("admin@lgu.gov.ph");
  const [password, setPassword] = useState("admin123");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  function validate(): boolean {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    return !eErr && !pErr;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid email or password.");
      setLoading(false);
    } else {
      const session = await getSession();
      const userRole = session?.user?.role;

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
    <div className="w-full max-w-4xl mx-auto rounded-[29px] bg-white/83 border-2 border-white shadow-[0_0_9.9px_6px_rgba(0,0,0,0.25)] p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-10">
        <h1
          className="w-full mx-auto font-['Koulen'] text-[40px] sm:text-[56px] md:text-[86px] font-normal text-brand-blue text-center select-none leading-none"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#1E3A8A",
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
        <p className="text-center font-['Instrument_Sans'] text-lg sm:text-xl md:text-2xl font-normal leading-normal text-brand-blue">
          Welcome! Please login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-10 max-w-5xl mx-auto">
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-2 w-full relative">
          <label className="text-brand-blue font-['Instrument_Sans'] text-sm sm:text-base font-normal leading-[122.098%]">
            Login with Email / Phone Number
          </label>
          <div className="relative">
            <Mail size={16} color="#1E3A8A" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email / phone number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) setEmailError(validateEmail(e.target.value));
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, email: true }));
                setEmailError(validateEmail(email));
              }}
              className={`w-full h-12 sm:h-[7.23vh] min-h-[48px] bg-[#FFF] border-2 rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray pl-12 pr-6 focus:outline-none shrink-0 transition-colors ${
                emailError && touched.email ? "border-red-400" : "border-brand-blue"
              }`}
            />
          </div>
          {emailError && touched.email && (
            <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">
              <span>⚠</span> {emailError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-brand-blue font-['Instrument_Sans'] text-sm sm:text-base font-normal leading-[122.098%]">
            Password
          </label>
          <div className="relative flex items-center w-full">
            <Lock size={16} color="#1E3A8A" className="absolute left-4 pointer-events-none" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) setPasswordError(validatePassword(e.target.value));
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, password: true }));
                setPasswordError(validatePassword(password));
              }}
              className={`w-full h-12 sm:h-[7.23vh] min-h-[48px] bg-[#FFF] border-2 rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray pl-12 pr-12 focus:outline-none shrink-0 transition-colors ${
                passwordError && touched.password ? "border-red-400" : "border-brand-blue"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 z-10 focus:outline-none hover:cursor-pointer hover:opacity-50 transition-opacity"
            >
              {showPassword ? <EyeOff size={20} color="#1E3A8A" /> : <Eye size={20} color="#1E3A8A" />}
            </button>
          </div>
          {passwordError && touched.password && (
            <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">
              <span>⚠</span> {passwordError}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-1.5 cursor-pointer select-none">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" className="sr-only" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              className="shrink-0"
            >
              <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" fill="#FFFBFB" />
              <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" stroke="#1E3A8A" />
            </svg>
            <p className="font-['Instrument_Sans'] text-[15px] text-brand-blue">Remember Me</p>
          </label>
          <Link href="/forgot-password" className="font-['Instrument_Sans'] text-[15px] text-brand-goldenrod underline sm:ml-auto cursor-pointer hover:opacity-50 transition-opacity">
            Forgot Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue text-white py-3 sm:py-2 rounded-[18px] text-base sm:text-lg font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="font-['Instrument_Sans'] text-sm sm:text-base text-center text-brand-blue">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-goldenrod underline cursor-pointer hover:opacity-50 transition-opacity">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
