import { useState } from "react";
import { Package, ChevronRight, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/data/mock-data";

const statusLabels: Record<string, { label: string; color: string }> = {
  shipped: { label: "Отправлен", color: "bg-blue-100 text-blue-700" },
  delivered: { label: "Выполнен", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Отменён", color: "bg-red-100 text-red-700" },
};

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const order = mockOrders.find(o => o.id === selectedOrder);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Мои заказы</h2>

      {mockOrders.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Package className="w-16 h-16 text-border mb-4" />
          <p className="text-lg font-medium text-foreground mb-1">Заказов пока нет</p>
          <p className="text-sm text-muted-foreground">Ваши заказы появятся здесь</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockOrders.map(o => {
            const st = statusLabels[o.status];
            return (
              <div key={o.id} className="p-4 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${st.color}`}>{st.label}</span>
                </div>

                <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                  {o.items.map((item, i) => (
                    <img key={i} src={item.product.images[0]} alt="" className="w-14 h-18 rounded-lg object-cover shrink-0" />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Сумма: </span>
                    <span className="font-bold text-foreground">{o.total.toLocaleString()} ₽</span>
                    {o.discount > 0 && <span className="text-green-600 ml-2">-{o.discount.toLocaleString()} ₽</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-xs" onClick={() => setSelectedOrder(o.id)}>
                      Подробнее <ChevronRight className="w-3 h-3" />
                    </Button>
                    {o.status === "delivered" && (
                      <Button variant="outline" size="sm" className="rounded-lg text-xs gap-1">
                        <Star className="w-3 h-3" />Отзыв
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order detail modal */}
      {order && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-background rounded-2xl p-6 w-full max-w-[520px] mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Заказ {order.id}</h3>
              <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>

            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl border border-border">
                  <img src={item.product.images[0]} alt="" className="w-16 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Цвет: {item.color} · Размер: {item.size}</p>
                    <p className="text-xs text-muted-foreground">Кол-во: {item.quantity}</p>
                    <p className="text-sm font-bold text-foreground mt-1">{(item.product.price * item.quantity).toLocaleString()} ₽</p>
                  </div>
                </div>
              ))}

              <div className="space-y-2 text-sm border-t border-border pt-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Оплата</span><span className="text-foreground">{order.payment}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span className="text-foreground">{order.delivery === 0 ? "Бесплатно" : `${order.delivery} ₽`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Адрес</span><span className="text-foreground text-right max-w-[200px]">{order.address}</span></div>
                {order.discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Скидка</span><span className="text-green-600">-{order.discount.toLocaleString()} ₽</span></div>}
                <div className="flex justify-between font-bold border-t border-border pt-2"><span>Итого</span><span>{order.total.toLocaleString()} ₽</span></div>
              </div>

              <button className="text-sm text-primary hover:underline">Проблемы с заказом?</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
