import { useParams, Link } from "react-router-dom";
import { crmUsers } from "../data/mock-data";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Ban, Unlock } from "lucide-react";
import { PermissionGate } from "../rbac/PermissionGate";

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function CrmUserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = crmUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Пользователь не найден</h2>
          <Link to="/crm/users" className="text-sm text-primary hover:underline">← Вернуться к пользователям</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/crm/users">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader
          title={user.name}
          description={`ID: ${user.id} · ${user.email}`}
          actions={<StatusBadge status={user.status} />}
        />
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Профиль</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="finance">Финансы</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Контактные данные</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                <p><span className="text-muted-foreground">Телефон:</span> {user.phone}</p>
                <p><span className="text-muted-foreground">Роль:</span> <span className="capitalize">{user.role}</span></p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Регистрация</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Дата:</span> {user.registeredAt}</p>
                <p><span className="text-muted-foreground">Последняя активность:</span> {user.lastActive}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <p className="text-3xl font-semibold">{user.orders}</p>
            <p className="text-sm text-muted-foreground mt-1">Заказов оформлено</p>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-2xl font-semibold">{fmt(user.totalSpent)}</p>
              <p className="text-xs text-muted-foreground">Потрачено (RUB)</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-2xl font-semibold">{fmt(user.balance)}</p>
              <p className="text-xs text-muted-foreground">Баланс (RUB)</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Регистрация</span>
              <span className="text-xs text-muted-foreground ml-auto">{user.registeredAt}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Последняя активность</span>
              <span className="text-xs text-muted-foreground ml-auto">{user.lastActive}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border -mx-4 md:-mx-6 px-4 md:px-6 py-3 flex items-center gap-2 justify-end">
        <PermissionGate permission="users.manage">
          {user.status === "blocked" ? (
            <Button size="sm" className="gap-1.5"><Unlock className="h-3.5 w-3.5" /> Разблокировать</Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive"><Ban className="h-3.5 w-3.5" /> Заблокировать</Button>
          )}
        </PermissionGate>
      </div>
    </div>
  );
}
