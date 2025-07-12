"use client"

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: string
  points: number
  rating: number
  totalSwaps: number
  successfulSwaps: number
  location?: {
    city: string
    state: string
    country: string
  }
  createdAt: string
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token)
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function removeAuthToken() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function setUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user))
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function isAdmin(): boolean {
  const user = getUser()
  return user?.role === "admin"
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken()

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
}
