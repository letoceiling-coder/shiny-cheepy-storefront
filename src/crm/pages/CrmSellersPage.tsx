import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crmSellers, CrmSeller } from "../data/mock-data";
import { Search, Download, Star } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmSellersPage() {
  const [search, setSearch] = useState("");
  const [selectedSeller, setSelectedSeller] = useState<CrmSeller | null>(null);

  const filtered = crmSellers.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: Column<CrmSeller>[] = [
    { key: "name", title: "Продавец", render: s => <span className="font-medium text-sm">{s.name}</span> },
    { key: "status", title: "Статус", render: s => <StatusBadge status={s.status} /> },
    { key: "rating", title: "Рейтинг", render: s => <span className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 text-amber-500 fill-amber-500" />{s.rating}</span> },
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

      <DataTable data={filtered} columns={columns} onRowClick={s => setSelectedSeller(s)} />

      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selectedSeller?.name}</DialogTitle></DialogHeader>
          {selectedSeller && (
            <Tabs defaultValue="info" className="mt-2">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="info" className="text-xs">Информация</TabsTrigger>
                <TabsTrigger value="finance" className="text-xs">Финансы</TabsTrigger>
                <TabsTrigger value="docs" className="text-xs">Документы</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground text-xs block">Email</span>{selectedSeller.email}</div>
                  <div><span className="text-muted-foreground text-xs block">Телефон</span>{selectedSeller.phone}</div>
                  <div><span className="text-muted-foreground text-xs block">Статус</span><StatusBadge status={selectedSeller.status} /></div>
                  <div><span className="text-muted-foreground text-xs block">Рейтинг</span>{selectedSeller.rating}</div>
                  <div><span className="text-muted-foreground text-xs block">Товары</span>{selectedSeller.products}</div>
                  <div><span className="text-muted-foreground text-xs block">Заказы</span>{selectedSeller.orders}</div>
                  <div><span className="text-muted-foreground text-xs block">Жалобы</span>{selectedSeller.complaints}</div>
                  <div><span className="text-muted-foreground text-xs block">Дата регистрации</span>{selectedSeller.joinedAt}</div>
                </div>
              </TabsContent>
              <TabsContent value="finance" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground text-xs block">Выручка</span>{fmt(selectedSeller.revenue)} RUB</div>
                  <div><span className="text-muted-foreground text-xs block">Комиссия</span>{selectedSeller.commission}%</div>
                  <div><span className="text-muted-foreground text-xs block">Баланс</span>{fmt(selectedSeller.balance)} RUB</div>
                </div>
              </TabsContent>
              <TabsContent value="docs" className="mt-4">
                <div className="text-sm">
                  <span className={`${selectedSeller.documents ? 'text-green-600' : 'text-destructive'}`}>
                    {selectedSeller.documents ? 'Документы загружены и проверены' : 'Документы не загружены'}
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
