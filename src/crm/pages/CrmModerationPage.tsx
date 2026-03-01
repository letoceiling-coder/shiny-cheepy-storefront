import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { moderationItems, ModerationItem } from "../mock/moderation";
import { Search } from "lucide-react";

export default function CrmModerationPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = moderationItems.filter(m => {
    if (search && !m.title.toLowerCase().includes(search.toLowerCase()) && !m.seller.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    return true;
  });

  const columns: Column<ModerationItem>[] = [
    { key: "id", title: "ID", className: "w-28", render: m => <span className="font-mono text-xs">{m.id}</span> },
    { key: "image", title: "Фото", className: "w-14", render: m => <div className="h-10 w-10 rounded bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${m.image})` }} /> },
    { key: "title", title: "Название", render: m => <span className="font-medium text-sm">{m.title}</span> },
    { key: "category", title: "Категория", className: "hidden lg:table-cell" },
    { key: "seller", title: "Продавец", className: "hidden md:table-cell" },
    { key: "uploadedAt", title: "Дата загрузки" },
    { key: "status", title: "Статус", render: m => <StatusBadge status={m.status} /> },
    { key: "rejectReason", title: "Причина", className: "hidden xl:table-cell", render: m => m.rejectReason ? <span className="text-xs text-muted-foreground">{m.rejectReason}</span> : <span className="text-muted-foreground">—</span> },
  ];

  const pending = moderationItems.filter(m => m.status === 'pending').length;

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Модерация" description={`${pending} товаров ожидают проверки`} />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или продавцу..." className="pl-8 h-8 text-sm" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-40 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="pending">Ожидают</SelectItem>
            <SelectItem value="approved">Одобрены</SelectItem>
            <SelectItem value="rejected">Отклонены</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered} columns={columns} onRowClick={m => navigate(`/crm/moderation/${m.id}`)} />
      <p className="text-xs text-muted-foreground">Показано {filtered.length} из {moderationItems.length}</p>
    </div>
  );
}
