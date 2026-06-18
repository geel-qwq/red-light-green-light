'use client'

import { useState } from 'react'
import { updateSystemSetting, deleteSystemSetting } from '@/actions/superadmin'

interface Props {
  settings: Record<string, string>
  existingBarangays: string[]
}

const SETTING_KEYS = [
  { key: 'city_name', label: 'City Name', placeholder: 'e.g. Manila' },
  { key: 'map_center_lat', label: 'Map Center Latitude', placeholder: 'e.g. 14.5995' },
  { key: 'map_center_lng', label: 'Map Center Longitude', placeholder: 'e.g. 120.9842' },
  { key: 'map_zoom', label: 'Map Zoom Level', placeholder: 'e.g. 12' },
]

export default function SettingsClient({ settings, existingBarangays }: Props) {
  const [barangayInput, setBarangayInput] = useState('')
  const [barangays, setBarangays] = useState<string[]>(existingBarangays)
  const [saving, setSaving] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSave(key: string, value: string) {
    setSaving(key)
    setMsg(null)
    try {
      await updateSystemSetting(key, value)
      setMsg({ type: 'success', text: 'Saved successfully' })
    } catch {
      setMsg({ type: 'error', text: 'Failed to save' })
    } finally {
      setSaving(null)
    }
  }

  async function handleAddBarangay() {
    const b = barangayInput.trim()
    if (!b || barangays.includes(b)) return
    try {
      await updateSystemSetting('barangay_list', JSON.stringify([...barangays, b]))
      setBarangays([...barangays, b])
      setBarangayInput('')
      setMsg({ type: 'success', text: `Added "${b}"` })
    } catch {
      setMsg({ type: 'error', text: 'Failed to add barangay' })
    }
  }

  async function handleRemoveBarangay(b: string) {
    const updated = barangays.filter(x => x !== b)
    try {
      await updateSystemSetting('barangay_list', JSON.stringify(updated))
      setBarangays(updated)
      setMsg({ type: 'success', text: `Removed "${b}"` })
    } catch {
      setMsg({ type: 'error', text: 'Failed to remove barangay' })
    }
  }

  return (
    <div className="space-y-8">
      {msg && (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
          msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {msg.text}
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h2 className="text-base font-bold text-gray-900">General Settings</h2>
        {SETTING_KEYS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue={settings[key] ?? ''}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
              <button
                onClick={(e) => {
                  const input = (e.currentTarget as HTMLButtonElement).previousElementSibling as HTMLInputElement
                  handleSave(key, input.value)
                }}
                disabled={saving === key}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving === key ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Barangay Management */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Barangay List</h2>
        <p className="text-xs text-gray-400">Manage the list of barangays in the system.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={barangayInput}
            onChange={(e) => setBarangayInput(e.target.value)}
            placeholder="Enter barangay name..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddBarangay() }}
          />
          <button
            onClick={handleAddBarangay}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {barangays.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700">
              {b}
              <button onClick={() => handleRemoveBarangay(b)} className="text-gray-400 hover:text-red-500 transition-colors">&times;</button>
            </span>
          ))}
          {barangays.length === 0 && (
            <p className="text-sm text-gray-400">No barangays added yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
