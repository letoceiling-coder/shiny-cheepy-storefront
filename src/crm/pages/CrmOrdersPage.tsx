import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { crmOrders, CrmOrder } from "../data/mock-data";
import { Search, Download } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<CrmOrder | null>(null);

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

  const timeline = [
    { status: "new", label: "Создан", date: selectedOrder?.createdAt },
    { status: "confirmed", label: "Подтверждён", date: selectedOrder?.status !== 'new' ? selectedOrder?.updatedAt : null },
    { status: "shipped", label: "Отправлен", date: ['shipped','delivered'].includes(selectedOrder?.status || '') ? selectedOrder?.updatedAt : null },
    { status: "delivered", label: "Доставлен", date: selectedOrder?.status === 'delivered' ? selectedOrder?.updatedAt : null },
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

      <DataTable data={filtered} columns={columns} onRowClick={o => setSelectedOrder(o)} />

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Заказ {selectedOrder?.number}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedOrder.status} />
                <StatusBadge status={selectedOrder.payment} />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Таймлайн</h4>
                <div className="space-y-1.5">
                  {timeline.map(t => (
                    <div key={t.status} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${t.date ? 'bg-primary' : 'bg-border'}`} />
                      <span className={`text-sm ${t.date ? '' : 'text-muted-foreground'}`}>{t.label}</span>
                      {t.date && <span className="text-xs text-muted-foreground ml-auto">{t.date}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Товары</h4>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.title} x{item.qty}</span>
                    <span>{fmt(item.price * item.qty)} RUB</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                  <span>Итого</span>
                  <span>{fmt(selectedOrder.total)} RUB</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground text-xs block">Клиент</span>{selectedOrder.userName}</div>
                <div><span className="text-muted-foreground text-xs block">Продавец</span>{selectedOrder.sellerName}</div>
                <div><span className="text-muted-foreground text-xs block">Доставка</span>{selectedOrder.delivery}</div>
                <div><span className="text-muted-foreground text-xs block">Адрес</span>{selectedOrder.address}</div>
              </div>

              {selectedOrder.comment && (
                <div className="text-sm bg-muted/50 rounded-md p-3">
                  <span className="text-xs text-muted-foreground block mb-1">Комментарий</span>
                  {selectedOrder.comment}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
