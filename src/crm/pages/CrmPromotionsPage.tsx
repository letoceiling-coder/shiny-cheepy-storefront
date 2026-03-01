import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crmPromotions, CrmPromotion } from "../data/mock-data";
import { Plus } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

const typeLabels: Record<string, string> = {
  coupon: "Купон",
  banner: "Баннер",
  flash_sale: "Flash Sale",
  category_discount: "Категория",
  personal: "Персональная",
};

export default function CrmPromotionsPage() {
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = crmPromotions.filter(p => typeFilter === "all" || p.type === typeFilter);

  const columns: Column<CrmPromotion>[] = [
    { key: "name", title: "Название", render: p => <span className="font-medium text-sm">{p.name}</span> },
    { key: "type", title: "Тип", render: p => <span className="text-xs">{typeLabels[p.type]}</span> },
    { key: "status", title: "Статус", render: p => <StatusBadge status={p.status} /> },
    { key: "discount", title: "Скидка", render: p => p.discount > 0 ? `${p.discount}${p.discountType === 'percent' ? '%' : ' RUB'}` : '-' },
    { key: "code", title: "Код", render: p => p.code ? <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{p.code}</code> : '-' },
    { key: "dates", title: "Период", render: p => `${p.startDate} — ${p.endDate}` },
    { key: "usage", title: "Использовано", render: p => p.usageLimit > 0 ? `${p.usageCount} / ${p.usageLimit}` : '-' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Акции и промо"
        description={`${crmPromotions.length} акций`}
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Создать акцию</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Новая акция</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div><Label className="text-xs">Название</Label><Input className="h-8 text-sm mt-1" /></div>
                <div><Label className="text-xs">Тип</Label>
                  <Select><SelectTrigger className="h-8 text-sm mt-1"><SelectValue placeholder="Выберите тип" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coupon">Купон</SelectItem>
                      <SelectItem value="flash_sale">Flash Sale</SelectItem>
                      <SelectItem value="category_discount">Скидка по категории</SelectItem>
                      <SelectItem value="banner">Баннер</SelectItem>
                      <SelectItem value="personal">Персональная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Скидка</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Код купона</Label><Input className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Начало</Label><Input type="date" className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Окончание</Label><Input type="date" className="h-8 text-sm mt-1" /></div>
                </div>
                <div><Label className="text-xs">Лимит использований</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm">Отмена</Button>
                  <Button size="sm">Создать</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="h-8 w-40 text-sm"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все типы</SelectItem>
          <SelectItem value="coupon">Купоны</SelectItem>
          <SelectItem value="flash_sale">Flash Sale</SelectItem>
          <SelectItem value="category_discount">Категории</SelectItem>
          <SelectItem value="banner">Баннеры</SelectItem>
          <SelectItem value="personal">Персональные</SelectItem>
        </SelectContent>
      </Select>

      <DataTable data={filtered} columns={columns} />
    </div>
  );
}
