"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, Filter } from "lucide-react"
import { AppSidebar } from '@/components/app-sidebar'
import { MainHeader } from '@/components/main-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { DateTimeFilter } from "@/components/ui/date-picker"

export default function BillingPage() {
  const [openMonth, setOpenMonth] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(null)
  const [amountFilter, setAmountFilter] = useState(15000) // Max amount filter
  const [dateTimeFilter, setDateTimeFilter] = useState(null) // Date time filter
  
  // Filter UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPanel, setSelectedPanel] = useState('status')
  const [tempStatusFilter, setTempStatusFilter] = useState(statusFilter)
  const [tempAmountFilter, setTempAmountFilter] = useState(amountFilter)

  const toggleMonth = (month) => {
    setOpenMonth(openMonth === month ? null : month)
  }

  const invoices = [
    {
      month: "April 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5000, amount: 100 },
        { name: "Customer", spent: 7000, amount: 80 },
      ],
      total: 8000,
    },
    {
      month: "May 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5200, amount: 105 },
        { name: "Customer", spent: 6800, amount: 78 },
      ],
      total: 8400,
    },
    {
      month: "June 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5300, amount: 106 },
        { name: "Customer", spent: 6900, amount: 79 },
      ],
      total: 8600,
    },
    {
      month: "July 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5400, amount: 108 },
        { name: "Customer", spent: 7100, amount: 81 },
      ],
      total: 8900,
    },
    {
      month: "August 2024",
      status: "Unpaid",
      due: "16th August 2024",
      details: [
        { name: "Rohan Singh", spent: 5500, amount: 110 },
        { name: "Customer", spent: 7000, amount: 80 },
        { name: "Rohan Singh", spent: 5200, amount: 104 },
      ],
      total: 9700,
    },
    {
      month: "September 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5600, amount: 112 },
        { name: "Customer", spent: 7200, amount: 82 },
      ],
      total: 9800,
    },
    {
      month: "October 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5700, amount: 114 },
        { name: "Customer", spent: 7300, amount: 83 },
      ],
      total: 10000,
    },
    {
      month: "November 2024",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 5800, amount: 116 },
        { name: "Customer", spent: 7400, amount: 84 },
      ],
      total: 10200,
    },
    {
      month: "December 2024",
      status: "Unpaid",
      due: "16th December 2024",
      details: [
        { name: "Rohan Singh", spent: 5900, amount: 118 },
        { name: "Customer", spent: 7500, amount: 85 },
        { name: "Rohan Singh", spent: 5300, amount: 106 },
      ],
      total: 10700,
    },
    {
      month: "January 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6000, amount: 120 },
        { name: "Customer", spent: 7600, amount: 86 },
      ],
      total: 11000,
    },
    {
      month: "February 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6100, amount: 122 },
        { name: "Customer", spent: 7700, amount: 87 },
      ],
      total: 11200,
    },
    {
      month: "March 2025",
      status: "Unpaid",
      due: "16th March 2025",
      details: [
        { name: "Rohan Singh", spent: 6200, amount: 124 },
        { name: "Customer", spent: 7800, amount: 88 },
        { name: "Rohan Singh", spent: 5400, amount: 108 },
      ],
      total: 11900,
    },
    {
      month: "April 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6300, amount: 126 },
        { name: "Customer", spent: 7900, amount: 89 },
      ],
      total: 12200,
    },
    {
      month: "May 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6400, amount: 128 },
        { name: "Customer", spent: 8000, amount: 90 },
      ],
      total: 12400,
    },
    {
      month: "June 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6500, amount: 130 },
        { name: "Customer", spent: 8100, amount: 91 },
      ],
      total: 12600,
    },
    {
      month: "July 2025",
      status: "Paid",
      details: [
        { name: "Rohan Singh", spent: 6600, amount: 132 },
        { name: "Customer", spent: 8200, amount: 92 },
      ],
      total: 12800,
    },
    {
      month: "August 2025",
      status: "Unpaid",
      due: "16th August 2025",
      details: [
        { name: "Rohan Singh", spent: 6700, amount: 134 },
        { name: "Customer", spent: 8300, amount: 93 },
        { name: "Rohan Singh", spent: 5500, amount: 110 },
      ],
      total: 12800,
    },
  ]

  // Calculate max amount for slider
  const maxAmount = Math.max(...invoices.map(inv => inv.total), 15000)
  
  // Filter state management
  const hasActiveFilters = statusFilter || (amountFilter && amountFilter < maxAmount)
  
  // Reset temp filters when opening
  useEffect(() => {
    if (isFilterOpen) {
      setTempStatusFilter(statusFilter)
      setTempAmountFilter(amountFilter)
    }
  }, [isFilterOpen, statusFilter, amountFilter])
  
  const clearAllFilters = () => {
    setTempStatusFilter(null)
    setTempAmountFilter(maxAmount)
  }
  
  const applyFilters = () => {
    setStatusFilter(tempStatusFilter)
    setAmountFilter(tempAmountFilter)
    setIsFilterOpen(false)
  }

  // Filter functionality
  const filteredInvoices = invoices.filter(invoice => {
    // Search by month or customer names
    const matchesSearch = searchTerm === "" || 
      invoice.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.details.some(detail => 
        detail.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    
    // Filter by status
    const matchesStatus = !statusFilter || invoice.status === statusFilter
    
    // Filter by amount
    const matchesAmount = invoice.total <= amountFilter
    
    // Filter by date time
    let matchesDateTime = true
    if (dateTimeFilter) {
      const filterDate = new Date(dateTimeFilter)
      const invoiceDate = new Date(invoice.month + " 1, 2024")
      const isSameMonth = filterDate.getMonth() === invoiceDate.getMonth() && 
                          filterDate.getFullYear() === invoiceDate.getFullYear()
      matchesDateTime = isSameMonth
    }
    
    return matchesSearch && matchesStatus && matchesAmount && matchesDateTime
  })

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 10)"
        }
      }
      >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <MainHeader
          user={{ 
            name: "Zudio", 
            email: "zudio@business.in", 
            avatar: "/avatars/profile.jpg"
          }}
          breadcrumbs={[
            {label: "Ad"},
            { label: "Billing", href: "/billing" }
          ]}
        />
        <div className="p-6">
          <div className="flex items-center mb-6 gap-4">
            {/* Title on the left */}
            <div className='font-inter font-bold text-xl text-gray-600 flex-shrink-0'>
              <h1>Monthly Invoices ({filteredInvoices.length})</h1>
            </div>
            
            {/* Search bar and filters */}
            <div className="flex-1 flex items-center justify-center gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Month or Customer Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              {/* Date Time Filter */}
              <DateTimeFilter
                onApply={setDateTimeFilter}
                hasActiveFilter={!!dateTimeFilter}
              />
            </div>
            
            {/* Filter button on the right */}
            <div className="flex-shrink-0">
              <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {hasActiveFilters && (
                      <Badge className="ml-2 px-1 py-0 text-xs h-4 min-w-4 bg-blue-500">
                        {(statusFilter ? 1 : 0) + (amountFilter && amountFilter < maxAmount ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96">
                  <>
                    <div className="flex h-80">
                      {/* Left Panel - Filter Categories */}
                      <div className="w-32 border-r border-gray-200 bg-gray-50">
                        <div className="p-2 space-y-1">
                          <Button
                            variant={selectedPanel === 'status' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedPanel('status')}
                            className="w-full justify-start text-sm"
                          >
                            Status
                          </Button>
                          <Button
                            variant={selectedPanel === 'amount' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedPanel('amount')}
                            className="w-full justify-start text-sm"
                          >
                            Amount
                          </Button>
                        </div>
                      </div>

                      {/* Right Panel - Filter Options */}
                      <div className="flex-1 p-4">
                        {selectedPanel === 'status' && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Filter by Status</h4>
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="tempStatus"
                                  checked={!tempStatusFilter}
                                  onChange={() => setTempStatusFilter(null)}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">All Invoices</span>
                              </label>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="tempStatus"
                                  checked={tempStatusFilter === 'Paid'}
                                  onChange={() => setTempStatusFilter('Paid')}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">Paid Only</span>
                              </label>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="tempStatus"
                                  checked={tempStatusFilter === 'Unpaid'}
                                  onChange={() => setTempStatusFilter('Unpaid')}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">Unpaid Only</span>
                              </label>
                            </div>
                          </div>
                        )}

                        {selectedPanel === 'amount' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-gray-700">Filter by Amount</h4>
                            <div className="space-y-4">
                              <div className="px-2">
                                <Slider
                                  value={[tempAmountFilter]}
                                  onValueChange={(value) => setTempAmountFilter(value[0])}
                                  max={maxAmount}
                                  min={0}
                                  step={100}
                                  className="w-full"
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>₹0</span>
                                <span className="font-medium text-gray-700">
                                  ≤ ₹{tempAmountFilter.toLocaleString()}
                                </span>
                                <span>₹{maxAmount.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Show invoices with amount ≤ ₹{tempAmountFilter.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="text-xs"
                      >
                        Clear All
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setIsFilterOpen(false)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={applyFilters}
                          className="text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          
          
          <div className="grid grid-cols-1 gap-6">
          {filteredInvoices.map((invoice, index) => (
            <div key={index} className="shadow-sm border rounded-2xl bg-white">
              <div
                className="flex justify-between items-center cursor-pointer p-6"
                onClick={() => toggleMonth(invoice.month)}
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <span className="text-lg font-semibold">Invoice history for {invoice.month}</span>
                  <span
                    className={`ml-auto px-3 py-1 flex justify-center items-center text-sm rounded-full ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {invoice.status}
                  </span>
                  <ChevronDown
                    className={`ml-2 h-5 w-5 transition-transform ${
                      openMonth === invoice.month ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {openMonth === invoice.month && (
                <div className="p-6 space-y-4">
                  {invoice.due && (
                    <p className="text-sm text-red-600">
                      Due date - {invoice.due}
                    </p>
                  )}

                  {invoice.details.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Customer spent - INR {item.spent}
                        </p>
                      </div>
                      <p className="font-semibold">INR {item.amount}</p>
                    </div>
                  ))}

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>INR {invoice.total}</span>
                  </div>

                  <Button
                    variant="link"
                    className="text-green-600 hover:text-green-700 p-0"
                  >
                    Download full history →
                  </Button>

                  {invoice.status === "Unpaid" && (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Proceed to payment
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
