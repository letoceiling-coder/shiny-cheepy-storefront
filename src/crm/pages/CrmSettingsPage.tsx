import { PageHeader } from "../components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CrmSettingsPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Настройки" description="Конфигурация маркетплейса" />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general" className="text-xs">Общие</TabsTrigger>
          <TabsTrigger value="commission" className="text-xs">Комиссии</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs">Платежи</TabsTrigger>
          <TabsTrigger value="email" className="text-xs">Email</TabsTrigger>
          <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
          <TabsTrigger value="logs" className="text-xs">Логи</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div><Label className="text-xs">Название маркетплейса</Label><Input defaultValue="Cheepy" className="h-8 text-sm mt-1" /></div>
            <div><Label className="text-xs">Email поддержки</Label><Input defaultValue="support@cheepy.ru" className="h-8 text-sm mt-1" /></div>
            <div><Label className="text-xs">Телефон</Label><Input defaultValue="+7 (800) 123-45-67" className="h-8 text-sm mt-1" /></div>
            <div><Label className="text-xs">Валюта по умолчанию</Label>
              <Select defaultValue="RUB"><SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="RUB">RUB</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between"><span className="text-sm">Режим обслуживания</span><Switch /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Регистрация продавцов</span><Switch defaultChecked /></div>
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>

        <TabsContent value="commission" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div><Label className="text-xs">Комиссия по умолчанию (%)</Label><Input type="number" defaultValue="10" className="h-8 text-sm mt-1" /></div>
            <h3 className="text-sm font-medium pt-2">По категориям</h3>
            {["Верхняя одежда","Обувь","Платья","Сумки","Аксессуары"].map(cat => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm">{cat}</span>
                <Input type="number" defaultValue="10" className="h-7 w-20 text-sm text-right" />
              </div>
            ))}
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div className="flex items-center justify-between"><span className="text-sm">Банковские карты</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">СБП</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Баланс пользователя</span><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><span className="text-sm">Наложенный платёж</span><Switch /></div>
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div><Label className="text-xs">Шаблон подтверждения заказа</Label><Textarea rows={4} defaultValue="Здравствуйте, {{name}}! Ваш заказ {{order_id}} подтверждён." className="mt-1 text-sm" /></div>
            <div><Label className="text-xs">Шаблон отправки</Label><Textarea rows={4} defaultValue="Ваш заказ {{order_id}} отправлен. Трек-номер: {{tracking}}." className="mt-1 text-sm" /></div>
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div><Label className="text-xs">Title главной</Label><Input defaultValue="Cheepy — маркетплейс модной одежды" className="h-8 text-sm mt-1" /></div>
            <div><Label className="text-xs">Meta Description</Label><Textarea rows={2} defaultValue="Покупайте модную одежду, обувь и аксессуары на Cheepy. Доставка по всей России." className="mt-1 text-sm" /></div>
            <div><Label className="text-xs">Robots.txt</Label><Textarea rows={3} defaultValue="User-agent: *\nAllow: /" className="mt-1 text-sm font-mono" /></div>
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-2xl">
            <div className="flex items-center justify-between"><span className="text-sm">Логирование действий</span><Switch defaultChecked /></div>
            <div><Label className="text-xs">Уровень логирования</Label>
              <Select defaultValue="info"><SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Хранить логи (дней)</Label><Input type="number" defaultValue="30" className="h-8 text-sm mt-1" /></div>
            <Button size="sm">Сохранить</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
