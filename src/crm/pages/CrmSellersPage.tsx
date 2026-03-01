import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { crmSellers, CrmSeller } from "../data/mock-data";
import { Search, Download, Star } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmSellersPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = crmSellers.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: Column<CrmSeller>[] = [
    { key: "name", title: "Продавец", render: s => <span className="font-medium text-sm">{s.name}</span> },
    { key: "status", title: "Статус", render: s => <StatusBadge status={s.status} /> },
    { key: "rating", title: "Рейтинг", render: s => <span className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-amber-500 text-amber-500" />{s.rating}</span> },
    { key: "products", title: "Товары" },
    { key: "orders", title: "Заказы" },
    { key: "revenue", title: "Выручка", render: s => `${fmt(s.revenue)} RUB`, className: "hidden md:table-cell" },
    { key: "commission", title: "Комиссия", render: s => `${s.commission}%`, className: "hidden lg:table-cell" },
    { key: "complaints", title: "Жалобы", render: s => s.complaints > 0 ? <span className="text-destructive">{s.complaints}</span> : <span className="text-muted-foreground">0</span> },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Продавцы"
        description={`${crmSellers.length} продавцов`}
        actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Экспорт</Button>}
      />
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск продавца..." className="pl-8 h-8 text-sm" />
      </div>
      <DataTable data={filtered} columns={columns} onRowClick={s => navigate(`/crm/sellers/${s.id}`)} />
    </div>
  );
}
