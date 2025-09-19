"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowRight, Search } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState('')

  // Available pages in your app
  const availablePages = [
    { path: '/dashboard', name: 'Dashboard', description: 'Main dashboard with parking locations' },
    { path: '/ad/statistics', name: 'AD Statistics', description: 'Advertising campaign statistics' },
    { path: '/ad/campaigns', name: 'AD Campaigns', description: 'Manage advertising campaigns' },
    { path: '/ad/billing', name: 'AD Billing', description: 'Advertising billing and invoices' },
    { path: '/sites', name: 'Sites Overview', description: 'Business locations overview' },
    { path: '/sites/statistics', name: 'Sites Statistics', description: 'Site performance statistics' },
    { path: '/sites/checkout', name: 'Sites Checkout', description: 'Checkout and payment management' },
    { path: '/sites/billing', name: 'Sites Billing', description: 'Site billing information' },
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.pathname)
    }
  }, [])

  // Simple string similarity function
  const getSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    const editDistance = getEditDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const getEditDistance = (str1, str2) => {
    const matrix = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  // Get suggested pages based on current URL
  const getSuggestedPages = () => {
    if (!currentUrl) return availablePages.slice(0, 3)
    
    return availablePages
      .map(page => ({
        ...page,
        similarity: getSimilarity(currentUrl.toLowerCase(), page.path.toLowerCase())
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
  }

  const suggestedPages = getSuggestedPages()

  const handleGoHome = () => {
    router.push('/dashboard')
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo and Error Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image 
              src="/logo.svg" 
              alt="ParkSmart Logo" 
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-gray-400">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The URL you entered might be incorrect.
            </p>
            {currentUrl && (
              <p className="text-sm text-red-500 font-mono bg-red-50 p-2 rounded border border-red-200 inline-block">
                Requested: {currentUrl}
              </p>
            )}
          </div>
        </div>

        {/* Suggested Pages */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Did you mean to visit one of these pages?
          </h3>
          
          <div className="grid gap-3">
            {suggestedPages.map((page) => (
              <Card key={page.path} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link href={page.path} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 hover:text-[rgb(24,204,105)] transition-colors">
                          {page.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {page.description}
                        </p>
                        <p className="text-xs text-[rgb(24,204,105)] font-mono mt-1">
                          {page.path}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[rgb(24,204,105)] transition-colors" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGoHome} 
            className="bg-[rgb(24,204,105)] hover:bg-[rgb(24,204,105)]/90 text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
          <Button 
            onClick={handleGoBack} 
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            If you're still having trouble, try starting from the dashboard.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Search className="h-3 w-3" />
            <span>All available pages are listed above</span>
          </div>
        </div>
      </div>
    </div>
  )
}