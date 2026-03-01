import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Store,
  BarChart3, Megaphone, MessageSquare, Settings, ArrowLeft, Layers,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/crm", icon: LayoutDashboard },
  { title: "Контент", url: "/crm/content", icon: Layers },
  { title: "Товары", url: "/crm/products", icon: Package },
  { title: "Категории", url: "/crm/categories", icon: FolderTree },
  { title: "Заказы", url: "/crm/orders", icon: ShoppingCart },
  { title: "Пользователи", url: "/crm/users", icon: Users },
  { title: "Продавцы", url: "/crm/sellers", icon: Store },
  { title: "Аналитика", url: "/crm/analytics", icon: BarChart3 },
  { title: "Промо", url: "/crm/promotions", icon: Megaphone },
  { title: "Отзывы", url: "/crm/reviews", icon: MessageSquare },
  { title: "Настройки", url: "/crm/settings", icon: Settings },
];

export function CrmSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-3 py-2">
            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight text-foreground">CRM</span>
            )}
            {!collapsed && (
              <Link
                to="/"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                На сайт
              </Link>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/crm"}
                      className="hover:bg-accent/10 transition-colors"
                      activeClassName="bg-accent/15 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
