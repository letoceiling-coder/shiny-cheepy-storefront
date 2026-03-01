import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { moderationItems, ModerationItem } from "../mock/moderation";
import { Search, CheckCircle, XCircle, RotateCcw, Ban } from "lucide-react";

export default function CrmModerationPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<ModerationItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

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
      <PageHeader
        title="Модерация"
        description={`${pending} товаров ожидают проверки`}
      />

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

      <DataTable data={filtered} columns={columns} onRowClick={m => setSelected(m)} />
      <p className="text-xs text-muted-foreground">Показано {filtered.length} из {moderationItems.length}</p>

      <Dialog open={!!selected} onOpenChange={() => { setSelected(null); setRejectReason(""); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Модерация: {selected?.title}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="flex gap-4">
                <div className="h-24 w-24 rounded-lg bg-muted bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${selected.image})` }} />
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Категория:</span> {selected.category}</p>
                  <p><span className="text-muted-foreground">Продавец:</span> {selected.seller}</p>
                  <p><span className="text-muted-foreground">Дата загрузки:</span> {selected.uploadedAt}</p>
                  <div className="pt-1"><StatusBadge status={selected.status} /></div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">История модерации</h4>
                <div className="space-y-1.5">
                  {selected.history.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{h.action}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selected.status === 'pending' && (
                <>
                  <Textarea
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="Причина отклонения (при необходимости)..."
                    className="text-sm"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1.5 flex-1"><CheckCircle className="h-3.5 w-3.5" /> Одобрить</Button>
                    <Button size="sm" variant="destructive" className="gap-1.5 flex-1"><XCircle className="h-3.5 w-3.5" /> Отклонить</Button>
                    <Button size="sm" variant="outline" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> На доработку</Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-destructive"><Ban className="h-3.5 w-3.5" /> Блокировать</Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
