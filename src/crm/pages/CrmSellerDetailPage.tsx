import { useParams, Link } from "react-router-dom";
import { crmSellers } from "../data/mock-data";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, Ban, CheckCircle } from "lucide-react";
import { PermissionGate } from "../rbac/PermissionGate";

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function CrmSellerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const seller = crmSellers.find((s) => s.id === id);

  if (!seller) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Продавец не найден</h2>
          <Link to="/crm/sellers" className="text-sm text-primary hover:underline">← Вернуться к продавцам</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/crm/sellers">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader
          title={seller.name}
          description={`ID: ${seller.id} · С нами с ${seller.joinedAt}`}
          actions={
            <div className="flex items-center gap-2">
              <StatusBadge status={seller.status} />
              <span className="flex items-center gap-1 text-sm"><Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />{seller.rating}</span>
            </div>
          }
        />
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="finance">Финансы</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="docs">Документы</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Контакты</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Email:</span> {seller.email}</p>
                <p><span className="text-muted-foreground">Телефон:</span> {seller.phone}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Метрики</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground text-xs block">Товаров</span>{seller.products}</div>
                <div><span className="text-muted-foreground text-xs block">Заказов</span>{seller.orders}</div>
                <div><span className="text-muted-foreground text-xs block">Жалоб</span>{seller.complaints > 0 ? <span className="text-destructive">{seller.complaints}</span> : "0"}</div>
                <div><span className="text-muted-foreground text-xs block">Рейтинг</span>{seller.rating}</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-2xl font-semibold">{fmt(seller.revenue)}</p>
              <p className="text-xs text-muted-foreground">Выручка (RUB)</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-2xl font-semibold">{seller.commission}%</p>
              <p className="text-xs text-muted-foreground">Комиссия</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-2xl font-semibold">{fmt(seller.balance)}</p>
              <p className="text-xs text-muted-foreground">Баланс (RUB)</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Список товаров продавца ({seller.products} шт.) будет загружен из каталога.
          </div>
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <span className={`text-sm ${seller.documents ? "text-green-600" : "text-destructive"}`}>
              {seller.documents ? "✓ Документы загружены и проверены" : "✗ Документы не загружены"}
            </span>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Регистрация</span>
              <span className="text-xs text-muted-foreground ml-auto">{seller.joinedAt}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border -mx-4 md:-mx-6 px-4 md:px-6 py-3 flex items-center gap-2 justify-end">
        <PermissionGate permission="sellers.manage">
          {seller.status === "moderation" && (
            <Button size="sm" className="gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Одобрить</Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive"><Ban className="h-3.5 w-3.5" /> Заблокировать</Button>
        </PermissionGate>
      </div>
    </div>
  );
}
