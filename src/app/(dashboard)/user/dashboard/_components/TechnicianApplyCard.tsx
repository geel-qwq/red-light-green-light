"use client";

import { useState, useEffect } from "react";
import { applyAsTechnician, getMyApplication } from "@/actions/technician-applications";
import { Wrench, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

type AppStatus = { status: string; verifiedBy?: { firstName: string; lastName: string } | null; rejectedBy?: { firstName: string; lastName: string } | null; rejectedReason?: string | null } | null;

export default function TechnicianApplyCard() {
  const [application, setApplication] = useState<AppStatus>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getMyApplication()
      .then((app) => {
        setApplication(app as any);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!skills.trim() || !reason.trim()) {
      setError("Please fill out all fields");
      return;
    }
    setSubmitting(true);
    try {
      await applyAsTechnician({ skills: skills.trim(), reason: reason.trim() });
      setSuccess("Application submitted successfully! An admin will review it.");
      setShowForm(false);
      setSkills("");
      setReason("");
      const app = await getMyApplication();
      setApplication(app as any);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="animate-pulse flex items-center gap-3 text-gray-400 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (application) {
    const status = application.status;
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-amber-50">
            <Wrench className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Technician Application</h3>
            <p className="text-xs text-gray-500 mt-1">
              {status === "PENDING" && "Your application is being reviewed by an admin."}
              {status === "VERIFIED" && `Your application was approved by ${application.verifiedBy?.firstName ?? ""} ${application.verifiedBy?.lastName ?? ""}. Welcome to the team!`}
              {status === "REJECTED" && `Your application was rejected by ${application.rejectedBy?.firstName ?? ""} ${application.rejectedBy?.lastName ?? ""}. Reason: ${application.rejectedReason ?? "No reason provided"}`}
            </p>
          </div>
          <div>
            {status === "PENDING" && <Clock className="w-5 h-5 text-amber-500" />}
            {status === "VERIFIED" && <CheckCircle className="w-5 h-5 text-green-500" />}
            {status === "REJECTED" && <XCircle className="w-5 h-5 text-red-500" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-amber-50">
          <Wrench className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">Become a Technician</h3>
          <p className="text-xs text-gray-500 mt-1">
            Want to help maintain streetlights in your community? Apply to become a technician.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            Apply
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 pt-4 border-t border-gray-100">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Skills & Experience</label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Electrical repair, mechanical skills..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Why do you want to become a technician?</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us why you're interested..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          {success && <p className="text-xs text-green-600">{success}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs font-medium text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
