import { useParams, Link } from "react-router-dom";
import { crmOrders } from "../data/mock-data";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Printer, Ban, RotateCcw, Truck } from "lucide-react";
import { PermissionGate } from "../rbac/PermissionGate";

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default function CrmOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = crmOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Заказ не найден</h2>
          <Link to="/crm/orders" className="text-sm text-primary hover:underline">← Вернуться к заказам</Link>
        </div>
      </div>
    );
  }

  const timeline = [
    { status: "new", label: "Создан", date: order.createdAt },
    { status: "confirmed", label: "Подтверждён", date: order.status !== "new" ? order.updatedAt : null },
    { status: "shipped", label: "Отправлен", date: ["shipped", "delivered"].includes(order.status) ? order.updatedAt : null },
    { status: "delivered", label: "Доставлен", date: order.status === "delivered" ? order.updatedAt : null },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/crm/orders">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader
          title={`Заказ ${order.number}`}
          description={`Создан: ${order.createdAt}`}
          actions={
            <div className="flex items-center gap-2">
              <StatusBadge status={order.status} />
              <StatusBadge status={order.payment} />
            </div>
          }
        />
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="items">Товары</TabsTrigger>
          <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Клиент</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Имя:</span> {order.userName}</p>
                <p><span className="text-muted-foreground">ID:</span> {order.userId}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Продавец</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Имя:</span> {order.sellerName}</p>
                <p><span className="text-muted-foreground">ID:</span> {order.sellerId}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Финансы</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Сумма:</span> <span className="font-semibold">{fmt(order.total)} RUB</span></p>
                <p><span className="text-muted-foreground">Оплата:</span> <StatusBadge status={order.payment} /></p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Доставка</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Метод:</span> {order.delivery}</p>
                <p><span className="text-muted-foreground">Адрес:</span> {order.address}</p>
              </div>
            </div>
          </div>
          {order.comment && (
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <span className="text-xs text-muted-foreground block mb-1">Комментарий клиента</span>
              {order.comment}
            </div>
          )}
        </TabsContent>

        <TabsContent value="items" className="mt-6">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="text-left p-3">Товар</th>
                  <th className="text-right p-3">Цена</th>
                  <th className="text-right p-3">Кол-во</th>
                  <th className="text-right p-3">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-t border-border text-sm">
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3 text-right">{fmt(item.price)} RUB</td>
                    <td className="p-3 text-right">{item.qty}</td>
                    <td className="p-3 text-right font-medium">{fmt(item.price * item.qty)} RUB</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border text-sm font-semibold">
                  <td className="p-3" colSpan={3}>Итого</td>
                  <td className="p-3 text-right">{fmt(order.total)} RUB</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="space-y-4">
              {timeline.map((t) => (
                <div key={t.status} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full shrink-0 ${t.date ? "bg-primary" : "bg-border"}`} />
                  <span className={`text-sm flex-1 ${t.date ? "" : "text-muted-foreground"}`}>{t.label}</span>
                  {t.date && <span className="text-xs text-muted-foreground">{t.date}</span>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-3 text-sm">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{order.delivery}</span></div>
            <p><span className="text-muted-foreground">Адрес:</span> {order.address}</p>
            <p className="text-muted-foreground text-xs">Трекинг и логи доставки будут доступны после интеграции.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border -mx-4 md:-mx-6 px-4 md:px-6 py-3 flex items-center gap-2 justify-end">
        <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Печать</Button>
        <PermissionGate permission="orders.cancel">
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive"><Ban className="h-3.5 w-3.5" /> Отменить</Button>
        </PermissionGate>
        <PermissionGate permission="orders.refund">
          <Button variant="outline" size="sm" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Возврат</Button>
        </PermissionGate>
      </div>
    </div>
  );
}
