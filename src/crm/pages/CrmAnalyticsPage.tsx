import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { salesChartData, categoryAnalytics } from "../data/mock-data";
import { Download } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);
const COLORS = [
  "hsl(262,83%,58%)", "hsl(280,90%,60%)", "hsl(340,80%,55%)", "hsl(20,90%,55%)",
  "hsl(200,80%,50%)", "hsl(150,60%,45%)", "hsl(45,90%,55%)", "hsl(0,70%,55%)",
];

const geoData = [
  { city: "Москва", orders: 1240, revenue: 4200000 },
  { city: "СПб", orders: 680, revenue: 2100000 },
  { city: "Казань", orders: 320, revenue: 980000 },
  { city: "Новосибирск", orders: 290, revenue: 870000 },
  { city: "Екатеринбург", orders: 250, revenue: 750000 },
  { city: "Краснодар", orders: 210, revenue: 630000 },
];

export default function CrmAnalyticsPage() {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Аналитика"
        description="Детализированная статистика маркетплейса"
        actions={
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="h-8 w-32 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 дней</SelectItem>
                <SelectItem value="30d">30 дней</SelectItem>
                <SelectItem value="6m">6 месяцев</SelectItem>
                <SelectItem value="1y">1 год</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Экспорт</Button>
          </div>
        }
      />

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales" className="text-xs">Продажи</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs">Категории</TabsTrigger>
          <TabsTrigger value="geo" className="text-xs">География</TabsTrigger>
          <TabsTrigger value="conversion" className="text-xs">Конверсия</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-medium mb-4">Выручка</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(v: number) => fmt(v)} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-medium mb-4">Заказы</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-medium mb-4">Выручка по категориям</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryAnalytics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={120} />
                  <Tooltip formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-medium mb-4">Доля заказов</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryAnalytics} dataKey="orders" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name }) => name}>
                    {categoryAnalytics.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="geo" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-medium mb-4">Заказы по городам</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="city" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip formatter={(v: number) => fmt(v)} />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="mt-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-medium mb-4">Воронка конверсии</h3>
            <div className="space-y-3">
              {[
                { label: "Посетители", value: 45200, pct: 100 },
                { label: "Просмотр товара", value: 18400, pct: 40.7 },
                { label: "Добавление в корзину", value: 5800, pct: 12.8 },
                { label: "Оформление заказа", value: 3842, pct: 8.5 },
                { label: "Оплата", value: 3200, pct: 7.1 },
              ].map(step => (
                <div key={step.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{step.label}</span>
                    <span className="text-muted-foreground">{fmt(step.value)} ({step.pct}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
