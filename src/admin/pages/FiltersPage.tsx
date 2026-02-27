import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { mockFilters, mockAttributes, mockCategories } from "../mock-data";
import type { FilterConfig } from "../types";

const displayTypeLabels: Record<string, string> = {
  checkbox: 'Чекбоксы',
  select: 'Выпадающий список',
  multiselect: 'Мультивыбор',
  range: 'Диапазон',
};

function flatCategories() {
  const result: { id: string; name: string }[] = [];
  function walk(cats: typeof mockCategories, prefix = '') {
    for (const c of cats) {
      result.push({ id: c.id, name: prefix + c.name });
      if (c.children.length) walk(c.children, prefix + c.name + ' / ');
    }
  }
  walk(mockCategories);
  return result;
}

export default function FiltersPage() {
  const [filters, setFilters] = useState<FilterConfig[]>(mockFilters);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const categories = flatCategories();

  const filtered = categoryFilter === 'all' ? filters : filters.filter(f => f.categoryId === categoryFilter);

  const toggleEnabled = (id: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleAdd = () => {
    if (mockAttributes.length === 0) return;
    const newFilter: FilterConfig = {
      id: `f-${Date.now()}`,
      attributeId: mockAttributes[0].id,
      categoryId: categoryFilter !== 'all' ? categoryFilter : (categories[0]?.id ?? '1'),
      displayType: 'checkbox',
      enabled: true,
      order: filters.length,
    };
    setFilters([...filters, newFilter]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold flex items-center gap-2"><SlidersHorizontal className="h-6 w-6" />Настройка фильтров</h2>
        <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-1" />Добавить фильтр</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-64"><SelectValue placeholder="Категория" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Атрибут</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Тип отображения</TableHead>
                <TableHead>Порядок</TableHead>
                <TableHead>Вкл.</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(f => {
                const attr = mockAttributes.find(a => a.id === f.attributeId);
                const cat = categories.find(c => c.id === f.categoryId);
                return (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{attr?.name ?? f.attributeId}</TableCell>
                    <TableCell><Badge variant="outline">{cat?.name ?? f.categoryId}</Badge></TableCell>
                    <TableCell>{displayTypeLabels[f.displayType]}</TableCell>
                    <TableCell className="text-muted-foreground">{f.order}</TableCell>
                    <TableCell><Switch checked={f.enabled} onCheckedChange={() => toggleEnabled(f.id)} /></TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => setFilters(filters.filter(x => x.id !== f.id))}><Trash2 className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Нет фильтров</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Доступные атрибуты</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockAttributes.filter(a => a.filterable).map(a => (
              <Badge key={a.id} variant="outline" className="text-sm">{a.name} ({a.type})</Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Показаны атрибуты с флагом filterable=true</p>
        </CardContent>
      </Card>
    </div>
  );
}
