"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, MapPin, CreditCard, Phone } from "lucide-react";
// import { redirect } from "next/dist/server/api-utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"; // Add SidebarInset import
import {AppSidebar} from "@/components/app-sidebar"; // Import AppSidebar
import {MainHeader} from "@/components/main-header"; // Import MainHeader
// import Navbar from "./components/Navbar";

const brands = [
  { 
    name: "Zudio", 
    image: "/zudio.jpg",
    startPrice: "Starting INR 2,000",
    category: "Fashion shop",
    location: "Second floor",
    offer: "Shop for atleast INR 4000 to avail free parking",
    phone: "+91 11111-11111"
  },
  { 
    name: "Max", 
    image: "/Max.jpeg",
    startPrice: "Starting INR 3,500",
    category: "Fashion store",
    location: "Ground floor",
    offer: "Get 10% off on bills over INR 5000",
    phone: "+91 22222-22222"
  },
  { 
    name: "Pantaloons", 
    image: "/Pantlooms.jpg",
    startPrice: "Starting INR 3,000",
    category: "Fashion retail",
    location: "First floor",
    offer: "Free gift voucher on your first purchase",
    phone: "+91 33333-33333"
  },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Generate a 4-digit OTP.
  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(newOtp);
  };

  // Handle a brand click event.
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    generateOtp();
    setOpen(true);
  };

  // Copy the OTP to the clipboard. Note: In a real application, you should use a custom modal instead of alert() for user feedback.
  const copyOtp = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(otp)
        .then(() => console.log("OTP copied to clipboard"))
        .catch(err => console.error("Failed to copy OTP: ", err));
    }
  };

  // The main component renders a gallery of brands and a modal dialog for the OTP.
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
            { label: "Sites", href: "/sites" }
          ]}
        />
        <div className="flex flex-1 flex-col">
                <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
                <div
                key={brand.name}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                onClick={() => handleBrandClick(brand.name)}
                >
                {/* Top section with image and text overlays */}
                <div className="relative">
                    <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-[300px] object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-gray-900/50 to-transparent text-white">
                    <div className="flex justify-between items-start w-full">
                        <span className="text-sm font-semibold p-1 rounded bg-gray-900/40">{brand.startPrice}</span>
                        <span className="text-sm font-semibold p-1 rounded bg-gray-900/40">{brand.category}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        {/* Placeholder dots for image carousel */}
                        <span className="w-2 h-2 rounded-full bg-white/50"></span>
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span className="w-2 h-2 rounded-full bg-white/50"></span>
                        <span className="w-2 h-2 rounded-full bg-white/50"></span>
                    </div>
                    </div>
                </div>
                
                {/* Bottom section with detailed information */}
                <div className="p-4 space-y-3">
                    <h2 className="text-xl font-bold text-gray-800">{brand.name}</h2>
                    <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{brand.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="text-sm">{brand.offer}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{brand.phone}</span>
                    </div>
                </div>
                </div>
            ))}

            {/* OTP Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-col items-center">
                    {/* The logo image is a placeholder and should be replaced with your actual logo. */}
                    <img src="/logo.jpg" alt="Park Smart Logo" width={90} height={45} className="mb-4" />
                    <DialogTitle className="text-center">Your Free Parking OTP</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold border rounded-md px-6 py-2">
                        {otp}
                    </div>
                    <Button variant="outline" size="icon" onClick={copyOtp}>
                        <Copy className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={generateOtp}>
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                    Share this OTP with the store receptionist to verify your free parking eligibility.
                    </p>
                </div>
                </DialogContent>
            </Dialog>
            
            </div>
        </div>  
      </SidebarInset>
    </SidebarProvider>
  );
}
