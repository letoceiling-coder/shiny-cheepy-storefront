import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Type, Image, MousePointer, Minus, Columns, Flag, GripVertical, Eye } from "lucide-react";

interface Block {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'columns' | 'banner';
  label: string;
}

const blockTypes: { type: Block['type']; label: string; icon: React.ElementType }[] = [
  { type: 'text', label: 'Текст', icon: Type },
  { type: 'image', label: 'Картинка', icon: Image },
  { type: 'button', label: 'Кнопка', icon: MousePointer },
  { type: 'divider', label: 'Разделитель', icon: Minus },
  { type: 'columns', label: 'Колонки', icon: Columns },
  { type: 'banner', label: 'Баннер', icon: Flag },
];

const templates = [
  { id: 'T1', name: 'Регистрация', blocks: 4, updatedAt: '2025-02-28' },
  { id: 'T2', name: 'Заказ создан', blocks: 6, updatedAt: '2025-02-25' },
  { id: 'T3', name: 'Заказ отправлен', blocks: 5, updatedAt: '2025-02-20' },
  { id: 'T4', name: 'Возврат', blocks: 4, updatedAt: '2025-02-15' },
  { id: 'T5', name: 'Промо рассылка', blocks: 8, updatedAt: '2025-02-10' },
];

export default function CrmTemplatesPage() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'banner', label: 'Баннер' },
    { id: '2', type: 'text', label: 'Текст' },
    { id: '3', type: 'button', label: 'Кнопка' },
    { id: '4', type: 'divider', label: 'Разделитель' },
  ]);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const addBlock = (type: Block['type'], label: string) => {
    setBlocks(prev => [...prev, { id: String(Date.now()), type, label }]);
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Конструктор шаблонов" description="Визуальный Email Builder" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Templates list */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-medium mb-2">Шаблоны</h3>
          {templates.map(t => (
            <div
              key={t.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${activeTemplate === t.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-accent/5'}`}
              onClick={() => setActiveTemplate(t.id)}
            >
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.blocks} блоков • {t.updatedAt}</p>
            </div>
          ))}
        </div>

        {/* Builder area */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Конструктор</h3>
            <Button size="sm" variant="outline" className="gap-1.5"><Eye className="h-3.5 w-3.5" /> Предпросмотр</Button>
          </div>
          <div className="border border-border rounded-lg bg-card p-4 min-h-[400px] space-y-2">
            {blocks.map(block => (
              <div key={block.id} className="flex items-center gap-2 p-3 rounded-md border border-border bg-background group">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="flex-1">
                  {block.type === 'banner' && <div className="h-16 rounded bg-primary/10 flex items-center justify-center text-xs text-muted-foreground">Баннер</div>}
                  {block.type === 'text' && <div className="text-sm text-muted-foreground">Текстовый блок — нажмите для редактирования</div>}
                  {block.type === 'button' && <div className="flex justify-center"><div className="px-6 py-2 rounded bg-primary text-primary-foreground text-sm">Кнопка</div></div>}
                  {block.type === 'divider' && <hr className="border-border" />}
                  {block.type === 'columns' && <div className="grid grid-cols-2 gap-2"><div className="h-12 rounded bg-muted" /><div className="h-12 rounded bg-muted" /></div>}
                  {block.type === 'image' && <div className="h-20 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">Изображение</div>}
                </div>
                <button onClick={() => removeBlock(block.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Block palette */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-medium mb-2">Блоки</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {blockTypes.map(bt => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type, bt.label)}
                className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors text-left"
              >
                <bt.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{bt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
