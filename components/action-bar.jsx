"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { DateTimeFilter } from "@/components/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function ActionBar({ 
  searchPlaceholder = "Search...", 
  searchValue = "", 
  onSearchChange,
  // Date time filter props
  dateTimeFilter,
  onDateTimeFilterChange,
  showDateTimeFilter = false,
  // Advanced filter props
  statusFilter,
  onStatusFilterChange,
  spendFilter,
  onSpendFilterChange,
  maxSpend = 10000, // Maximum spend value for slider
  // Customization props
  compactMode = false, // For inline layouts
  filterSections = ['status', 'spend'], // Which sections to show in filter
  statusOptions = ['Active', 'Paused'], // Customize status options
  spendLabel = 'Spend', // Label for spend section
  // Legacy filter props (for backward compatibility)
  filterOptions = [],
  onFilterSelect,
  actionButtonLabel,
  onActionClick,
  ActionComponent // For more complex action components like forms
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [selectedPanel, setSelectedPanel] = React.useState('status') // 'status' or 'spend'
  
  // Temporary filter states (not applied until "Apply" is clicked)
  const [tempStatusFilter, setTempStatusFilter] = React.useState(statusFilter)
  const [tempSpendFilter, setTempSpendFilter] = React.useState(spendFilter || maxSpend)
  
  // Check if we're using advanced filters
  const useAdvancedFilters = onStatusFilterChange || onSpendFilterChange
  
  const hasActiveFilters = statusFilter || (spendFilter && spendFilter < maxSpend) || dateTimeFilter
  
  // Reset temp filters when opening
  React.useEffect(() => {
    if (isFilterOpen) {
      setTempStatusFilter(statusFilter)
      setTempSpendFilter(spendFilter || maxSpend)
    }
  }, [isFilterOpen, statusFilter, spendFilter, maxSpend])
  
  const clearAllFilters = () => {
    setTempStatusFilter(null)
    setTempSpendFilter(maxSpend)
  }
  
  const applyFilters = () => {
    onStatusFilterChange?.(tempStatusFilter)
    onSpendFilterChange?.(tempSpendFilter)
    setIsFilterOpen(false)
  }

  return (
    <div className={compactMode ? "flex items-center gap-4" : "flex items-center justify-between gap-4 mb-6"}>
      <div className={compactMode ? "flex items-center gap-2" : "flex items-center gap-2 flex-1 max-w-md"}>
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Date Time Filter */}
        {showDateTimeFilter && (
          <DateTimeFilter
            onApply={onDateTimeFilterChange}
            hasActiveFilter={!!dateTimeFilter}
          />
        )}

        {/* Filter Button */}
        {(useAdvancedFilters || filterOptions.length > 0) && (
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {hasActiveFilters && (
                  <Badge className="ml-2 px-1 py-0 text-xs h-4 min-w-4 bg-blue-500">
                    {(statusFilter ? 1 : 0) + (spendFilter && spendFilter < maxSpend ? 1 : 0) + (dateTimeFilter ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-96">
              {useAdvancedFilters ? (
                <>
                  <div className="flex h-80">
                    {/* Left Panel - Filter Categories */}
                    <div className="w-32 border-r border-gray-200 bg-gray-50">
                      <div className="p-2 space-y-1">
                        {filterSections.includes('status') && (
                          <Button
                            variant={selectedPanel === 'status' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedPanel('status')}
                            className="w-full justify-start text-sm"
                          >
                            Status
                          </Button>
                        )}
                        {filterSections.includes('spend') && (
                          <Button
                            variant={selectedPanel === 'spend' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedPanel('spend')}
                            className="w-full justify-start text-sm"
                          >
                            {spendLabel}
                          </Button>
                        )}
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
                              <span className="text-sm">All Campaigns</span>
                            </label>
                            {statusOptions.map((option) => (
                              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="tempStatus"
                                  checked={tempStatusFilter === option}
                                  onChange={() => setTempStatusFilter(option)}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">{option} Only</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedPanel === 'spend' && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-gray-700">Filter by {spendLabel}</h4>
                          <div className="space-y-4">
                            <div className="px-2">
                              <Slider
                                value={[tempSpendFilter]}
                                onValueChange={(value) => setTempSpendFilter(value[0])}
                                max={maxSpend}
                                min={0}
                                step={100}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>₹0</span>
                              <span className="font-medium text-gray-700">
                                ≤ ₹{tempSpendFilter.toLocaleString()}
                              </span>
                              <span>₹{maxSpend.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              Show campaigns with spending ≤ ₹{tempSpendFilter.toLocaleString()}
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
              ) : (
                // Legacy filter options
                <>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filterOptions.map((option, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => onFilterSelect?.(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Action Button or Component */}
      <div className="flex-shrink-0">
        {ActionComponent ? (
          <ActionComponent />
        ) : actionButtonLabel ? (
          <Button onClick={onActionClick}>
            {actionButtonLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
