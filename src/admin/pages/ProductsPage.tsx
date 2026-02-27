import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Eye, RefreshCw, Sparkles, Search, ExternalLink } from "lucide-react";
import { mockProducts } from "../mock-data";
import type { Product } from "../types";

const statusBadge = (s: Product['status']) => {
  const m = { active: 'bg-emerald-100 text-emerald-800', disabled: 'bg-muted text-muted-foreground', pending: 'bg-amber-100 text-amber-800', archived: 'bg-secondary text-secondary-foreground' };
  return <Badge className={m[s]}>{s}</Badge>;
};

const aiBadge = (s: Product['aiStatus']) => {
  const m = { processed: 'bg-emerald-100 text-emerald-800', pending: 'bg-amber-100 text-amber-800', error: 'bg-destructive/10 text-destructive', none: 'bg-muted text-muted-foreground' };
  return <Badge className={m[s]}>{s}</Badge>;
};

export default function ProductsPage() {
  const [products] = useState(mockProducts);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = products.filter(p =>
    (statusFilter === 'all' || p.status === statusFilter) &&
    (search === '' || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(p => p.id)));
  };

  const toggle = (id: string) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Объявления</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={!selected.size}><Trash2 className="h-4 w-4 mr-1" />Удалить ({selected.size})</Button>
          <Button variant="outline" size="sm" disabled={!selected.size}><Eye className="h-4 w-4 mr-1" />Опубликовать</Button>
          <Button variant="outline" size="sm" disabled={!selected.size}><Sparkles className="h-4 w-4 mr-1" />AI обработка</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="disabled">Отключены</SelectItem>
                <SelectItem value="pending">Ожидание</SelectItem>
                <SelectItem value="archived">Архив</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead className="text-right">Цена</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>AI</TableHead>
                  <TableHead>Обновлено</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell><Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggle(p.id)} /></TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{p.title}</TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell className="text-right">{p.price.toLocaleString('ru')} ₽</TableCell>
                    <TableCell>{statusBadge(p.status)}</TableCell>
                    <TableCell>{aiBadge(p.aiStatus)}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{new Date(p.updatedAt).toLocaleDateString('ru')}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Link to={`/admin/products/${p.id}`}><Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4" /></Button></Link>
                        <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Показано {filtered.length} из {products.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}
