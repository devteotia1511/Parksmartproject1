import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { MainHeader } from "@/components/main-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  // Hardcoded data for the DataTable component
  const parkingData = [
    { id: "1", location: "Sector 29", status: "Available", spots: 45, occupancy: "65%", lastUpdated: "10 min ago" },
    { id: "2", location: "Cyber City", status: "Busy", spots: 12, occupancy: "92%", lastUpdated: "5 min ago" },
    { id: "3", location: "MG Road", status: "Moderate", spots: 28, occupancy: "70%", lastUpdated: "2 min ago" },
    { id: "4", location: "Sector 14", status: "Available", spots: 50, occupancy: "40%", lastUpdated: "15 min ago" },
    { id: "5", location: "Golf Course Road", status: "Busy", spots: 8, occupancy: "95%", lastUpdated: "1 min ago" },
    { id: "6", location: "Udyog Vihar", status: "Available", spots: 34, occupancy: "55%", lastUpdated: "20 min ago" },
    { id: "7", location: "DLF Phase 1", status: "Busy", spots: 10, occupancy: "97%", lastUpdated: "3 min ago" },
    { id: "8", location: "Sohna Road", status: "Moderate", spots: 22, occupancy: "75%", lastUpdated: "8 min ago" },
    { id: "9", location: "Sector 56", status: "Available", spots: 60, occupancy: "35%", lastUpdated: "12 min ago" },
    { id: "10", location: "Huda City Centre", status: "Busy", spots: 6, occupancy: "98%", lastUpdated: "30 sec ago" },
    { id: "11", location: "Sector 44", status: "Moderate", spots: 25, occupancy: "68%", lastUpdated: "7 min ago" },
    { id: "12", location: "Palam Vihar", status: "Available", spots: 40, occupancy: "50%", lastUpdated: "18 min ago" },
    { id: "13", location: "Sector 21", status: "Busy", spots: 9, occupancy: "93%", lastUpdated: "4 min ago" },
    { id: "14", location: "DLF Phase 3", status: "Moderate", spots: 19, occupancy: "72%", lastUpdated: "6 min ago" },
    { id: "15", location: "Ambience Mall", status: "Available", spots: 55, occupancy: "48%", lastUpdated: "11 min ago" },
  ];

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
            { label: "Dashboard", href: "/dashboard" }
          ]}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              <DataTable data={parkingData}/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
