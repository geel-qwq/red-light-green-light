'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      // The callbackUrl redirects the user after successfully logging out
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      <span className="text-base">↪</span> {/* You can change this icon */}
      Logout
    </button>
  )
}