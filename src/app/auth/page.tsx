
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthPage() {
  const [isSigningUp, setIsSigningUp] = useState(false)

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isSigningUp ? 'Create an Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>
            {isSigningUp ? 'Enter your details to get started.' : 'Sign in to continue to your dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSigningUp && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" required />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          {isSigningUp && (
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          )}
          <Button className="w-full mt-4">{isSigningUp ? 'Sign Up' : 'Sign In'}</Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
            <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full">
                Sign in with Google
            </Button>
            <p className="text-sm text-muted-foreground">
              {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={() => setIsSigningUp(!isSigningUp)} className="font-medium text-primary hover:underline">
                {isSigningUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
