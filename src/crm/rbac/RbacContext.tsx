import { createContext, useContext, useState, ReactNode } from "react";
import { AppRole, Permission, ROLE_PERMISSIONS, RbacUser, APP_ROLES } from "./types";

interface RbacContextValue {
  currentUser: RbacUser;
  currentRole: AppRole;
  setRole: (role: AppRole) => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (...permissions: Permission[]) => boolean;
  allRoles: readonly AppRole[];
}

const defaultUser: RbacUser = {
  id: "admin-001",
  name: "Администратор",
  email: "admin@cheepy.ru",
  role: "SuperAdmin",
};

const RbacContext = createContext<RbacContextValue | null>(null);

export function RbacProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AppRole>("SuperAdmin");

  const currentUser: RbacUser = { ...defaultUser, role };

  const hasPermission = (permission: Permission) =>
    ROLE_PERMISSIONS[role].includes(permission);

  const hasAnyPermission = (...permissions: Permission[]) =>
    permissions.some((p) => ROLE_PERMISSIONS[role].includes(p));

  return (
    <RbacContext.Provider
      value={{ currentUser, currentRole: role, setRole, hasPermission, hasAnyPermission, allRoles: APP_ROLES }}
    >
      {children}
    </RbacContext.Provider>
  );
}

export function useRbac() {
  const ctx = useContext(RbacContext);
  if (!ctx) throw new Error("useRbac must be used within RbacProvider");
  return ctx;
}
