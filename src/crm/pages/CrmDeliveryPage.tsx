import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deliveryMethods, deliveryProviders, DeliveryProvider } from "../mock/delivery";
import { Truck, Wifi, WifiOff, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fmt } from "../mock/helpers";

export default function CrmDeliveryPage() {
  const [selectedProvider, setSelectedProvider] = useState<DeliveryProvider | null>(null);

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Доставка" description="Методы доставки и провайдеры" />

      <Tabs defaultValue="methods">
        <TabsList>
          <TabsTrigger value="methods">Методы доставки</TabsTrigger>
          <TabsTrigger value="providers">Провайдеры</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="mt-4 space-y-3">
          {deliveryMethods.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.cost === 0 ? 'Бесплатно' : `${fmt(m.cost)} RUB`}
                    {m.freeFrom > 0 && ` • Бесплатно от ${fmt(m.freeFrom)} RUB`}
                    {` • ${m.daysMin}–${m.daysMax} дн.`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {m.regionRestrictions.length > 0 && (
                  <span className="text-xs text-muted-foreground">Ограничения: {m.regionRestrictions.join(', ')}</span>
                )}
                <Switch checked={m.active} />
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="providers" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryProviders.map(p => (
              <div key={p.id} className="p-4 rounded-lg border border-border bg-card space-y-3 cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => setSelectedProvider(p)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.logo}</span>
                    <span className="font-medium text-sm">{p.name}</span>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {p.status === 'connected' ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                  Последняя синхр.: {p.lastSync}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Settings className="h-4 w-4" /> {selectedProvider?.name}</DialogTitle></DialogHeader>
          {selectedProvider && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedProvider.status} />
              </div>
              <div>
                <Label className="text-xs">API Key</Label>
                <Input className="h-8 text-sm mt-1 font-mono" value={selectedProvider.apiKey || ''} placeholder="Введите API ключ..." readOnly />
              </div>
              <div>
                <Label className="text-xs">Webhook URL</Label>
                <Input className="h-8 text-sm mt-1 font-mono" value={selectedProvider.webhookUrl || ''} placeholder="https://..." readOnly />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">{selectedProvider.status === 'connected' ? 'Обновить' : 'Подключить'}</Button>
                <Button size="sm" variant="outline">Тест соединения</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
