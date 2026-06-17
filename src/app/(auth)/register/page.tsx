"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { registerUser } from "@/actions/auth";
import { CircleUserRound, Phone, Mail, Lock, MapPin, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface LocationNode {
  code: string;
  name: string;
}

function validateFirstName(v: string): string | null {
  if (!v.trim()) return "First name is required";
  if (!/^[A-Za-z\s'-]+$/.test(v.trim())) return "First name must contain only letters";
  return null;
}

function validateLastName(v: string): string | null {
  if (!v.trim()) return "Last name is required";
  if (!/^[A-Za-z\s'-]+$/.test(v.trim())) return "Last name must contain only letters";
  return null;
}

function validateEmail(v: string): string | null {
  if (!v.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Enter a valid email address";
  return null;
}

function validatePhone(v: string): string | null {
  if (!v.trim()) return "Phone number is required";
  const cleaned = v.replace(/[\s\-\(\)]/g, "");
  if (/^09\d{9}$/.test(cleaned)) return null;
  if (/^\+639\d{9}$/.test(cleaned)) return null;
  if (/^639\d{9}$/.test(cleaned)) return null;
  return "Enter a valid PH mobile number (e.g. 09XX XXX XXXX)";
}

function validatePassword(v: string): string | null {
  if (!v) return "Password is required";
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[a-zA-Z]/.test(v)) return "Password must contain at least one letter";
  if (!/[0-9]/.test(v)) return "Password must contain at least one number";
  return null;
}

function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return null;
}

function validateDob(v: string): string | null {
  if (!v) return "Date of birth is required";
  const date = new Date(v);
  if (isNaN(date.getTime())) return "Enter a valid date";
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate()) ? age - 1 : age;
  if (actualAge < 12) return "You must be at least 12 years old";
  if (actualAge > 150) return "Enter a valid date of birth";
  return null;
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [dob, setDob] = useState("");

  const [regions, setRegions] = useState<LocationNode[]>([]);
  const [provinces, setProvinces] = useState<LocationNode[]>([]);
  const [cities, setCities] = useState<LocationNode[]>([]);
  const [barangays, setBarangays] = useState<LocationNode[]>([]);

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions")
      .then((res) => res.json())
      .then((data) => setRegions(data))
      .catch((err) => console.error("Error fetching regions:", err));
  }, []);

  const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const code = e.target.options[selectedIndex].getAttribute("data-code");
    if (!code) return;

    setProvinces([]);
    setCities([]);
    setBarangays([]);

    try {
      const res = await fetch(`https://psgc.gitlab.io/api/regions/${code}/provinces`);
      const data = await res.json();

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

  function markTouched(fields: string[]) {
    setTouched((prev) => {
      const next = { ...prev };
      fields.forEach((f) => (next[f] = true));
      return next;
    });
  }

  function validateAll(): boolean {
    const newErrors: Record<string, string | null> = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      dob: validateDob(dob),
      region: !region ? "Region is required" : null,
      city: cities.length > 0 && !document.querySelector<HTMLSelectElement>("select[name='city']")?.value
        ? "City is required" : null,
      barangay: barangays.length > 0 && !document.querySelector<HTMLSelectElement>("select[name='barangay']")?.value
        ? "Barangay is required" : null,
      terms: !terms ? "You must agree to the Terms & Conditions" : null,
      privacy: !privacy ? "You must agree to the Privacy Policy" : null,
    };

    // Province only required if provinces are available
    if (provinces.length > 0) {
      newErrors.province = !document.querySelector<HTMLSelectElement>("select[name='province']")?.value
        ? "Province is required" : null;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === null);
  }

  function handleFieldBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Re-run validation for this field
    const validator = fieldValidators[field];
    if (validator) {
      const err = validator();
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  }

  const fieldValidators: Record<string, () => string | null> = {
    firstName: () => validateFirstName(firstName),
    lastName: () => validateLastName(lastName),
    middleName: () => null, // optional
    email: () => validateEmail(email),
    phone: () => validatePhone(phone),
    password: () => validatePassword(password),
    confirmPassword: () => validateConfirmPassword(password, confirmPassword),
    dob: () => validateDob(dob),
    gender: () => (gender ? null : "Gender is required"),
  };

  function handleFieldChange(field: string, value: string) {
    const setters: Record<string, (v: string) => void> = {
      firstName: setFirstName,
      lastName: setLastName,
      middleName: setMiddleName,
      email: setEmail,
      phone: setPhone,
      password: setPassword,
      confirmPassword: setConfirmPassword,
      streetAddress: setStreetAddress,
    };
    setters[field]?.(value);
    if (touched[field]) {
      const validator = fieldValidators[field];
      if (validator) {
        setErrors((prev) => ({ ...prev, [field]: validator() }));
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    markTouched([
      "firstName", "lastName", "email", "phone",
      "password", "confirmPassword", "dob", "gender",
      "region", "terms", "privacy",
    ]);
    if (provinces.length > 0) markTouched(["province"]);
    if (cities.length > 0) markTouched(["city"]);
    if (barangays.length > 0) markTouched(["barangay"]);

    if (!validateAll()) return;

    const formData = new FormData(formRef.current!);
    startTransition(() => formAction(formData));
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center p-2 sm:p-4 relative pt-16 sm:pt-4">
      <div className="absolute top-2 sm:top-2 mb-5">
        <h1
          className="w-full mx-auto font-['Koulen'] text-[36px] sm:text-[48px] md:text-[60px] text-brand-blue text-center select-none leading-none"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#1E3A8A",
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden mt-12 sm:mt-16 md:mt-20">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-center text-xl sm:text-2xl font-['Instrument_Sans'] text-brand-blue mb-4 sm:mb-6">
            Create an Account
          </h2>

          {state?.error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              {state.error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Personal Information */}
            <div>
              <h3 className="flex items-center gap-2 text-brand-blue font-['Instrument_Sans'] mb-3">
                <CircleUserRound size={18} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 label:text-brand-blue">
                <Field label="First Name" required error={touched.firstName ? errors.firstName : null}>
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="Ex. Juan Miguel"
                    value={firstName}
                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                    onBlur={() => handleFieldBlur("firstName")}
                    className={`${inputClass} ${touched.firstName && errors.firstName ? "border-red-400!" : ""}`}
                  />
                </Field>
                <Field label="Middle Name" hint="(Write N/A if not applicable)">
                  <input
                    name="middleName"
                    type="text"
                    placeholder="Ex. Bonita"
                    value={middleName}
                    onChange={(e) => handleFieldChange("middleName", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Name" required error={touched.lastName ? errors.lastName : null}>
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Ex. Dela Cruz"
                    value={lastName}
                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                    onBlur={() => handleFieldBlur("lastName")}
                    className={`${inputClass} ${touched.lastName && errors.lastName ? "border-red-400!" : ""}`}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4 bg-transparent">
                <Field label="Date of Birth" required error={touched.dob ? errors.dob : null}>
                  <input
                    name="dob"
                    type="date"
                    placeholder="MM / DD / YYYY"
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toISOString().split("T")[0]}
                    className={`${inputClass} ${dob ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer ${touched.dob && errors.dob ? "border-red-400!" : ""}`}
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                      if (touched.dob) {
                        setErrors((prev) => ({ ...prev, dob: validateDob(e.target.value) }));
                      }
                    }}
                    onBlur={() => handleFieldBlur("dob")}
                  />
                </Field>
                <Field label="Gender" required error={touched.gender ? errors.gender : null}>
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (touched.gender) setErrors((prev) => ({ ...prev, gender: e.target.value ? null : "Gender is required" }));
                    }}
                    onBlur={() => handleFieldBlur("gender")}
                    className={`${inputClass} ${gender ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer ${touched.gender && errors.gender ? "border-red-400!" : ""}`}
                  >
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
                <Phone size={18} color="#1E3A8A" fill="#1E3A8A" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Field label="Email Address" required error={touched.email ? errors.email : null}>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Ex. juandelacruz@gmail.com"
                      value={email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      onBlur={() => handleFieldBlur("email")}
                      className={`${inputClass} pl-9 ${touched.email && errors.email ? "border-red-400!" : ""}`}
                    />
                  </div>
                </Field>
                <Field label="Phone Number" required error={touched.phone ? errors.phone : null}>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="09XX XXX XXXX"
                      value={phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      onBlur={() => handleFieldBlur("phone")}
                      className={`${inputClass} pl-9 ${touched.phone && errors.phone ? "border-red-400!" : ""}`}
                    />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
                <Field label="Region" required error={touched.region ? errors.region : null}>
                  <select
                    name="region"
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      handleRegionChange(e);
                      if (touched.region) setErrors((prev) => ({ ...prev, region: e.target.value ? null : "Region is required" }));
                    }}
                    onBlur={() => handleFieldBlur("region")}
                    className={`${inputClass} ${region ? "bg-white!" : "bg-transparent!"} hover:cursor-pointer ${touched.region && errors.region ? "border-red-400!" : ""}`}
                  >
                    <option value="" disabled>Select region</option>
                    {regions.map((reg) => (
                      <option key={reg.code} value={reg.name} data-code={reg.code}>
                        {reg.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Province" required={provinces.length > 0} error={touched.province ? errors.province : null}>
                  <select
                    name="province"
                    defaultValue=""
                    required={provinces.length > 0}
                    disabled={provinces.length === 0}
                    className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400 ${touched.province && errors.province ? "border-red-400!" : ""}`}
                    onChange={handleProvinceChange}
                    onBlur={() => handleFieldBlur("province")}
                  >
                    <option value="" disabled>
                      {provinces.length === 0 && cities.length > 0 ? "N/A (Metro Manila)" : "Select province"}
                    </option>
                    {provinces.map((prov) => (
                      <option key={prov.code} value={prov.name} data-code={prov.code}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="City / Municipality" required error={touched.city ? errors.city : null}>
                  <select
                    name="city"
                    defaultValue=""
                    required
                    disabled={cities.length === 0}
                    className={`${inputClass} disabled:bg-gray-100 ${touched.city && errors.city ? "border-red-400!" : ""}`}
                    onChange={handleCityChange}
                    onBlur={() => handleFieldBlur("city")}
                  >
                    <option value="" disabled>Select city / municipality</option>
                    {cities.map((city) => (
                      <option key={city.code} value={city.name} data-code={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Barangay" required error={touched.barangay ? errors.barangay : null}>
                  <select
                    name="barangay"
                    defaultValue=""
                    required
                    disabled={barangays.length === 0}
                    className={`${inputClass} disabled:bg-gray-100 ${touched.barangay && errors.barangay ? "border-red-400!" : ""}`}
                    onBlur={() => handleFieldBlur("barangay")}
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

              <div className="mt-3 sm:mt-4">
                <Field label="Street Address" hint="(Optional)">
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="streetAddress"
                      type="text"
                      placeholder="House no., Street name, etc."
                      value={streetAddress}
                      onChange={(e) => handleFieldChange("streetAddress", e.target.value)}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Account Information */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 sm:py-6 mt-4 sm:mt-6">
              <h3 className="flex items-center gap-2 text-brand-blue font-['Instrument_Sans'] mb-3">
                <Lock size={18} />
                Account Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Field label="Password" required hint="(Use 8 or more characters with letters and numbers)" error={touched.password ? errors.password : null}>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => handleFieldChange("password", e.target.value)}
                      onBlur={() => handleFieldBlur("password")}
                      className={`${inputClass} pl-9 pr-9 ${touched.password && errors.password ? "border-red-400!" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
                    >
                      {showPassword ? <EyeOff size={16} color="#1E3A8A" /> : <Eye size={16} color="#1E3A8A" />}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" required error={touched.confirmPassword ? errors.confirmPassword : null}>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      className={`${inputClass} pl-9 pr-9 ${touched.confirmPassword && errors.confirmPassword ? "border-red-400!" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:opacity-50 transition-opacity"
                    >
                      {showConfirm ? <EyeOff size={16} color="#1E3A8A" /> : <Eye size={16} color="#1E3A8A" />}
                    </button>
                  </div>
                </Field>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mt-4 text-sm">
                <label className="flex items-center gap-2 font-['Instrument_Sans'] text-brand-blue cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      if (touched.terms) setErrors((prev) => ({ ...prev, terms: e.target.checked ? null : "You must agree to the Terms & Conditions" }));
                    }}
                    onBlur={() => handleFieldBlur("terms")}
                    className="accent-brand-blue hover:cursor-pointer"
                  />
                  I Agree with Terms &amp; Conditions <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center gap-2 font-['Instrument_Sans'] text-brand-blue cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    checked={privacy}
                    onChange={(e) => {
                      setPrivacy(e.target.checked);
                      if (touched.privacy) setErrors((prev) => ({ ...prev, privacy: e.target.checked ? null : "You must agree to the Privacy Policy" }));
                    }}
                    onBlur={() => handleFieldBlur("privacy")}
                    className="accent-brand-blue hover:cursor-pointer"
                  />
                  I Agree with Privacy Policy <span className="text-red-500">*</span>
                </label>
              </div>
              {touched.terms && errors.terms && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.terms}
                </p>
              )}
              {touched.privacy && errors.privacy && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span> {errors.privacy}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-blue text-white mt-4 sm:mt-5 py-3 sm:py-2 rounded-[18px] text-base sm:text-lg font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-colors"
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
  "bg-white w-full px-3 py-2.5 sm:py-2 rounded-[12px] shadow-[0_2px_2px_0px_rgba(0,0,0,0.25)] border border-brand-blue text-sm text-brand-blue placeholder:text-gray-400 focus:ring-2 focus:ring-red-5";

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-['Instrument_Sans'] text-brand-blue mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-gray-500 font-['Instrument_Sans'] text-xs ml-1">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] mt-0.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
