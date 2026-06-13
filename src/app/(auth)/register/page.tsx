// app/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerUser } from "@/actions/auth";
import { User, Phone, Mail, Lock, MapPin, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-10 mb-5">
        <h1
          className="w-full max-w-118 mx-auto font-['Koulen'] text-[86px] font-normal text-brand-blue text-center select-none"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#1E3A8A",
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden pt-30">
        <div className="p-8">
          <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
            Create an Account
          </h2>

          <form action={formAction} className="space-y-5">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
                <User size={18} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="First Name" required>
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="Ex. Juan Miguel"
                    className={inputClass}
                  />
                </Field>
                <Field label="Middle Name" hint="(Write N/A if not applicable)">
                  <input
                    name="middleName"
                    type="text"
                    placeholder="Ex. Bonita"
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Ex. Dela Cruz"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Field label="Date of Birth">
                  <input
                    name="dob"
                    type="date"
                    placeholder="MM / DD / YYYY"
                    className={inputClass}
                  />
                </Field>
                <Field label="Gender" hint="(Optional)">
                  <select name="gender" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
                <Phone size={18} />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email Address" required>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Ex. juandelacruz@gmail.com"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
                <Field label="Phone Number" required>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="09XX XXX XXXX"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <Field label="Region" required>
                  <select
                    name="region"
                    defaultValue=""
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select region
                    </option>
                  </select>
                </Field>
                <Field label="Province" required>
                  <select
                    name="province"
                    defaultValue=""
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select province
                    </option>
                  </select>
                </Field>
                <Field label="City / Municipality" required>
                  <select
                    name="city"
                    defaultValue=""
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select city / municipality
                    </option>
                  </select>
                </Field>
                <Field label="Barangay" required>
                  <select
                    name="barangay"
                    defaultValue=""
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select barangay
                    </option>
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Street Address" hint="(Optional)">
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="streetAddress"
                      type="text"
                      placeholder="House no., Street name, etc."
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 -mx-8 px-8 py-6 mt-6 rounded-b-2xl">
              <h3 className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
                <Lock size={18} />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Password"
                  required
                  hint="(Use 8 or more characters with letters and numbers)"
                >
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Create a password"
                      className={`${inputClass} pl-9 pr-9`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" required>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Confirm password"
                      className={`${inputClass} pl-9 pr-9`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mt-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    className="accent-blue-700"
                  />
                  I Agree with Terms &amp; Conditions{" "}
                  <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    className="accent-blue-700"
                  />
                  I Agree with Privacy Policy{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {state?.error && (
                <p className="text-red-500 text-sm text-center mt-3">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-5 py-3 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isPending ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-sm mt-3 text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-yellow-500 font-medium hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-md border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && (
          <span className="text-gray-400 font-normal text-xs ml-1">{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
