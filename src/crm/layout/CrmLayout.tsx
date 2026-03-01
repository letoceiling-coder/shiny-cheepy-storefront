import { SidebarProvider } from "@/components/ui/sidebar";
import { CrmSidebar } from "./CrmSidebar";
import { CrmTopbar } from "./CrmTopbar";
import { Outlet } from "react-router-dom";
import { RbacProvider } from "../rbac/RbacContext";
import { TenantProvider } from "../tenant/TenantContext";

export function CrmLayout() {
  return (
    <RbacProvider>
      <TenantProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <CrmSidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <CrmTopbar />
              <main className="flex-1 overflow-auto p-4 md:p-6">
                <Outlet />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TenantProvider>
    </RbacProvider>
  );
}
