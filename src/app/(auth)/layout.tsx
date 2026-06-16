import { Koulen, Instrument_Sans } from 'next/font/google';

const koulenFont = Koulen({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-koulen',
});

const instrumentSansFont = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument',
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className={`${koulenFont.variable} ${instrumentSansFont.variable} min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(30, 58, 138, 0.49) 0%, rgba(30, 58, 138, 0.49) 100%), url(https://i.ibb.co/RkxqkgsH/login.png)`,
        backgroundColor: '#FFF'
      }}
    >
      {children}
      
    </div>
    
  )
}