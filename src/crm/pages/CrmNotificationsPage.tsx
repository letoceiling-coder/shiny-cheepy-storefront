import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { notifications, Notification } from "../mock/notifications";
import { Bell, ShoppingCart, Shield, CreditCard, Settings, Store, MessageSquare, Check } from "lucide-react";

const typeIcons: Record<Notification['type'], React.ElementType> = {
  order: ShoppingCart,
  moderation: Shield,
  payment: CreditCard,
  system: Settings,
  seller: Store,
  review: MessageSquare,
};

export default function CrmNotificationsPage() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter(n => !n.read).length;

  const markRead = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Уведомления"
        description={`${unreadCount} непрочитанных`}
        actions={unreadCount > 0 ? (
          <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
            <Check className="h-3 w-3" /> Прочитать все
          </button>
        ) : undefined}
      />

      <div className="space-y-2">
        {items.map(n => {
          const Icon = typeIcons[n.type];
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer ${n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/5'}`}
              onClick={() => markRead(n.id)}
            >
              <div className={`p-2 rounded-full shrink-0 ${n.read ? 'bg-muted' : 'bg-primary/10'}`}>
                <Icon className={`h-4 w-4 ${n.read ? 'text-muted-foreground' : 'text-primary'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm ${n.read ? '' : 'font-medium'}`}>{n.title}</p>
                  <span className="text-xs text-muted-foreground shrink-0">{n.createdAt}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              </div>
              {!n.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
