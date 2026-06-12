'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-[90.2vw] max-w-481.75 h-[92.8vh] max-h-270 bg-white/83 border-2 border-white rounded-[29px] shadow-[0_0_9.9px_6px_rgba(0,0,0,0.25)] p-8">
      <div className="mb-10">
        <h1
          className="w-full max-w-118 mx-auto font-['Koulen'] text-[86px] font-normal text-brand-blue text-center select-none"
          style={{
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: '#1E3A8A',
          }}
        >
          il<span className="text-[#F4D35E]">lumen</span>ate
        </h1>
        <p className="text-center font-['Instrument_Sans'] text-[38px] font-normal leading-normal text-brand-blue">
          Login
        </p>
        
      </div>
      

      <form onSubmit={handleSubmit} className="space-y-12" >
        <div className="flex flex-col justify-center gap-2 w-[480.716px] h-[83.307px]">
          <label className="text-brand-blue font-['Instrument_Sans'] text-[20px] font-normal leading-[122.098%]">
            Login with Email / Phone Number
          </label>

          <input
            name="email"
            type="email"
            required
            placeholder="Enter email / phone number"
            defaultValue="admin@lgu.gov.ph"
            className="w-[86.07vw] h-[7.23vh] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray px-6 focus:outline-none shrink-0"
          />
        </div>

        <div className="flex flex-col justify-center gap-2 w-[863.399px] h-[83.307px]">
          <label className="text-brand-blue font-['Instrument_Sans'] text-[20px] font-normal leading-[122.098%]">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="Enter password"
            defaultValue="admin123"
            className="w-[86.07vw] h-[7.23vh] bg-[#FFF] border-2 border-brand-blue rounded-[18px] shadow-[0_0_9.9px_0.5px_rgba(0,0,0,0.25)] text-black font-['Instrument_Sans'] text-[14px] font-normal leading-[122.098%] placeholder:text-brand-gray px-6 focus:outline-none shrink-0"
          />
        </div>

        <label className="flex items-center gap-1.5 cursor-pointer select-none -mt-10">
          <input type="checkbox" className="sr-only"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" fill="#FFFBFB" />
            <rect x="0.5" y="0.5" width="25" height="25" rx="5.5" stroke="#1E3A8A" />
          </svg>
          <p className="font-['Instrument_Sans'] text-[15px] text-brand-blue">
            Remember Me
          </p>
          <p className="inline font-['Instrument_Sans'] text-[15px] text-brand-goldenrod underline text-right ml-auto">
            Forgot Password?
          </p>
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <label className="mb-3 -mt-0.5 flex items-center gap-1.5">
          <input type="button" className="none"/>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-blue text-white py-2 rounded-[18px] text-[17px] font-['Instrument_Sans'] hover:bg-brand-royal-blue cursor-pointer disabled:opacity-50 transition-discrete"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        </label>

        <label className="text-center font-['Instrument_Sans'] text-[38px] font-normal leading-normal text-brand-blue -mt-10">
          <p className="font-['Instrument_Sans'] text-[15px] text-brand-blue text-center">
            Dont have an account? <span className="text-brand-goldenrod underline cursor-pointer">Register</span>
          </p>
        </label>
      </form>

      <p className="m-11 text-xs text-gray-400">
        Demo: admin@lgu.gov.ph / admin123
      </p>
    </div>
  )
}
