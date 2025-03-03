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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [userType, setUserType] = useState("customer")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, this would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
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

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to get started with Rudzz</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup defaultValue="customer" className="flex space-x-4" onValueChange={setUserType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="provider" id="provider" />
                      <Label htmlFor="provider">Service Provider</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>

                <Tabs defaultValue="email" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>

                {userType === "provider" && (
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" required />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              By clicking create account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

