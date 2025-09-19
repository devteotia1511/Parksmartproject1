"use client";
import { AppSidebar } from '@/components/app-sidebar'
import { MainHeader } from '@/components/main-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React, { useState, useEffect } from 'react'


const App = () => {
  // State variables to hold form data and UI messages.
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  // A useEffect hook to check the bill amount whenever it changes.
  useEffect(() => {
    const amount = Number(billAmount);
    if (amount >= 4000) {
      setIsContinueEnabled(true);
      setMessage('The customer can avail free parking');
    } else {
      setIsContinueEnabled(false);
      if (amount > 0) {
        const remainingAmount = 4000 - amount;
        setMessage(`The customer still needs to add Rs.${remainingAmount} for free parking`);
      } else {
        setMessage('');
      }
    }
  }, [billAmount]);

  // Handler for the "Continue" button click.
  const handleContinue = () => {
    if (isContinueEnabled) {
      // In a real application, you would add your form submission logic here
      // For example, calling an API to save the customer details.
      console.log('Form submitted successfully!');
    }
  }; 

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
            {label: "Sites", href: "/sites"},
            { label: "Checkout", href: "/checkout" }
          ]}
        />
        
        <div>
          <div className="mt-3 rounded-xl shadow-lg p-6 w-full ">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Customer Checkout</h1>
            <p className="text-gray-500 mb-6">Enter customer details</p>

            {/* Input fields for customer details */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter customer name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter customer phone name"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="billAmount" className="text-sm font-medium text-gray-700 mb-1">Bill amount *</label>
                <input
                  type="number"
                  id="billAmount"
                  placeholder="Enter customer bill amount"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vehicleNumber" className="text-sm font-medium text-gray-700 mb-1">Vehicle number *</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  placeholder="Enter customer vehicle number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="otp" className="text-sm font-medium text-gray-700 mb-1">OTP *</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Message to the customer, based on the bill amount */}
            {message && (
              <div className="mt-4 text-center">
                {isContinueEnabled ? (
                  <p className="text-green-600 text-sm">{message}</p>
                ) : (
                  <p className="text-red-600 text-sm">{message}</p>
                )}
              </div>
            )}

            {/* Continue button, enabled/disabled based on state */}
            <button
              onClick={handleContinue}
              disabled={!isContinueEnabled}
              className={`w-full mt-8 mb-6 py-3 rounded-xl text-lg font-semibold transition-colors duration-200 ${
                isContinueEnabled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
