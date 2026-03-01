import { Search, Bell, User, Shield, Building2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRbac } from "../rbac/RbacContext";
import { useTenant } from "../tenant/TenantContext";
import { Badge } from "@/components/ui/badge";

export function CrmTopbar() {
  const { currentRole, setRole, allRoles, currentUser } = useRbac();
  const { currentTenant, setTenantById, allTenants } = useTenant();

  return (
    <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        {/* Tenant Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 h-8 text-sm">
              <span className="text-base">{currentTenant.logo}</span>
              <span className="hidden sm:inline">{currentTenant.name}</span>
              <Building2 className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Маркетплейс</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allTenants.map((t) => (
              <DropdownMenuItem
                key={t.id}
                onClick={() => setTenantById(t.id)}
                className={t.id === currentTenant.id ? "bg-accent/15" : ""}
              >
                <span className="mr-2">{t.logo}</span>
                <span className="flex-1">{t.name}</span>
                {t.id === currentTenant.id && <span className="text-primary text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Поиск..." className="pl-8 h-8 text-sm bg-muted/50 border-0" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Role Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs">
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{currentRole}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Симуляция роли</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allRoles.map((r) => (
              <DropdownMenuItem
                key={r}
                onClick={() => setRole(r)}
                className={r === currentRole ? "bg-accent/15" : ""}
              >
                <span className="flex-1 text-sm">{r}</span>
                {r === currentRole && <span className="text-primary text-xs">✓</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-medium">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="px-3 py-2 text-sm font-medium">Уведомления</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2">
              <span className="text-sm">Новый заказ ORD-2025-0098</span>
              <span className="text-xs text-muted-foreground">2 мин назад</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2">
              <span className="text-sm">Продавец Fashion Hub подал документы</span>
              <span className="text-xs text-muted-foreground">15 мин назад</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2">
              <span className="text-sm">Жалоба на отзыв R0012</span>
              <span className="text-xs text-muted-foreground">1 час назад</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 h-8">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm hidden sm:inline">{currentUser.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
