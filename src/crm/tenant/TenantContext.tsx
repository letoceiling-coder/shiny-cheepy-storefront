import { createContext, useContext, useState, ReactNode } from "react";
import { Tenant } from "./types";
import { tenants } from "./mock-tenants";

interface TenantContextValue {
  currentTenant: Tenant;
  setTenantById: (id: string) => void;
  allTenants: Tenant[];
}

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState(tenants[0].id);
  const currentTenant = tenants.find((t) => t.id === currentId) || tenants[0];

  return (
    <TenantContext.Provider
      value={{ currentTenant, setTenantById: setCurrentId, allTenants: tenants }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}
