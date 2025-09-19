"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const authStatus = localStorage.getItem('auth')
      const userData = localStorage.getItem('userData')
      
      if (authStatus === 'true' && userData) {
        setIsAuthenticated(true)
        setUser(JSON.parse(userData))
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (email, password) => {
    // Your existing login logic
    if (email === "business@name.com" && password === "12345") {
      const userData = {
        email: email,
        name: "Zudio Business",
        loginTime: new Date().toISOString()
      }
      
      localStorage.setItem('auth', 'true')
      localStorage.setItem('userData', JSON.stringify(userData))
      
      setIsAuthenticated(true)
      setUser(userData)
      
      router.push('/dashboard')
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    // Show confirmation alert
    const confirmed = window.confirm(
      'Are you sure you want to logout?\n\nYou will be redirected to the login page.'
    )
    
    if (confirmed) {
      localStorage.removeItem('auth')
      localStorage.removeItem('userData')
      setIsAuthenticated(false)
      setUser(null)
      router.push('/login')
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
