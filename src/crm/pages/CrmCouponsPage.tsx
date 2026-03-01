import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coupons, Coupon } from "../mock/coupons";
import { fmt } from "../mock/helpers";
import { Plus, Ticket, Copy } from "lucide-react";

export default function CrmCouponsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<Coupon>[] = [
    { key: "code", title: "Код", render: c => (
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-sm font-medium">{c.code}</span>
        <button className="text-muted-foreground hover:text-foreground"><Copy className="h-3 w-3" /></button>
      </div>
    )},
    { key: "discount", title: "Скидка", render: c => c.type === 'percent' ? `${c.discount}%` : `${fmt(c.discount)} RUB` },
    { key: "minOrder", title: "Мин. заказ", render: c => c.minOrder > 0 ? `${fmt(c.minOrder)} RUB` : '—', className: "hidden md:table-cell" },
    { key: "target", title: "Для кого", render: c => <span className="text-xs capitalize">{c.target === 'all' ? 'Все' : c.target === 'new' ? 'Новые' : 'VIP'}</span> },
    { key: "usage", title: "Использовано", render: c => `${c.usedCount} / ${c.maxUses}` },
    { key: "expiresAt", title: "Истекает" },
    { key: "active", title: "Статус", render: c => <StatusBadge status={c.active ? 'active' : 'inactive'} /> },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Промокоды"
        description={`${coupons.length} промокодов`}
        actions={<Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" /> Создать промокод</Button>}
      />
      <DataTable data={coupons} columns={columns} />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Ticket className="h-4 w-4" /> Новый промокод</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div><Label className="text-xs">Код</Label><Input className="h-8 text-sm mt-1 font-mono" placeholder="EXAMPLE20" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Скидка</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
              <div><Label className="text-xs">Тип</Label>
                <Select defaultValue="percent">
                  <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Процент (%)</SelectItem>
                    <SelectItem value="fixed">Фиксированная (RUB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Мин. заказ (RUB)</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
              <div><Label className="text-xs">Макс. использований</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
            </div>
            <div><Label className="text-xs">Для кого</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все пользователи</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Дата окончания</Label><Input type="date" className="h-8 text-sm mt-1" /></div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)}>Отмена</Button>
              <Button size="sm">Создать</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
