import { useParams, Link } from "react-router-dom";
import { crmProducts } from "../data/mock-data";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PermissionGate } from "../rbac/PermissionGate";

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function CrmProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = crmProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Товар не найден</h2>
          <Link to="/crm/products" className="text-sm text-primary hover:underline">← Вернуться к товарам</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/crm/products">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader
          title={product.title}
          description={`SKU: ${product.sku} · ${product.category}`}
          actions={<StatusBadge status={product.status} />}
        />
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="main">Основное</TabsTrigger>
          <TabsTrigger value="media">Медиа</TabsTrigger>
          <TabsTrigger value="variations">Вариации</TabsTrigger>
          <TabsTrigger value="logistics">Логистика</TabsTrigger>
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Основная информация</h3>
              <div className="space-y-3">
                <div><Label className="text-xs">Название</Label><Input defaultValue={product.title} className="h-8 text-sm mt-1" /></div>
                <div><Label className="text-xs">SKU</Label><Input defaultValue={product.sku} className="h-8 text-sm mt-1" /></div>
                <div><Label className="text-xs">Категория</Label><Input defaultValue={product.category} className="h-8 text-sm mt-1" /></div>
                <div><Label className="text-xs">Описание</Label><Textarea className="text-sm mt-1" rows={3} defaultValue="Описание товара..." /></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-5 space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Ценообразование</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Цена</Label><Input type="number" defaultValue={product.price} className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Старая цена</Label><Input type="number" defaultValue={product.oldPrice || ""} className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Остаток</Label><Input type="number" defaultValue={product.stock} className="h-8 text-sm mt-1" /></div>
                  <div><Label className="text-xs">Рейтинг</Label><Input defaultValue={product.rating} className="h-8 text-sm mt-1" disabled /></div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-5 space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Продавец</h3>
                <div className="text-sm space-y-1">
                  <p>{product.seller}</p>
                  <p className="text-xs text-muted-foreground">ID: {product.sellerId}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square rounded-lg bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
              <div className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                + Добавить
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="variations" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Вариации товара (размеры, цвета) будут доступны после настройки атрибутов.
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-medium">Параметры доставки</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div><Label className="text-xs">Вес (кг)</Label><Input className="h-8 text-sm mt-1" defaultValue="0.5" /></div>
              <div><Label className="text-xs">Длина (см)</Label><Input className="h-8 text-sm mt-1" defaultValue="30" /></div>
              <div><Label className="text-xs">Ширина (см)</Label><Input className="h-8 text-sm mt-1" defaultValue="20" /></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{product.reviews}</p>
              <p className="text-xs text-muted-foreground">Отзывов</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{product.stock}</p>
              <p className="text-xs text-muted-foreground">На складе</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{fmt(product.price)}</p>
              <p className="text-xs text-muted-foreground">Цена, RUB</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{product.rating}</p>
              <p className="text-xs text-muted-foreground">Рейтинг</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Аналитика продаж, конверсия, просмотры — будут доступны после интеграции.
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Создан</span>
              <span className="text-xs text-muted-foreground ml-auto">{product.createdAt}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Последнее обновление</span>
              <span className="text-xs text-muted-foreground ml-auto">{product.updatedAt}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border -mx-4 md:-mx-6 px-4 md:px-6 py-3 flex items-center gap-2 justify-end">
        <Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-3.5 w-3.5" /> Предпросмотр</Button>
        <PermissionGate permission="products.delete">
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Удалить</Button>
        </PermissionGate>
        <PermissionGate permission="products.update">
          <Button size="sm" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Сохранить</Button>
        </PermissionGate>
      </div>
    </div>
  );
}
