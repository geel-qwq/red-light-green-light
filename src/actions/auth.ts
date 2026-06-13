// app/actions/auth.ts
'use server'

import { redirect } from 'next/navigation'

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  // Basic validation
  if (!name || !email || !password) {
    return { error: 'All fields are required.' }
  }

  try {
    // Insert database registration or password hashing logic here
    // e.g., await db.user.create({ data: { name, email, password: hashedPassword } })
    
    console.log('Registering:', { name, email })
  } catch (err) {
    return { error: 'Database error. Failed to register.' }
  }

  // Redirect on success
  redirect('/login')
}
