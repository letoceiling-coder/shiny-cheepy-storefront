import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crmReviews, CrmReview } from "../data/mock-data";
import { Star } from "lucide-react";

export default function CrmReviewsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filtered = crmReviews.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (ratingFilter !== "all" && String(r.rating) !== ratingFilter) return false;
    return true;
  });

  const columns: Column<CrmReview>[] = [
    { key: "productTitle", title: "Товар", render: r => <span className="font-medium text-sm">{r.productTitle}</span> },
    { key: "userName", title: "Автор" },
    { key: "rating", title: "Оценка", render: r => (
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'text-amber-500 fill-amber-500' : 'text-border'}`} />
        ))}
      </span>
    )},
    { key: "text", title: "Текст", render: r => <span className="text-sm truncate max-w-[200px] block">{r.text}</span>, className: "hidden md:table-cell" },
    { key: "status", title: "Статус", render: r => <StatusBadge status={r.status} /> },
    { key: "complaints", title: "Жалобы", render: r => r.complaints > 0 ? <span className="text-destructive text-sm">{r.complaints}</span> : <span className="text-muted-foreground">0</span> },
    { key: "sellerReply", title: "Ответ", render: r => r.sellerReply ? <span className="text-xs text-muted-foreground">Есть</span> : <span className="text-xs text-muted-foreground">-</span> },
    { key: "createdAt", title: "Дата" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Отзывы" description={`${crmReviews.length} отзывов`} />

      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-36 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="published">Опубликованные</SelectItem>
            <SelectItem value="moderation">На модерации</SelectItem>
            <SelectItem value="rejected">Отклонённые</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="h-8 w-32 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все оценки</SelectItem>
            <SelectItem value="5">5 звёзд</SelectItem>
            <SelectItem value="4">4 звезды</SelectItem>
            <SelectItem value="3">3 звезды</SelectItem>
            <SelectItem value="2">2 звезды</SelectItem>
            <SelectItem value="1">1 звезда</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable data={filtered} columns={columns} />
    </div>
  );
}
