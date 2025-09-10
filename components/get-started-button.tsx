"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"

export function GetStartedButton() {
  const { user } = useAuth()

  if (user) {
    return (
      <Link href="/dashboard">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold">
          Go to Dashboard
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/login">
      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold">
        Get Started
      </Button>
    </Link>
  )
}
