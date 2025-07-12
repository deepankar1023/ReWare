"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, getAuthToken, getUser, removeAuthToken, setUser as setStoredUser } from "@/lib/client-auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = getAuthToken()
    const storedUser = getUser()

    if (token && storedUser) {
      setUser(storedUser)
    }

    setIsLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    setStoredUser(userData)
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      removeAuthToken()
      window.location.href = "/"
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
