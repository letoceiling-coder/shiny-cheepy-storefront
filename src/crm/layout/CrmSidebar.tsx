import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Store,
  BarChart3, Megaphone, MessageSquare, Settings, ArrowLeft, Layers,
  Shield, Truck, CreditCard, Wallet, MapPin, Ticket, Mail, FileText,
  Bell, PackageCheck, Plug,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "Основное",
    items: [
      { title: "Dashboard", url: "/crm", icon: LayoutDashboard, end: true },
      { title: "Контент", url: "/crm/content", icon: Layers },
      { title: "Уведомления", url: "/crm/notifications", icon: Bell },
    ],
  },
  {
    label: "Каталог",
    items: [
      { title: "Товары", url: "/crm/products", icon: Package },
      { title: "Категории", url: "/crm/categories", icon: FolderTree },
      { title: "Модерация", url: "/crm/moderation", icon: Shield },
    ],
  },
  {
    label: "Продажи",
    items: [
      { title: "Заказы", url: "/crm/orders", icon: ShoppingCart },
      { title: "Fulfillment", url: "/crm/fulfillment", icon: PackageCheck },
      { title: "Доставка", url: "/crm/delivery", icon: Truck },
      { title: "Регионы", url: "/crm/regions", icon: MapPin },
    ],
  },
  {
    label: "Финансы",
    items: [
      { title: "Платежи", url: "/crm/payments", icon: CreditCard },
      { title: "Выплаты", url: "/crm/payouts", icon: Wallet },
    ],
  },
  {
    label: "Маркетинг",
    items: [
      { title: "Акции", url: "/crm/promotions", icon: Megaphone },
      { title: "Промокоды", url: "/crm/coupons", icon: Ticket },
      { title: "Рассылки", url: "/crm/marketing", icon: Mail },
      { title: "Шаблоны", url: "/crm/templates", icon: FileText },
    ],
  },
  {
    label: "Пользователи",
    items: [
      { title: "Пользователи", url: "/crm/users", icon: Users },
      { title: "Продавцы", url: "/crm/sellers", icon: Store },
      { title: "Отзывы", url: "/crm/reviews", icon: MessageSquare },
    ],
  },
  {
    label: "Система",
    items: [
      { title: "Аналитика", url: "/crm/analytics", icon: BarChart3 },
      { title: "Интеграции", url: "/crm/integrations", icon: Plug },
      { title: "Настройки", url: "/crm/settings", icon: Settings },
    ],
  },
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
        </SidebarGroup>

        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={'end' in item ? item.end : false}
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
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
