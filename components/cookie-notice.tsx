"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Cookie } from "lucide-react"
import Link from "next/link"

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem("oto-cookies-accepted")
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("oto-cookies-accepted", "true")
    setIsVisible(false)
  }

  const dismissNotice = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 p-4 shadow-lg border-2 z-50 bg-white">
      <div className="flex items-start gap-3">
        <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-2">We use cookies</h3>
          <p className="text-xs text-muted-foreground mb-3">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex gap-2 mb-2">
            <Button onClick={acceptCookies} size="sm" className="text-xs h-7">
              Accept
            </Button>
            <Link href="/cookies">
              <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={dismissNotice} className="h-6 w-6 p-0 hover:bg-gray-100">
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  )
}
