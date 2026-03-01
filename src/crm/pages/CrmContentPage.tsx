import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { GripVertical, Eye, EyeOff, Pencil, ChevronRight } from "lucide-react";

interface ContentBlock {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  position: number;
}

const initialBlocks: ContentBlock[] = [
  { id: "hero", name: "Hero слайдер", type: "slider", enabled: true, position: 1 },
  { id: "categories", name: "Популярные категории", type: "icons", enabled: true, position: 2 },
  { id: "hot", name: "Горячие предложения", type: "products", enabled: true, position: 3 },
  { id: "promo", name: "Промо баннеры", type: "banners", enabled: true, position: 4 },
  { id: "best", name: "Хиты продаж", type: "products", enabled: true, position: 5 },
  { id: "look", name: "Лук дня", type: "editorial", enabled: true, position: 6 },
  { id: "trending", name: "Трендовые товары", type: "products", enabled: true, position: 7 },
  { id: "reviews", name: "Отзывы покупателей", type: "reviews", enabled: true, position: 8 },
  { id: "brands", name: "Бренды", type: "logos", enabled: true, position: 9 },
  { id: "sellers", name: "Популярные продавцы", type: "sellers", enabled: true, position: 10 },
  { id: "discount", name: "Блок со скидкой", type: "promo", enabled: true, position: 11 },
  { id: "map", name: "Карта", type: "map", enabled: true, position: 12 },
];

export default function CrmContentPage() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(blocks[0]);
  const [editTitle, setEditTitle] = useState("");

  const toggleBlock = (id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));
  };

  const moveBlock = (id: string, dir: -1 | 1) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if ((dir === -1 && idx === 0) || (dir === 1 && idx === prev.length - 1)) return prev;
      const next = [...prev];
      [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
      return next.map((b, i) => ({ ...b, position: i + 1 }));
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Управление контентом"
        description="Визуальный редактор блоков главной страницы"
        actions={<Button size="sm">Сохранить изменения</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block list */}
        <div className="lg:col-span-2 space-y-1">
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => { setSelectedBlock(block); setEditTitle(block.name); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md border transition-colors cursor-pointer ${
                selectedBlock?.id === block.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
              }`}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xs text-muted-foreground w-5">{block.position}</span>
                <span className="text-sm font-medium truncate">{block.name}</span>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{block.type}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }} className="text-muted-foreground hover:text-foreground p-0.5" title="Вверх">
                  <ChevronRight className="h-3.5 w-3.5 -rotate-90" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }} className="text-muted-foreground hover:text-foreground p-0.5" title="Вниз">
                  <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                </button>
                <Switch
                  checked={block.enabled}
                  onCheckedChange={() => toggleBlock(block.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="scale-75"
                />
                {block.enabled ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>

        {/* Properties panel */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-4 h-fit sticky top-20">
          {selectedBlock ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Pencil className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Свойства блока</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Заголовок</label>
                  <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Тип</label>
                  <Input value={selectedBlock.type} disabled className="h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Позиция</label>
                  <Input value={selectedBlock.position} disabled className="h-8 text-sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Активен</span>
                  <Switch checked={selectedBlock.enabled} onCheckedChange={() => toggleBlock(selectedBlock.id)} />
                </div>
                <div className="pt-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Описание</label>
                  <Input placeholder="Описание блока..." className="h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">CTA текст</label>
                  <Input placeholder="Смотреть все" className="h-8 text-sm" />
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="rounded-md bg-muted/50 p-6 text-center">
                  <p className="text-xs text-muted-foreground">Live Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedBlock.name}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Выберите блок для редактирования</p>
          )}
        </div>
      </div>
    </div>
  );
}
