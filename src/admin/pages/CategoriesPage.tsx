import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronDown, Plus, GripVertical, Link2, FolderTree } from "lucide-react";
import { mockCategories } from "../mock-data";
import type { Category } from "../types";

function CategoryNode({ cat, depth = 0 }: { cat: Category; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = cat.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded-lg transition-colors group"
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab shrink-0" />
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="shrink-0">
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : <span className="w-4" />}
        <span className="font-medium flex-1">{cat.name}</span>
        <Badge variant="outline" className="text-xs">{cat.slug}</Badge>
        {cat.linkedToParser && <Link2 className="h-3.5 w-3.5 text-primary" />}
        <Switch checked={cat.enabled} onCheckedChange={() => {}} />
      </div>
      {open && hasChildren && cat.children.map((c) => (
        <CategoryNode key={c.id} cat={c} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Категории</h2>
        <Button><Plus className="h-4 w-4 mr-1" />Добавить</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FolderTree className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Дерево категорий</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Input placeholder="Поиск категории..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4 max-w-sm" />
          <div className="border rounded-lg divide-y">
            {mockCategories.map((cat) => (
              <CategoryNode key={cat.id} cat={cat} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Link2 className="h-3 w-3" /> — привязана к парсеру · Drag & Drop для сортировки
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
