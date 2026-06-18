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
  const [rememberMe, setRememberMe] = useState(false);

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
      rememberMe,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid email or password.");
      setLoading(false);
    } else {
      await redirectAfterLogin();
    }
  }

  async function handleSocialLogin(provider: string) {
    setLoading(true);
    setServerError("");
    await signIn(provider, { callbackUrl: "/" });
  }

  async function redirectAfterLogin() {
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

  return (
    <div className="w-full max-w-4xl mx-auto rounded-[29px] bg-white/83 dark:bg-slate-800/90 border-2 border-white dark:border-slate-700 shadow-[0_0_9.9px_6px_rgba(0,0,0,0.25)] p-4 sm:p-6 md:p-8">
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
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-3 rounded-xl">
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
               className={`w-full h-12 sm:h-[7.23vh] min-h-[48px] bg-[#FFF] dark:bg-slate-700 border-2 rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black dark:text-slate-100 font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray dark:placeholder:text-slate-400 pl-12 pr-6 focus:outline-none shrink-0 transition-colors ${
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
               className={`w-full h-12 sm:h-[7.23vh] min-h-[48px] bg-[#FFF] dark:bg-slate-700 border-2 rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black dark:text-slate-100 font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray dark:placeholder:text-slate-400 pl-12 pr-12 focus:outline-none shrink-0 transition-colors ${
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
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            {rememberMe ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0">
                <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" fill="#1E3A8A" />
                <path d="M7 13.5L11 17.5L19 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0">
                <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" fill="#FFFBFB" />
                <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" stroke="#1E3A8A" />
              </svg>
            )}
            <p className="font-['Instrument_Sans'] text-[15px] text-brand-blue">Remember Me</p>
          </label>
          <Link href="/forgot-password" className="font-['Instrument_Sans'] text-[15px] text-brand-goldenrod underline sm:ml-auto cursor-pointer hover:opacity-50 transition-opacity">
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-brand-blue/30" />
            <span className="px-3 text-sm text-brand-blue font-['Instrument_Sans']">or</span>
            <div className="flex-1 border-t border-brand-blue/30" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("google")}
              className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border-2 border-brand-blue/30 dark:border-slate-600 rounded-[18px] py-3 px-4 text-sm font-['Instrument_Sans'] text-brand-blue dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("facebook")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] border-2 border-[#1877F2] rounded-[18px] py-3 px-4 text-sm font-['Instrument_Sans'] text-white hover:bg-[#166fe5] cursor-pointer disabled:opacity-50 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

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
