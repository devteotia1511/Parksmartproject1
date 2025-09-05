"use client"

import React, { useState, useRef, useEffect } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { IconSearch, IconFilter, IconChevronDown } from "@tabler/icons-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Calendar20 from "@/components/calendar-20.jsx"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export function MainHeader({ user = { name: "User", email: "user@example.com", avatar: "" }, breadcrumbs = [] }) {
  const [selectedDate, setSelectedDate] = useState(null) // to store selected date
  const [calendarOpen, setCalendarOpen] = useState(false) // toggle calendar visibility
  const calendarRef = useRef(null)

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
        <div className="flex w-full items-center justify-between">
          
          {/* Left side - Sidebar toggle and Filter dropdown */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <IconFilter className="h-4 w-4" />
                  <span>Filter</span>
                  <IconChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-64 p-2">
                <DropdownMenuItem>All Items</DropdownMenuItem>
                <DropdownMenuItem>Recent Items</DropdownMenuItem>
                <DropdownMenuItem>Popular Items</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Custom Filter...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Calendar Button */}
          <div className="relative" ref={calendarRef}>
            <Button onClick={() => setCalendarOpen(!calendarOpen)} variant='outline' className='bg-white'><CalendarIcon className="h-2 w-2 text-black"/></Button>
            {calendarOpen && (
              <div className="absolute mt-2 z-50">
                <Calendar20 selected={selectedDate} onChange={setSelectedDate} />
              </div>
            )}
          </div>
          
          {/* Center - Search bar */}
          <div className="hidden sm:flex w-full max-w-md mx-4">
            <div className="relative w-full">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full pl-8 bg-background" />
            </div>
          </div>
          
          {/* Right side - Profile dropdown */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-10 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:grid text-left text-sm leading-tight">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                  </div>
                  <IconChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-muted-foreground text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Breadcrumb - no border lines */}
      <div className="px-4 py-2 lg:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}