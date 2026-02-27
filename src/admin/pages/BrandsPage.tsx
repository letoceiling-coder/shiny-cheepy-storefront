import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";
import { mockBrands, mockCategories } from "../mock-data";
import type { Brand } from "../types";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [search, setSearch] = useState('');

  const filtered = brands.filter(b =>
    search === '' || b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Бренды</h2>
        <Button><Plus className="h-4 w-4 mr-1" />Добавить бренд</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-4">
            <Input placeholder="Поиск по названию..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Логотип</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Категории</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>SEO Title</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(b => (
                <TableRow key={b.id}>
                  <TableCell>
                    <img src={b.logoUrl} alt={b.name} className="h-8 w-8 rounded object-cover bg-muted" />
                  </TableCell>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{b.slug}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {b.categoryIds.map(cid => {
                        const cat = mockCategories.find(c => c.id === cid);
                        return <Badge key={cid} variant="outline">{cat?.name ?? cid}</Badge>;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={b.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-muted text-muted-foreground'}>
                      {b.status === 'active' ? 'Активен' : 'Отключен'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">{b.seoTitle}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setBrands(brands.filter(x => x.id !== b.id))}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Бренды не найдены</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
