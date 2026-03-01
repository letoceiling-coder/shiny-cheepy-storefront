import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paymentMethods, transactions, paymentStats, Transaction } from "../mock/payments";
import { fmt } from "../mock/helpers";
import { CreditCard, CheckCircle, XCircle, RotateCcw, Search, DollarSign } from "lucide-react";

export default function CrmPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = transactions.filter(t => {
    if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.userName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });

  const columns: Column<Transaction>[] = [
    { key: "id", title: "ID", className: "w-32", render: t => <span className="font-mono text-xs">{t.id}</span> },
    { key: "userName", title: "Пользователь" },
    { key: "amount", title: "Сумма", render: t => `${fmt(t.amount)} RUB` },
    { key: "status", title: "Статус", render: t => <StatusBadge status={t.status} /> },
    { key: "type", title: "Тип", className: "hidden md:table-cell", render: t => <span className="text-xs">{t.type === 'payment' ? 'Платёж' : t.type === 'refund' ? 'Возврат' : 'Выплата'}</span> },
    { key: "method", title: "Метод", className: "hidden lg:table-cell" },
    { key: "orderId", title: "Заказ", className: "hidden lg:table-cell", render: t => <span className="font-mono text-xs">{t.orderId}</span> },
    { key: "createdAt", title: "Дата" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Платежи" description="Методы оплаты и транзакции" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard title="Успешных" value={paymentStats.successful} icon={CheckCircle} />
        <StatCard title="Ошибок" value={paymentStats.failed} icon={XCircle} />
        <StatCard title="Возвратов" value={paymentStats.refunded} icon={RotateCcw} />
        <StatCard title="Комиссия" value={`${fmt(paymentStats.totalCommission)} RUB`} icon={DollarSign} />
        <StatCard title="Оборот" value={`${fmt(paymentStats.totalVolume)} RUB`} icon={CreditCard} />
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Транзакции</TabsTrigger>
          <TabsTrigger value="methods">Методы оплаты</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-4 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ID или пользователю..." className="pl-8 h-8 text-sm" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-36 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="success">Успешные</SelectItem>
                <SelectItem value="failed">Ошибки</SelectItem>
                <SelectItem value="refunded">Возвраты</SelectItem>
                <SelectItem value="pending">Ожидающие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DataTable data={filtered.slice(0, 50)} columns={columns} />
          <p className="text-xs text-muted-foreground">Показано {Math.min(50, filtered.length)} из {filtered.length}</p>
        </TabsContent>

        <TabsContent value="methods" className="mt-4 space-y-3">
          {paymentMethods.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">Комиссия: {m.commission}%</p>
                </div>
              </div>
              <Switch checked={m.active} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
