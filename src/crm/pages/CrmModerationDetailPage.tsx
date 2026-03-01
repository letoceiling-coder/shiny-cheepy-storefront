import { useParams, Link } from "react-router-dom";
import { moderationItems } from "../mock/moderation";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Ban } from "lucide-react";
import { PermissionGate } from "../rbac/PermissionGate";
import { useState } from "react";

export default function CrmModerationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = moderationItems.find((m) => m.id === id);
  const [rejectReason, setRejectReason] = useState("");

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Товар не найден</h2>
          <Link to="/crm/moderation" className="text-sm text-primary hover:underline">← Вернуться к модерации</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/crm/moderation">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader
          title={`Модерация: ${item.title}`}
          description={`ID: ${item.id}`}
          actions={<StatusBadge status={item.status} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Галерея</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="aspect-square rounded-lg bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Информация о товаре</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground text-xs block">Название</span>{item.title}</div>
              <div><span className="text-muted-foreground text-xs block">Категория</span>{item.category}</div>
              <div><span className="text-muted-foreground text-xs block">Продавец</span>{item.seller}</div>
              <div><span className="text-muted-foreground text-xs block">Дата загрузки</span>{item.uploadedAt}</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">SEO</h3>
            <p className="text-sm text-muted-foreground">SEO данные будут доступны после утверждения товара.</p>
          </div>
        </div>

        {/* Right column — status & actions */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Статус</h3>
            <StatusBadge status={item.status} />
            {item.rejectReason && (
              <div className="mt-2 text-sm">
                <span className="text-xs text-muted-foreground block">Причина отклонения</span>
                <span className="text-destructive">{item.rejectReason}</span>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">История действий</h3>
            <div className="space-y-2">
              {item.history.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p>{h.action}</p>
                    <p className="text-xs text-muted-foreground">{h.date} · {h.moderator}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {item.status === "pending" && (
            <div className="rounded-lg border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Решение</h3>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Причина отклонения (при необходимости)..."
                className="text-sm"
                rows={2}
              />
              <div className="flex flex-col gap-2">
                <PermissionGate permission="moderation.approve">
                  <Button size="sm" className="gap-1.5 w-full"><CheckCircle className="h-3.5 w-3.5" /> Одобрить</Button>
                </PermissionGate>
                <PermissionGate permission="moderation.reject">
                  <Button size="sm" variant="destructive" className="gap-1.5 w-full"><XCircle className="h-3.5 w-3.5" /> Отклонить</Button>
                </PermissionGate>
                <Button size="sm" variant="outline" className="gap-1.5 w-full"><RotateCcw className="h-3.5 w-3.5" /> На доработку</Button>
                <Button size="sm" variant="outline" className="gap-1.5 w-full text-destructive"><Ban className="h-3.5 w-3.5" /> Блокировать</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
