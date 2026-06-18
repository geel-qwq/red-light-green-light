"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Pencil, X, Check, Calendar, Phone, Mail, MapPin, User, Shield, VenusAndMars, Trash2, AlertTriangle } from "lucide-react";
import { getProfile, updateProfile, deleteAccount } from "@/actions/profile";

interface LocationNode {
  code: string;
  name: string;
}

interface ProfileData {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  barangay: string;
  city: string;
  province: string | null;
  region: string;
  streetAddress: string | null;
  dob: Date | null;
  gender: string | null;
  createdAt: Date;
}

const ROLE_BADGE: Record<string, string> = {
  SUPERADMIN: "bg-purple-100 text-purple-700",
  ADMIN: "bg-blue-100 text-blue-700",
  TECHNICIAN: "bg-amber-100 text-amber-700",
  USER: "bg-gray-100 text-gray-600",
};

function formatDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteForm, setDeleteForm] = useState({ email: "", password: "" });
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [regions, setRegions] = useState<LocationNode[]>([]);
  const [provinces, setProvinces] = useState<LocationNode[]>([]);
  const [cities, setCities] = useState<LocationNode[]>([]);
  const [barangays, setBarangays] = useState<LocationNode[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    streetAddress: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data as any);
      setForm({
        firstName: data.firstName,
        middleName: data.middleName ?? "",
        lastName: data.lastName,
        phone: data.phone,
        region: data.region,
        province: data.province ?? "",
        city: data.city,
        barangay: data.barangay,
        streetAddress: data.streetAddress ?? "",
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
        gender: data.gender ?? "",
      });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!editing) return;
    fetch("https://psgc.gitlab.io/api/regions")
      .then((r) => r.json())
      .then((data: any[]) => setRegions(data.map((r: any) => ({ code: r.code, name: r.name }))))
      .catch(() => {});
  }, [editing]);

  useEffect(() => {
    if (!form.region || !editing) { setProvinces([]); setCities([]); setBarangays([]); return; }
    const code = form.region;
    Promise.all([
      fetch(`https://psgc.gitlab.io/api/regions/${code}/provinces`).then((r) => r.json()),
      fetch(`https://psgc.gitlab.io/api/regions/${code}/cities-municipalities`).then((r) => r.json()),
    ])
      .then(([provs, citiesData]: [any[], any[]]) => {
        setProvinces(provs.map((p: any) => ({ code: p.code, name: p.name })));
        if (provs.length === 0) {
          setCities(citiesData.map((c: any) => ({ code: c.code, name: c.name })));
        }
      })
      .catch(() => {});
  }, [form.region, editing]);

  useEffect(() => {
    if (!form.province || !editing) { setCities([]); setBarangays([]); return; }
    fetch(`https://psgc.gitlab.io/api/provinces/${form.province}/cities-municipalities`)
      .then((r) => r.json())
      .then((data: any[]) => setCities(data.map((c: any) => ({ code: c.code, name: c.name }))))
      .catch(() => {});
  }, [form.province, editing]);

  useEffect(() => {
    if (!form.city || !editing) { setBarangays([]); return; }
    fetch(`https://psgc.gitlab.io/api/cities-municipalities/${form.city}/barangays`)
      .then((r) => r.json())
      .then((data: any[]) => setBarangays(data.map((b: any) => ({ code: b.code, name: b.name }))))
      .catch(() => {});
  }, [form.city, editing]);

  async function handleSave() {
    setError("");
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.region || !form.city || !form.barangay) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim() || null,
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        region: form.region,
        province: form.province || null,
        city: form.city,
        barangay: form.barangay,
        streetAddress: form.streetAddress.trim() || null,
        dob: form.dob || null,
        gender: form.gender || null,
      });
      setProfile((prev) => prev ? { ...prev, ...form, dob: form.dob ? new Date(form.dob) : null, middleName: form.middleName || null, province: form.province || null, streetAddress: form.streetAddress || null, gender: form.gender || null } : prev);
      setEditing(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
    }
    setSaving(false);
  }

  if (showDelete) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowDelete(false)}>
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Delete Account</h3>
              <p className="text-xs text-gray-500">This action cannot be undone. All your data will be permanently removed.</p>
            </div>
          </div>

          {deleteError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{deleteError}</div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
            <input
              value={deleteForm.email}
              onChange={(e) => setDeleteForm({ ...deleteForm, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={deleteForm.password}
              onChange={(e) => setDeleteForm({ ...deleteForm, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setShowDelete(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                setDeleteError("");
                if (!deleteForm.email || !deleteForm.password) {
                  setDeleteError("Please fill in both fields.");
                  return;
                }
                setDeleting(true);
                try {
                  await deleteAccount({ email: deleteForm.email, password: deleteForm.password });
                  await signOut({ callbackUrl: "/login" });
                } catch (err: any) {
                  setDeleteError(err.message ?? "Failed to delete account");
                }
                setDeleting(false);
              }}
              disabled={deleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              {deleting ? "Deleting..." : "Permanently Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Failed to load profile.
      </div>
    );
  }

  if (!editing) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-400 mt-0.5">Your account information</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#2f4383] hover:bg-[#243570] rounded-lg transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
          <Section icon={User} label="Full Name" value={`${profile.firstName} ${profile.middleName ? profile.middleName + " " : ""}${profile.lastName}`} />
          <Section icon={Mail} label="Email" value={profile.email} />
          <Section icon={Phone} label="Phone" value={profile.phone} />
          <Section icon={Shield} label="Role" value={
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${ROLE_BADGE[profile.role] ?? "bg-gray-100 text-gray-500"}`}>
              {profile.role}
            </span>
          } />
          <Section icon={MapPin} label="Region" value={profile.region} />
          {profile.province && <Section icon={MapPin} label="Province" value={profile.province} />}
          <Section icon={MapPin} label="City / Municipality" value={profile.city} />
          <Section icon={MapPin} label="Barangay" value={profile.barangay} />
          {profile.streetAddress && <Section icon={MapPin} label="Street Address" value={profile.streetAddress} />}
          <Section icon={VenusAndMars} label="Gender" value={profile.gender ? (profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)) : "—"} />
          <Section icon={Calendar} label="Date of Birth" value={formatDate(profile.dob)} />
          <Section icon={Calendar} label="Member Since" value={formatDate(profile.createdAt)} />
        </div>

        {/* Manage Account — USER only */}
        {profile.role === "USER" && (
          <div className="bg-white rounded-xl border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-red-700">Manage Account</h3>
                <p className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all associated data</p>
              </div>
              <button
                onClick={() => { setShowDelete(true); setDeleteForm({ email: "", password: "" }); setDeleteError(""); }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-sm text-gray-400 mt-0.5">Update your account information</p>
        </div>
        <button
          onClick={() => { setEditing(false); setError(""); }}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="First Name *">
            <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" />
          </Field>
          <Field label="Middle Name">
            <input value={form.middleName} onChange={(e) => setForm({ ...form, middleName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" />
          </Field>
          <Field label="Last Name *">
            <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email">
            <input value={profile.email} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
          </Field>
          <Field label="Phone *">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Gender">
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </Field>
          <Field label="Date of Birth">
            <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Region *">
            <select value={form.region} onChange={(e) => { setForm({ ...form, region: e.target.value, province: "", city: "", barangay: "" }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]">
              <option value="">Select region</option>
              {regions.map((r) => <option key={r.code} value={r.code}>{r.name}</option>)}
            </select>
          </Field>
          <Field label="Province">
            <select value={form.province} onChange={(e) => { setForm({ ...form, province: e.target.value, city: "", barangay: "" }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]">
              <option value="">Select province</option>
              {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City / Municipality *">
            <select value={form.city} onChange={(e) => { setForm({ ...form, city: e.target.value, barangay: "" }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]">
              <option value="">Select city/municipality</option>
              {cities.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Barangay *">
            <select value={form.barangay} onChange={(e) => setForm({ ...form, barangay: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]">
              <option value="">Select barangay</option>
              {barangays.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Street Address">
          <input value={form.streetAddress} onChange={(e) => setForm({ ...form, streetAddress: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]" placeholder="House/Unit No., Street" />
        </Field>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold text-white bg-[#2f4383] hover:bg-[#243570] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );

}

function Section({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <div className="text-sm text-gray-800 mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
