import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const HomePage = ({ searchParams }: {
  searchParams: Promise<Record<string, string | string[]>>
}) => {
  return (
    <div className="m-4">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarTrigger />
            <span>Job Board</span>
          </SidebarHeader>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}

export default HomePage