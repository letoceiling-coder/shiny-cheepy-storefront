import { ReactNode } from "react";
import { useRbac } from "./RbacContext";
import { Permission } from "./types";
import { ShieldAlert } from "lucide-react";

interface PermissionGateProps {
  /** Required permission(s). Pass array for "any of". */
  permission: Permission | Permission[];
  children: ReactNode;
  /** If true, show 403 page instead of hiding */
  showForbidden?: boolean;
  fallback?: ReactNode;
}

export function PermissionGate({ permission, children, showForbidden, fallback }: PermissionGateProps) {
  const { hasPermission, hasAnyPermission } = useRbac();

  const allowed = Array.isArray(permission)
    ? hasAnyPermission(...permission)
    : hasPermission(permission);

  if (allowed) return <>{children}</>;

  if (showForbidden) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-semibold">Доступ запрещён</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            У вашей роли нет разрешений для просмотра этого раздела. Обратитесь к администратору.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono">403 Forbidden</p>
        </div>
      </div>
    );
  }

  return fallback ? <>{fallback}</> : null;
}
