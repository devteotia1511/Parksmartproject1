"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { AppSidebar } from '@/components/app-sidebar'
import { MainHeader } from '@/components/main-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function BillingPage() {
  const [openMonth, setOpenMonth] = useState(null)

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

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 65)",
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
            { label: "AD - Billing", href: "/ad/billing" }
          ]}
        />
        <div className='flex mx-auto mt-1 font-inter font-bold text-2xl text-gray-600'>
          <h1>- Monthy Invoices -</h1>
        </div>
          <div className="p-6 grid grid-cols-1 gap-6">
          {invoices.map((invoice, index) => (
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
      </SidebarInset>
    </SidebarProvider>
  )
}
