import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { crmCategories, CrmCategory } from "../data/mock-data";
import { Plus, ChevronRight, GripVertical, Pencil, FolderTree } from "lucide-react";

export default function CrmCategoriesPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(crmCategories.filter(c => c.children?.length).map(c => c.id)));

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderCategory = (cat: CrmCategory, depth = 0) => (
    <div key={cat.id}>
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-border hover:bg-muted/30 transition-colors"
        style={{ paddingLeft: `${12 + depth * 24}px` }}
      >
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab shrink-0" />
        {cat.children?.length ? (
          <button onClick={() => toggle(cat.id)} className="p-0.5">
            <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expanded.has(cat.id) ? 'rotate-90' : ''}`} />
          </button>
        ) : (
          <span className="w-4.5" />
        )}
        <FolderTree className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium flex-1">{cat.name}</span>
        <span className="text-xs text-muted-foreground">{cat.productsCount} товаров</span>
        <Switch checked={cat.active} className="scale-75" />
        <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
      </div>
      {cat.children && expanded.has(cat.id) && cat.children.map(child => renderCategory(child, depth + 1))}
    </div>
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader
        title="Категории"
        description={`${crmCategories.length} категорий`}
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Добавить категорию</Button>}
      />
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <div className="flex items-center gap-3 px-3 py-2 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span className="flex-1 pl-16">Название</span>
          <span className="w-24 text-right">Товары</span>
          <span className="w-16 text-center">Статус</span>
          <span className="w-8" />
        </div>
        {crmCategories.map(cat => renderCategory(cat))}
      </div>
    </div>
  );
}
