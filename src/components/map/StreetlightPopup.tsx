"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getNearestPole, registerOsmPole } from "@/actions/poles";
import { createFaultReport } from "@/actions/faults";
import { X, MapPin, AlertTriangle, CheckCircle, Loader2, PlusCircle } from "lucide-react";

type PoleData = {
  id: string;
  poleCode: string;
  address: string;
  barangay: string;
  status: string;
  latitude: number;
  longitude: number;
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  ACTIVE: { label: "Operational", color: "text-green-600", bg: "bg-green-50 border-green-200" },
  FAULTY: { label: "Faulty", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  UNDER_MAINTENANCE: { label: "Under Maintenance", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  DECOMMISSIONED: { label: "Decommissioned", color: "text-gray-600", bg: "bg-gray-50 border-gray-200" },
};

export default function StreetlightPopup({
  lat,
  lng,
  onClose,
}: {
  lat: number;
  lng: number;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [pole, setPole] = useState<PoleData | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [reportMode, setReportMode] = useState(false);
  const [faultType, setFaultType] = useState("OTHER");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNearestPole(lat, lng).then((result) => {
      setPole(result as PoleData | null);
      setLoading(false);
    });
  }, [lat, lng]);

  const handleSubmit = useCallback(async () => {
    if (!pole || !session?.user?.id || !description.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await createFaultReport({
        poleId: pole.id,
        reportedById: session.user.id,
        description: description.trim(),
        faultType: faultType as any,
      });
      setSubmitted(true);
      setReportMode(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  }, [pole, session, description, faultType]);

  const config = pole ? statusConfig[pole.status] : null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Streetlight</h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {lat.toFixed(6)}, {lng.toFixed(6)}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              <span className="ml-2 text-sm text-gray-400">Checking pole data...</span>
            </div>
          ) : submitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-900">Fault Reported</p>
              <p className="text-xs text-gray-400 mt-1">Thank you. Maintenance has been notified.</p>
            </div>
          ) : pole ? (
            <>
              <div className={`rounded-xl border p-4 ${config?.bg ?? "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
                  <span className={`text-[11px] font-bold ${config?.color ?? "text-gray-600"}`}>
                    {config?.label ?? pole.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-2">{pole.poleCode}</p>
                <p className="text-xs text-gray-500">{pole.address}, {pole.barangay}</p>
              </div>

              {!reportMode ? (
                <button
                  onClick={() => setReportMode(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Report as Broken
                </button>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Report Fault</h4>
                  <select
                    value={faultType}
                    onChange={(e) => setFaultType(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="NO_POWER">No Power</option>
                    <option value="FLICKERING">Flickering</option>
                    <option value="DAMAGED_FIXTURE">Damaged Fixture</option>
                    <option value="VANDALISM">Vandalism</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue..."
                    rows={3}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReportMode(false)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !description.trim()}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Submit Report
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500">Not in database yet</p>
              <p className="text-xs text-gray-400 mt-1">This streetlight isn&apos;t registered in the system.</p>
              <button
                onClick={async () => {
                  setRegistering(true);
                  setError(null);
                  try {
                    const newPole = await registerOsmPole(lat, lng);
                    setPole(newPole as PoleData);
                  } catch (e) {
                    setError(e instanceof Error ? e.message : "Failed to register pole");
                  } finally {
                    setRegistering(false);
                  }
                }}
                disabled={registering}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {registering ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                Register this Pole
              </button>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
