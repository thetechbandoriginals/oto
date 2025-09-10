import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth-context"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "OTO - Register Your Vehicle & Buy Insurance Instantly | oto.co.ke",
  description:
    "OTO is your one-stop app for Kenyan drivers. Register vehicles, buy affordable insurance covers via Insurepal, view policies in your dashboard, shop spares, and sell cars. Fast, secure, M-Pesa ready.",
  keywords: "vehicle registration Kenya, car insurance, motor insurance, oto app, Insurepal",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans ${manrope.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
