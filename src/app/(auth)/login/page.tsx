"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

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
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/map-bg.png')] bg-cover bg-center">
      {/* Overlay to dim the map slightly like in the screenshot */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-[60rem] bg-white rounded-2xl shadow-xl px-10 py-10 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-[#1a2e6e]">IL</span>
            <span className="text-[#f5c518]">LUMEN</span>
            <span className="text-[#1a2e6e]">ATE</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-[#1a2e6e] text-base font-medium mb-8 leading-snug">
          Welcome back! Please sign in to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Login with Email / Phone Number
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@lgu.gov.ph"
              placeholder="Enter email / phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e6e] placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <LockKeyhole className="absolute left-3 top-8.5 text-[#1a2e6e]" size={20} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              defaultValue="admin123"
              placeholder="Enter password"
              className="w-full pl-10 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e6e] placeholder-gray-400"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-9 text-[#1a2e6e] focus:outline-none'
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Sign In button — dark navy, matches "Request New Password" */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2e6e] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#152459] disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot password — outlined, matches "Log-in" secondary button */}
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="w-full border border-gray-300 text-gray-500 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Forgot Password?
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo: admin@lgu.gov.ph / admin123
        </p>
      </div>
    </div>
  );
}
