import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { crmProducts, CrmProduct } from "../data/mock-data";
import { Plus, Search, Download, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

export default function CrmProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const filtered = crmProducts.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const columns: Column<CrmProduct>[] = [
    {
      key: "select", title: "", className: "w-10",
      render: (p) => (
        <input
          type="checkbox"
          checked={selected.has(p.id)}
          onChange={() => toggleSelect(p.id)}
          className="rounded border-border"
          onClick={e => e.stopPropagation()}
        />
      ),
    },
    {
      key: "image", title: "Фото", className: "w-14",
      render: (p) => <div className="h-10 w-10 rounded bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />,
    },
    { key: "title", title: "Название", render: (p) => <span className="font-medium text-sm">{p.title}</span> },
    { key: "sku", title: "SKU", className: "hidden md:table-cell" },
    { key: "category", title: "Категория", className: "hidden lg:table-cell" },
    { key: "seller", title: "Продавец", className: "hidden lg:table-cell" },
    { key: "price", title: "Цена", render: (p) => `${fmt(p.price)} RUB` },
    { key: "stock", title: "Остаток", className: "hidden md:table-cell", render: (p) => <span className={p.stock === 0 ? "text-destructive" : ""}>{p.stock}</span> },
    { key: "status", title: "Статус", render: (p) => <StatusBadge status={p.status} /> },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Товары"
        description={`${crmProducts.length} товаров в каталоге`}
        actions={
          <Link to="/crm/products/new">
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Добавить товар</Button>
          </Link>
        }
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или SKU..." className="pl-8 h-8 text-sm" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-36 text-sm"><SelectValue placeholder="Статус" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="draft">Черновики</SelectItem>
            <SelectItem value="moderation">На модерации</SelectItem>
            <SelectItem value="archived">Архив</SelectItem>
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Выбрано: {selected.size}</span>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-destructive"><Trash2 className="h-3 w-3" /> Удалить</Button>
          </div>
        )}
        <Button variant="outline" size="sm" className="h-8 gap-1.5 ml-auto"><Download className="h-3.5 w-3.5" /> Экспорт</Button>
      </div>

      <DataTable data={filtered} columns={columns} onRowClick={p => navigate(`/crm/products/${p.id}`)} />
      <p className="text-xs text-muted-foreground">Показано {filtered.length} из {crmProducts.length}</p>
    </div>
  );
}
