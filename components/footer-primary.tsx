'use client'

import React, { useState, FormEvent } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type AnimatedUnderlineProps = {
  children: React.ReactNode
  href?: string
  className?: string
}

// Automatically use <Link> for internal links and <a> for external
const AnimatedUnderline = ({ children, href = '/', className }: AnimatedUnderlineProps) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto')

  return isExternal ? (
    <a
      href={href}
      className={`${className} relative overflow-hidden group`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
    </a>
  ) : (
    <Link href={href} className={`${className} relative overflow-hidden group`}>
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
    </Link>
  )
}

export default function FooterPrimary() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('user_email_list').insert([{ email }])
      if (error) throw error

      toast({
        title: 'Subscribed! 🎉',
        description: 'Thank you for subscribing! You’ll get an email when the next live session airs.',
      })
      setEmail('')
    } catch (err) {
      console.error('Error inserting email:', err)
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <footer className="py-10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Web5 Socials */}
          <div>
            <h3 className="mb-4 text-lg font-bold">SOCIALZ</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="https://instagram.com/healxyz" className="text-primary">HEALXYZ INSTAGRAM →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://tiktok.com/@healxyz" className="text-primary">HEALXYZ TIKTOK →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://discord.gg/EunEt7Q68h" className="text-primary">HEALXYZ DISCORD →</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold">HAHZ.LIVE</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="https://orange.hahz.live" className="text-primary">ORANGE. - LIVESTREAM →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://billing.stripe.com/p/login/eVaaH68crfwxf3WbII" className="text-primary">BILLING →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="/blog" className="text-primary">BLOG →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="mailto:hahz5d@pm.me" className="text-primary">EMAIL →</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-lg font-bold">ASK HAHZ</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="https://linkedin.com/in/hahzterry" className="text-primary">LINKEDIN →</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://t.me/hahznft" className="text-primary">TELEGRAM →</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="mb-4 text-lg font-bold">STAY IN THE LOOP</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between pt-6 mt-10 border-t md:flex-row">
          <div className="flex items-center space-x-2">
            <LogInIcon className="w-6 h-6" />
            <span className="text-xl font-bold">HAHZ.LIVE</span>
          </div>
          <p className="mt-4 text-gray-500 md:mt-0">© HAHZ.LIVE 2026</p>
        </div>
      </div>
    </footer>
  )
}

// Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function LogInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}