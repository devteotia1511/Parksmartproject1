
import { AppSidebar } from '@/components/app-sidebar'
import { MainHeader } from '@/components/main-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
// import { LineChart } from 'recharts';
import {ChartLineDots} from '@/components/chart-line-dots'
import {ChartPieInteractive} from '@/components/chart-pie-interactive'
import { SectionCards } from '@/components/section-cards';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
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
            { label: "Statistics", href: "/ad/statistics" }
          ]}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="space-y-6">
              {/* KPI Cards */}
                <SectionCards />
              {/* Charts Section */}
              <div className="grid grid-cols-3 lg:grid-cols-3 w-full gap-6 mx-4 my-3">
                <div className="col-span-2 lg:col-span-2 space-y-6">
                  <ChartPieInteractive />
                  <ChartLineDots />
                </div>

                {/* Right Column - Breakdown Charts */}
                <div className="lg:col-span-1 space-y-6 mr-8">
                  {/* Impressions by Location */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-serif font-semibold text-gray-600 mb-4">Impressions by location</h3>
                    <div className="space-y-4 font-serif">
                      {[
                        { location: "Bangalore", impressions: 32000, color: "bg-blue-300", width: "w-24" },
                        { location: "Noida", impressions: 30000, color: "bg-green-300", width: "w-24" },
                        { location: "Mumbai", impressions: 22000, color: "bg-gray-800", width: "w-20" },
                        { location: "Delhi", impressions: 18000, color: "bg-green-300", width: "w-16" },
                        { location: "Pune", impressions: 14000, color: "bg-blue-300", width: "w-14" },
                        { location: "Other", impressions: 12000, color: "bg-green-300", width: "w-12" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 min-w-[80px]">{item.location}</span>
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`h-3 rounded ${item.color} ${item.width}`}></div>
                            <span className="text-sm font-medium text-gray-800 min-w-[60px] text-right">{item.impressions.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impressions by Device */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-serif font-semibold text-gray-600 mb-4">Impressions by Device</h3>
                    <div className="space-y-4 font-serif">
                      {[
                        { device: "Android", impressions: 32000, color: "bg-green-300", width: "w-24" },
                        { device: "iOS", impressions: 18000, color: "bg-green-300", width: "w-16" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 min-w-[80px]">{item.device}</span>
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`h-3 rounded ${item.color} ${item.width}`}></div>
                            <span className="text-sm font-medium text-gray-800 min-w-[60px] text-right">{item.impressions.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clicks by Location */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-serif font-semibold text-gray-600 mb-4">Clicks by location</h3>
                    <div className="space-y-4 font-serif">
                      {[
                        { location: "Bangalore", clicks: 32000, color: "bg-blue-300", width: "w-24" },
                        { location: "Noida", clicks: 30000, color: "bg-green-300", width: "w-24" },
                        { location: "Mumbai", clicks: 22000, color: "bg-gray-800", width: "w-20" },
                        { location: "Delhi", clicks: 18000, color: "bg-green-300", width: "w-16" },
                        { location: "Pune", clicks: 14000, color: "bg-blue-300", width: "w-14" },
                        { location: "Other", clicks: 12000, color: "bg-green-300", width: "w-12" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 min-w-[80px]">{item.location}</span>
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`h-3 rounded ${item.color} ${item.width}`}></div>
                            <span className="text-sm font-medium text-gray-800 min-w-[60px] text-right">{item.clicks.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clicks by Device */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="text-lg font-serif font-semibold text-gray-600 mb-4">Clicks by Device</h3>
                    <div className="space-y-4 font-serif">
                      {[
                        { device: "Android", clicks: 32000, color: "bg-green-300", width: "w-24" },
                        { device: "iOS", clicks: 18000, color: "bg-green-300", width: "w-16" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 min-w-[80px]">{item.device}</span>
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`h-3 rounded ${item.color} ${item.width}`}></div>
                            <span className="text-sm font-medium text-gray-800 min-w-[60px] text-right">{item.clicks.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </ProtectedRoute>
  );
}

export default page
