"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateTimeFilter({ 
  onApply,
  hasActiveFilter = false,
  className 
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(null)
  const [selectedTime, setSelectedTime] = React.useState("")

  const handleApply = () => {
    if (selectedDate) {
      // Combine date and time
      const dateTime = new Date(selectedDate)
      if (selectedTime) {
        const [hours, minutes] = selectedTime.split(':')
        dateTime.setHours(parseInt(hours), parseInt(minutes))
      }
      onApply(dateTime)
    } else {
      onApply(null)
    }
    setIsOpen(false)
  }

  const handleClear = () => {
    setSelectedDate(null)
    setSelectedTime("")
    onApply(null)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          className={cn(
            "relative",
            hasActiveFilter && "border-primary bg-primary/10",
            className
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {hasActiveFilter && (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Time (Optional)</Label>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
