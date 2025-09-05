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
      title: "AD",
      icon: IconDashboard,
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
            <div className="flex items-center justify-start h-[50px] px-2">
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
        <SidebarMenuItem className="flex items-center gap-2">
          <CampaignForm triggerLabel="Create AD Campaign" />
          <Button
            size="icon"
            className="size-8 mr-2 group-data-[collapsible=icon]:opacity-0"
            variant="outline">
            <IconMail />
            <span className="sr-only">Inbox</span>
          </Button>
        </SidebarMenuItem>

        <SidebarMenu>
          {data.navMain.map((section) => (
            <div key={section.title}>
              <SidebarMenuItem
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-green-100"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </div>
                <span>{openSections[section.title] ? "▾" : "▸"}</span>
              </SidebarMenuItem>

              {openSections[section.title] &&
                section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="block pl-10 pr-4 py-2 text-sm rounded hover:bg-primary hover:text-white hover:underline"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}