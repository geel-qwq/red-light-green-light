// app/register/page.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { registerUser } from "@/actions/auth";
import { CircleUserRound, Phone, Mail, Lock, MapPin, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

// Types for the PSGC API
interface LocationNode {
  code: string;
  name: string;
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [dob, setDob] = useState("");

  // Geographic State
  const [regions, setRegions] = useState<LocationNode[]>([]);
  const [provinces, setProvinces] = useState<LocationNode[]>([]);
  const [cities, setCities] = useState<LocationNode[]>([]);
  const [barangays, setBarangays] = useState<LocationNode[]>([]);

  // Fetch Regions on component mount
  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions")
      .then((res) => res.json())
      .then((data) => setRegions(data))
      .catch((err) => console.error("Error fetching regions:", err));
  }, []);

  const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    // We grab the hidden PSGC code from the dataset to fetch the next level
    const code = e.target.options[selectedIndex].getAttribute("data-code");
    if (!code) return;

    // Reset dependent dropdowns
    setProvinces([]);
    setCities([]);
    setBarangays([]);

    try {
      const res = await fetch(`https://psgc.gitlab.io/api/regions/${code}/provinces`);
      const data = await res.json();

      // NCR Edge Case: Metro Manila has no provinces. 
      // If the region returns 0 provinces, we fetch its cities directly.
      if (data.length === 0) {
        const cityRes = await fetch(`https://psgc.gitlab.io/api/regions/${code}/cities-municipalities`);
        const cityData = await cityRes.json();
        setCities(cityData);
      } else {
        setProvinces(data);
      }
    } catch (err) {
      console.error("Error fetching provinces:", err);
    }
  };

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const code = e.target.options[selectedIndex].getAttribute("data-code");
    if (!code) return;

    setCities([]);
    setBarangays([]);

    try {
      const res = await fetch(`https://psgc.gitlab.io/api/provinces/${code}/cities-municipalities`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const code = e.target.options[selectedIndex].getAttribute("data-code");
    if (!code) return;

    setBarangays([]);

    try {
      const res = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${code}/barangays`);
      const data = await res.json();
      setBarangays(data);
    } catch (err) {
      console.error("Error fetching barangays:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-4 sm:top-2 mb-5">
        <h1
          className="w-full mx-auto font-['Koulen'] text-[48px] sm:text-[64px] md:text-[60px] text-brand-blue text-center select-none leading-none"
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
          <h2 className="text-center text-2xl font-['Instrument_Sans'] text-brand-blue mb-6">
            Create an Account
          </h2>

          <form action={formAction} className="space-y-5">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center gap-2 text-brand-blue font-['Instrument_Sans'] mb-3">
                <CircleUserRound size={18} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 label:text-brand-blue">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-transparent">
                <Field label="Date of Birth">
                  <input
                    name="dob"
                    type="date"
                    placeholder="MM / DD / YYYY"
                    className={`${inputClass} ${dob ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer`}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Field>
                <Field label="Gender" hint="(Optional)">
                  <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={`${inputClass} ${gender ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer`}>
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>   
                    <option value="other">Other</option>
                    
                  </select>
                </Field>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="flex items-center gap-2 text-brand-blue font-['Instrument_Sans'] mb-3">
                <Phone size={18} color="#1E3A8A" fill="#1E3A8A"/>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email Address" required>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

              {/* DYNAMIC LOCATION DROPDOWNS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <Field label="Region" required>
                  <select name="region" value={region} onChange={(e) => setRegion(e.target.value)} className={`${inputClass} ${region ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer`}>
                    <option value="" disabled>
                      Select region
                    </option>
                    {regions.map((reg) => (
                      <option key={reg.code} value={reg.name} data-code={reg.code}>
                        {reg.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Province" required={provinces.length > 0}>
                  <select
                    name="province"
                    defaultValue=""
                    required={provinces.length > 0}
                    disabled={provinces.length === 0}
                    className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}
                    onChange={handleProvinceChange}
                  >
                    <option value="" disabled>
                      {/* Visual indicator for NCR */}
                      {provinces.length === 0 && cities.length > 0 ? "N/A (Metro Manila)" : "Select province"}
                    </option>
                    {provinces.map((prov) => (
                      <option key={prov.code} value={prov.name} data-code={prov.code}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="City / Municipality" required>
                  <select
                    name="city"
                    defaultValue=""
                    required
                    disabled={cities.length === 0}
                    className={`${inputClass} disabled:bg-gray-100`}
                    onChange={handleCityChange}
                  >
                    <option value="" disabled>Select city / municipality</option>
                    {cities.map((city) => (
                      <option key={city.code} value={city.name} data-code={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Barangay" required>
                  <select
                    name="barangay"
                    defaultValue=""
                    required
                    disabled={barangays.length === 0}
                    className={`${inputClass} disabled:bg-gray-100`}
                  >
                    <option value="" disabled>Select barangay</option>
                    {barangays.map((brgy) => (
                      <option key={brgy.code} value={brgy.name}>
                        {brgy.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Street Address" hint="(Optional)">
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
            <div className="-mx-8 px-8 py-6 mt-6">
              <h3 className="flex items-center gap-2 text-brand-blue font-['Instrument_Sans'] mb-3">
                <Lock size={18} />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Password" required hint="(Use 8 or more characters with letters and numbers)">
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
                    >
                      {showPassword ? <EyeOff size={16} color="#1E3A8A"/> : <Eye size={16} color="#1E3A8A"/>}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" required>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
                    >
                      {showConfirm ? <EyeOff size={16} color="#1E3A8A"/> : <Eye size={16} color="#1E3A8A"/>}
                    </button>
                  </div>
                </Field>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mt-4 text-sm">
                <label className="flex items-center gap-2 font-['Instrument_Sans'] text-brand-blue">
                  <input type="checkbox" name="terms" required className="accent-brand-blue hover:cursor-pointer" />
                  I Agree with Terms &amp; Conditions <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center gap-2 font-['Instrument_Sans'] text-brand-blue">
                  <input type="checkbox" name="privacy" required className="accent-brand-blue hover:cursor-pointer"/>
                  I Agree with Privacy Policy <span className="text-red-500">*</span>
                </label>
              </div>

              {state?.error && (
                <p className="text-red-500 text-sm text-center mt-3">{state.error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-blue text-white mt-5 py-2 rounded-[18px] text-lg font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
              >
                {isPending ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-sm mt-4 font-['Instrument_Sans'] text-brand-blue">
                Already have an account?{" "}
                <Link href="/login" className="text-yellow-500 font-['Instrument_Sans'] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "bg-white w-full px-3 py-2 rounded-[12px] shadow-[0_2px_2px_0px_rgba(0,0,0,0.25)] border border-brand-blue text-sm text-brand-blue placeholder:text-gray-400 focus:ring-2 focus:ring-red-5";

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
      <label className="block text-sm font-['Instrument_Sans'] text-brand-blue mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-gray-500 font-['Instrument_Sans'] text-xs ml-1">{hint}</span>}
      </label>
      {children}
    </div>
  );
}