import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { channels, campaigns, Campaign, MarketingChannel } from "../mock/marketing";
import { fmt } from "../mock/helpers";
import { Plus, Send, Wifi, WifiOff } from "lucide-react";

export default function CrmMarketingPage() {
  const [createOpen, setCreateOpen] = useState(false);

  const campaignCols: Column<Campaign>[] = [
    { key: "name", title: "Кампания", render: c => <span className="font-medium text-sm">{c.name}</span> },
    { key: "channel", title: "Канал" },
    { key: "audience", title: "Аудитория", render: c => <span className="text-xs capitalize">{c.audience === 'all' ? 'Все' : c.audience === 'new' ? 'Новые' : c.audience === 'vip' ? 'VIP' : 'Неактивные'}</span> },
    { key: "status", title: "Статус", render: c => <StatusBadge status={c.status} /> },
    { key: "sentCount", title: "Отправлено", render: c => fmt(c.sentCount), className: "hidden md:table-cell" },
    { key: "openRate", title: "Open Rate", render: c => c.status === 'sent' ? `${c.openRate}%` : '—', className: "hidden lg:table-cell" },
    { key: "clickRate", title: "CTR", render: c => c.status === 'sent' ? `${c.clickRate}%` : '—', className: "hidden lg:table-cell" },
    { key: "scheduledAt", title: "Дата" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Маркетинг и рассылки"
        description="Каналы коммуникации и кампании"
        actions={<Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" /> Новая рассылка</Button>}
      />

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          <TabsTrigger value="channels">Каналы</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4">
          <DataTable data={campaigns} columns={campaignCols} />
        </TabsContent>

        <TabsContent value="channels" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map(ch => (
              <div key={ch.id} className="p-4 rounded-lg border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{ch.name}</p>
                    <p className="text-xs text-muted-foreground">{ch.connected ? `${fmt(ch.subscribers)} подписчиков` : 'Не подключён'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {ch.connected ? <Wifi className="h-4 w-4 text-primary" /> : <WifiOff className="h-4 w-4 text-muted-foreground" />}
                  <Button size="sm" variant={ch.connected ? "outline" : "default"} className="text-xs">{ch.connected ? 'Настроить' : 'Подключить'}</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Новая рассылка</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <div><Label className="text-xs">Название кампании</Label><Input className="h-8 text-sm mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Канал</Label>
                <Select><SelectTrigger className="h-8 text-sm mt-1"><SelectValue placeholder="Выберите..." /></SelectTrigger>
                  <SelectContent>{channels.filter(c => c.connected).map(c => <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-xs">Аудитория</Label>
                <Select><SelectTrigger className="h-8 text-sm mt-1"><SelectValue placeholder="Выберите..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="inactive">Неактивные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label className="text-xs">Содержание</Label><Textarea className="mt-1 text-sm" rows={4} placeholder="Текст рассылки..." /></div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)}>Отмена</Button>
              <Button size="sm" variant="outline">Сохранить черновик</Button>
              <Button size="sm" className="gap-1.5"><Send className="h-3.5 w-3.5" /> Отправить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
