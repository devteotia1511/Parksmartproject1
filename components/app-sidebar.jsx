"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  IconDashboard,
  IconFolder,
  IconMail,
} from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { IconCirclePlusFilled } from "@tabler/icons-react"
import CampaignForm from "@/components/CampaignForm";

const data = {
  user: {
    name: "Zudio",
    email: "zudio@business.in",
    avatar: "/avatars/profile.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: IconDashboard,
      url: "/dashboard",
      isSingle: true, // This indicates it's a single page, not expandable
    },
    {
      title: "AD",
      icon: IconMail, // Changed to Mail icon to differentiate from Dashboard
      items: [
        { title: "Statistics", url: "/ad/statistics" },
        { title: "Campaigns", url: "/ad/campaigns" },
        { title: "Billing", url: "/ad/billing" },
      ],
    },
    {
      title: "Sites",
      icon: IconFolder,
      items: [
        { title: "Overview", url: "/sites" },
        { title: "Statistics", url: "/sites/statistics" },
        { title: "Checkout", url: "/sites/checkout" },
        { title: "Billing", url: "/sites/billing" },
      ],
    },
  ],
}

const STORAGE_KEY = "appSidebarOpenSections"

export function AppSidebar({ ...props }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = React.useState({})

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (JSON.stringify(parsed) !== JSON.stringify(openSections)) {
          setOpenSections(parsed)
        }
      }
    }
  }, [])

  // Auto-expand active sections based on current pathname
  React.useEffect(() => {
    const newOpenSections = { ...openSections }
    data.navMain.forEach((section) => {
      if (section.items) {
        const sectionPath = `/${section.title.toLowerCase()}`
        const isSectionActive = pathname.startsWith(sectionPath)
        if (isSectionActive && !newOpenSections[section.title]) {
          newOpenSections[section.title] = true
        }
      }
    })
    setOpenSections(newOpenSections)
  }, [pathname])

  // Persist whenever openSections changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections))
    }
  }, [openSections])

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-center h-[50px] px-2">
              <Image
                src="/logo.svg"
                alt="Parksmart Logo"
                width={140}
                height={100}
                className="pointer-events-none"
              />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex justify-center items-center px-4 py-4 mb-4">
          <CampaignForm 
            triggerLabel="Create AD Campaign" 
          />
        </div>

        {/* Thin black separator line */}
        <div className="mx-4 mb-4">
          <hr className="border-t border-black/20" />
        </div>

        <SidebarMenu>
          {data.navMain.map((section) => {
            // Check if current section is active based on pathname
            const sectionPath = section.url || `/${section.title.toLowerCase()}`
            const isSectionActive = section.isSingle 
              ? pathname === section.url
              : pathname.startsWith(`/${section.title.toLowerCase()}`)
            
            // Handle single page items (like Dashboard)
            if (section.isSingle) {
              return (
                <div key={section.title} className={`rounded-lg mx-2 mb-2 ${
                  isSectionActive ? 'bg-[rgba(24,204,105,0.08)] p-1' : ''
                }`}>
                  <Link href={section.url}>
                    <SidebarMenuItem
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg ${
                        isSectionActive 
                          ? 'bg-[rgb(24,204,105)] text-white shadow-md border-2 border-[rgb(24,204,105)]' 
                          : 'hover:bg-[rgba(24,204,105,0.1)] hover:text-black border-2 border-transparent hover:border-[rgba(24,204,105,0.3)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <section.icon className={`w-4 h-4 ${
                          isSectionActive ? 'text-white' : ''
                        }`} />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      {isSectionActive && (
                        <span className="text-white font-bold text-base animate-slide-right">
                          ▶
                        </span>
                      )}
                    </SidebarMenuItem>
                  </Link>
                </div>
              )
            }
            
            // Handle expandable sections (like AD, Sites)
            return (
              <div key={section.title} className={`rounded-lg mx-2 mb-2 ${
                isSectionActive ? 'bg-[rgba(24,204,105,0.08)] p-1' : ''
              }`}>
                <SidebarMenuItem
                  onClick={() => toggleSection(section.title)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg ${
                    isSectionActive 
                      ? 'bg-[rgba(24,204,105,0.3)] text-black shadow-sm border-2 border-[rgba(24,204,105,0.5)]' 
                      : 'hover:bg-[rgba(24,204,105,0.1)] hover:text-black border-2 border-transparent hover:border-[rgba(24,204,105,0.3)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <section.icon className={`w-4 h-4 ${
                      isSectionActive ? 'text-black' : ''
                    }`} />
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    isSectionActive ? 'text-black' : 'text-gray-500'
                  }`}>
                    {openSections[section.title] ? "▾" : "▸"}
                  </span>
                </SidebarMenuItem>

                {openSections[section.title] && section.items &&
                  section.items.map((item) => {
                    const isItemActive = pathname === item.url
                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={`flex items-center justify-between pl-10 pr-4 py-2 text-sm rounded-lg mt-1 transition-all duration-200 relative ${
                          isItemActive
                            ? 'bg-[rgb(24,204,105)] text-white font-bold shadow-md border-2 border-[rgb(24,204,105)] ml-2'
                            : isSectionActive
                              ? 'text-black hover:bg-[rgba(24,204,105,0.2)] font-medium border-2 border-transparent hover:border-[rgba(24,204,105,0.3)]'
                              : 'hover:bg-[rgba(24,204,105,0.1)] hover:text-black border-2 border-transparent hover:border-[rgba(24,204,105,0.2)]'
                        }`}
                      >
                        <span>{item.title}</span>
                        {isItemActive && (
                          <span className="text-white font-bold text-base ml-2 animate-slide-right">
                            ▶
                          </span>
                        )}
                      </Link>
                    )
                  })}
              </div>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}