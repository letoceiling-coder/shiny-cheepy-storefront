import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crmUsers, CrmUser } from "../data/mock-data";
import { Search, Download } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = crmUsers.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    return true;
  });

  const columns: Column<CrmUser>[] = [
    { key: "name", title: "Имя", render: u => <span className="font-medium text-sm">{u.name}</span> },
    { key: "email", title: "Email", className: "hidden md:table-cell" },
    { key: "role", title: "Роль", render: u => <span className="text-xs capitalize">{u.role}</span> },
    { key: "status", title: "Статус", render: u => <StatusBadge status={u.status} /> },
    { key: "orders", title: "Заказы" },
    { key: "totalSpent", title: "Потрачено", render: u => `${fmt(u.totalSpent)} RUB`, className: "hidden lg:table-cell" },
    { key: "balance", title: "Баланс", render: u => `${fmt(u.balance)} RUB`, className: "hidden lg:table-cell" },
    { key: "registeredAt", title: "Регистрация", className: "hidden md:table-cell" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Пользователи"
        description={`${crmUsers.length} пользователей`}
        actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Экспорт</Button>}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по имени или email..." className="pl-8 h-8 text-sm" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="h-8 w-32 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все роли</SelectItem>
            <SelectItem value="customer">Покупатели</SelectItem>
            <SelectItem value="seller">Продавцы</SelectItem>
            <SelectItem value="moderator">Модераторы</SelectItem>
            <SelectItem value="admin">Админы</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-32 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="blocked">Заблокированные</SelectItem>
            <SelectItem value="inactive">Неактивные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered.slice(0, 50)} columns={columns} />
      <p className="text-xs text-muted-foreground">Показано {Math.min(50, filtered.length)} из {filtered.length}</p>
    </div>
  );
}
