"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import useClientUser from "@/hooks/useClientUser"
import { signOut } from "next-auth/react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = useClientUser();

  const logout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/oto-logo.png" alt="Oto Auto Hub" width={112} height={45} className="h-11 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/help" className="text-foreground hover:text-primary transition-colors">
              Need Help?
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <Button asChild className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  asChild
                  variant="outline"
                  className="text-black border-black hover:bg-black hover:text-white bg-transparent"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/help"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Need Help?
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Button asChild className="bg-primary text-white hover:bg-primary/90 w-fit">
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="text-primary border-primary hover:bg-primary hover:text-white w-fit"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    className="text-black border-black hover:bg-black hover:text-white w-fit bg-transparent"
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="bg-primary text-white hover:bg-primary/90 w-fit">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
