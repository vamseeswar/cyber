
'use client'



import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { Home, ShieldAlert, Video, FlaskConical, Settings, GitGraph, UserCircle, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils'

import { ThemeToggle } from "@/components/theme-toggle";

import { useSession, signOut } from 'next-auth/react';

import { Button } from './ui/button';



const navItems = [

  { href: '/', icon: Home, label: 'Dashboard' },

  { href: '/alerts', icon: ShieldAlert, label: 'Alerts' },

  { href: '/sessions', icon: Video, label: 'Sessions' },

  { href: '/experiments', icon: FlaskConical, label: 'Experiments' },

  { href: '/rules', icon: Settings, label: 'Rules' },

]



export default function Navbar() {

  const pathname = usePathname();

  const { data: session } = useSession();



  return (

    <header id="main-navbar" className="fixed top-0 left-0 right-0 z-50 bg-background border-b">

      <nav className="container mx-auto flex items-center justify-between p-4">

        <Link href="/" className="flex items-center gap-2 font-semibold">

          <GitGraph className="h-6 w-6" />

          <span>VNC Testbed</span>

        </Link>

        <div className="flex items-center gap-2">

          <div className="hidden md:flex items-center gap-4">

            {navItems.map((item) => (

              <Link

                key={item.href}

                href={item.href}

                className={cn(

                  'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground',

                  { 'bg-secondary text-foreground': pathname === item.href }

                )}

              >

                <item.icon className="h-4 w-4" />

                <span>{item.label}</span>

              </Link>

            ))}

          </div>

          <ThemeToggle />

          {session ? (

            <div className="flex items-center gap-4">

              <span className="text-sm font-medium">{session.user?.name}</span>

              <Button variant="ghost" size="icon" onClick={() => signOut()}>

                <LogOut className="h-5 w-5" />

              </Button>

            </div>

          ) : (

            <Link

              href="/auth"

              className={cn(

                'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground',

                { 'bg-secondary text-foreground': pathname === '/auth' }

              )}

            >

              <UserCircle className="h-4 w-4" />

              <span>Login</span>

            </Link>

          )}

          <div className="md:hidden">

            {/* Mobile menu can be added here if needed in the future */}

          </div>

        </div>

      </nav>

    </header>

  )

}


