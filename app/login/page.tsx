"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, this would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, this would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid phone number or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Image src="/logo.svg" alt="Rudzz Logo" width={32} height={32} className="rounded-md" />
        <span className="text-lg font-bold bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
          Rudzz
        </span>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Sign in with Email</CardTitle>
                <CardDescription>Enter your email and password to sign in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleEmailLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button">
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    Facebook
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="phone">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Sign in with Phone</CardTitle>
                <CardDescription>Enter your phone number and password to sign in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handlePhoneLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="phone-password">Password</Label>
                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="phone-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button">
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    Facebook
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

