'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { CoolMode } from '@/components/magicui/cool-mode'

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
  const [email, setEmail] = useState<string>('')
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('user_email_list').insert([{ email }])
      if (error) throw error

      toast({
        title: 'Subscribed! 🎉',
        description: 'Thank you for subscribing! You will get an email when the next live session airs.',
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
            <h3 className="mb-4 text-lg font-bold">Web5 Socials</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="https://atl5d.com" className="text-primary">ATL5D</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://luvnft.com" className="text-primary">LUV NFT</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://healxyz.com" className="text-primary">HealXYZ</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://rnt.social" className="text-primary">RNT.SOCIAL</AnimatedUnderline></li>
              <li><AnimatedUnderline href="/socials" className="text-primary">See all →</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="/about" className="text-primary">About</AnimatedUnderline></li>
              <li><AnimatedUnderline href="/documentation" className="text-primary">Documentation</AnimatedUnderline></li>
              <li><AnimatedUnderline href="/blog" className="text-primary">Blog</AnimatedUnderline></li>
              <li><AnimatedUnderline href="mailto:hahz5d@pm.me" className="text-primary">Contact us</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect</h3>
            <ul className="space-y-2">
              <li><AnimatedUnderline href="https://x.com/wizardofhahz" className="text-primary">X</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://linkedin.com/in/hassanterry" className="text-primary">LinkedIn</AnimatedUnderline></li>
              <li><AnimatedUnderline href="https://t.me/hahznft" className="text-primary">Telegram</AnimatedUnderline></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Sign up for our newsletter</h3>
            <p className="mb-4 text-primary">
              HAHZ.LIVE is the future of higher learning. Subscribe to get the latest design news, articles, resources, updates and inspiration.
            </p>
            <form onSubmit={handleSubmit} className="flex w-full">
              <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:outline-none">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="relative z-20 w-full text-sm border-none"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <CoolMode>
                  <Button type="submit" className="my-1 mr-1 text-white bg-black rounded-md">
                    <ArrowRightIcon className="w-5 h-5" />
                  </Button>
                </CoolMode>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between pt-6 mt-10 border-t md:flex-row">
          <div className="flex items-center space-x-2">
            <LogInIcon className="w-6 h-6" />
            <span className="text-xl font-bold">HAHZ.LIVE</span>
          </div>
          <p className="mt-4 text-gray-500 md:mt-0">© HAHZ.LIVE Inc. 2025</p>
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
