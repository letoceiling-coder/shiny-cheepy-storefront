import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crmOrders, CrmOrder } from "../data/mock-data";
import { Search, Download } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = crmOrders.filter(o => {
    if (search && !o.number.toLowerCase().includes(search.toLowerCase()) && !o.userName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  });

  const columns: Column<CrmOrder>[] = [
    { key: "number", title: "Номер", render: o => <span className="font-medium text-sm">{o.number}</span> },
    { key: "userName", title: "Клиент" },
    { key: "sellerName", title: "Продавец", className: "hidden lg:table-cell" },
    { key: "total", title: "Сумма", render: o => `${fmt(o.total)} RUB` },
    { key: "status", title: "Статус", render: o => <StatusBadge status={o.status} /> },
    { key: "payment", title: "Оплата", render: o => <StatusBadge status={o.payment} />, className: "hidden md:table-cell" },
    { key: "delivery", title: "Доставка", className: "hidden lg:table-cell" },
    { key: "createdAt", title: "Дата" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Заказы"
        description={`${crmOrders.length} заказов`}
        actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Экспорт</Button>}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по номеру или клиенту..." className="pl-8 h-8 text-sm" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-36 text-sm"><SelectValue placeholder="Статус" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="new">Новые</SelectItem>
            <SelectItem value="confirmed">Подтверждённые</SelectItem>
            <SelectItem value="shipped">Отправленные</SelectItem>
            <SelectItem value="delivered">Доставленные</SelectItem>
            <SelectItem value="cancelled">Отменённые</SelectItem>
            <SelectItem value="refunded">Возвраты</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered} columns={columns} onRowClick={o => navigate(`/crm/orders/${o.id}`)} />
    </div>
  );
}
