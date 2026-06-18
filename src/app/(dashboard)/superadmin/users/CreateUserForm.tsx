'use client'

import { useState } from 'react'
import { createUser } from '@/actions/superadmin'
import { Plus, X } from 'lucide-react'

interface Props {
  barangays: string[]
}

export default function CreateUserForm({ barangays }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', role: 'USER', city: '', barangay: '', region: '',
  })
  const [creating, setCreating] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setMsg({ type: 'error', text: 'Name, email, and password are required' })
      return
    }
    setCreating(true)
    setMsg(null)
    try {
      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        passwordHash: form.password,
        role: form.role,
        city: form.city || 'N/A',
        barangay: form.barangay || 'N/A',
        region: form.region || 'N/A',
      })
      setForm({ firstName: '', lastName: '', email: '', phone: '', password: '', role: 'USER', city: '', barangay: '', region: '' })
      setMsg({ type: 'success', text: 'User created successfully' })
      setOpen(false)
    } catch (e) {
      setMsg({ type: 'error', text: e instanceof Error ? e.message : 'Failed to create user' })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Create New User</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manually add a new account to the system.</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {open ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
          msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {msg.text}
        </div>
      )}

      {open && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="First Name *"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name *"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="password"
            placeholder="Password *"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="USER">User</option>
            <option value="TECHNICIAN">Technician</option>
            <option value="ADMIN">Admin</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={e => setForm({ ...form, city: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <select
            value={form.barangay}
            onChange={e => setForm({ ...form, barangay: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="">Select Barangay</option>
            {barangays.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Region"
            value={form.region}
            onChange={e => setForm({ ...form, region: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors sm:col-span-2 lg:col-span-3"
          >
            {creating ? 'Creating...' : 'Create User'}
          </button>
        </form>
      )}
    </div>
  )
}
