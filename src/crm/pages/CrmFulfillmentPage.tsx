import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fulfillmentOrders, fulfillmentStats, FulfillmentOrder } from "../mock/fulfillment";
import { fmt } from "../mock/helpers";
import { Search, Package, Truck, CheckCircle, RotateCcw, Clock } from "lucide-react";

export default function CrmFulfillmentPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = fulfillmentOrders.filter(o => {
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    return true;
  });

  const columns: Column<FulfillmentOrder>[] = [
    { key: "id", title: "ID", className: "w-28", render: o => <span className="font-mono text-xs">{o.id}</span> },
    { key: "orderId", title: "Заказ", render: o => <span className="font-mono text-xs">{o.orderId}</span> },
    { key: "customer", title: "Клиент" },
    { key: "seller", title: "Продавец", className: "hidden lg:table-cell" },
    { key: "items", title: "Товаров", className: "hidden md:table-cell" },
    { key: "status", title: "Статус", render: o => <StatusBadge status={o.status} /> },
    { key: "carrier", title: "Перевозчик", className: "hidden lg:table-cell" },
    { key: "trackingNumber", title: "Трек", className: "hidden xl:table-cell", render: o => o.trackingNumber ? <span className="font-mono text-xs">{o.trackingNumber}</span> : '—' },
    { key: "updatedAt", title: "Обновлено" },
  ];

  const s = fulfillmentStats;

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Fulfillment" description="Сборка, отправка и отслеживание заказов" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard title="Ожидание" value={s.pending} icon={Clock} />
        <StatCard title="Сборка" value={s.picking} icon={Package} />
        <StatCard title="Упаковка" value={s.packing} icon={Package} />
        <StatCard title="Отправлено" value={s.shipped} icon={Truck} />
        <StatCard title="В пути" value={s.inTransit} icon={Truck} />
        <StatCard title="Доставлено" value={s.delivered} icon={CheckCircle} />
        <StatCard title="Возвраты" value={s.returned} icon={RotateCcw} />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ID или клиенту..." className="pl-8 h-8 text-sm" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-40 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="pending">Ожидание</SelectItem>
            <SelectItem value="picking">Сборка</SelectItem>
            <SelectItem value="packing">Упаковка</SelectItem>
            <SelectItem value="shipped">Отправлено</SelectItem>
            <SelectItem value="in_transit">В пути</SelectItem>
            <SelectItem value="delivered">Доставлено</SelectItem>
            <SelectItem value="returned">Возврат</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered.slice(0, 50)} columns={columns} />
      <p className="text-xs text-muted-foreground">Показано {Math.min(50, filtered.length)} из {filtered.length}</p>
    </div>
  );
}
