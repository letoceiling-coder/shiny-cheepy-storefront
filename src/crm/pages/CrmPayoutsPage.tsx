import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { sellerPayouts, payoutHistory, SellerPayout, PayoutRecord } from "../mock/payouts";
import { fmt } from "../mock/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Plus } from "lucide-react";

export default function CrmPayoutsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  const sellerCols: Column<SellerPayout>[] = [
    { key: "sellerName", title: "Продавец", render: s => <span className="font-medium text-sm">{s.sellerName}</span> },
    { key: "balance", title: "Баланс", render: s => `${fmt(s.balance)} RUB` },
    { key: "commission", title: "Комиссия", render: s => `${s.commission}%` },
    { key: "pendingAmount", title: "К выплате", render: s => <span className="text-primary font-medium">{fmt(s.pendingAmount)} RUB</span> },
    { key: "totalPaid", title: "Выплачено всего", render: s => `${fmt(s.totalPaid)} RUB`, className: "hidden md:table-cell" },
  ];

  const historyCols: Column<PayoutRecord>[] = [
    { key: "id", title: "ID", className: "w-28", render: p => <span className="font-mono text-xs">{p.id}</span> },
    { key: "sellerName", title: "Продавец" },
    { key: "amount", title: "Сумма", render: p => `${fmt(p.amount)} RUB` },
    { key: "commission", title: "Комиссия", render: p => `${p.commission}%`, className: "hidden md:table-cell" },
    { key: "net", title: "К выплате", render: p => `${fmt(p.net)} RUB` },
    { key: "status", title: "Статус", render: p => <StatusBadge status={p.status} /> },
    { key: "method", title: "Метод", className: "hidden lg:table-cell" },
    { key: "createdAt", title: "Дата" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Выплаты продавцам"
        description="Балансы и история выплат"
        actions={<Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" /> Создать выплату</Button>}
      />

      <Tabs defaultValue="balances">
        <TabsList>
          <TabsTrigger value="balances">Балансы продавцов</TabsTrigger>
          <TabsTrigger value="history">История выплат</TabsTrigger>
        </TabsList>
        <TabsContent value="balances" className="mt-4">
          <DataTable data={sellerPayouts} columns={sellerCols} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <DataTable data={payoutHistory} columns={historyCols} />
        </TabsContent>
      </Tabs>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Создать выплату</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div><Label className="text-xs">Продавец</Label><Input className="h-8 text-sm mt-1" placeholder="Выберите продавца..." /></div>
            <div><Label className="text-xs">Сумма (RUB)</Label><Input type="number" className="h-8 text-sm mt-1" /></div>
            <div><Label className="text-xs">Метод выплаты</Label><Input className="h-8 text-sm mt-1" placeholder="Банковский перевод" /></div>
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
