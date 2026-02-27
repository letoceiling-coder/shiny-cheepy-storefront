import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Image as ImageIcon, Sparkles, Ban, Clock, Plus, Trash2, X } from "lucide-react";
import { mockProducts, mockAttributes, mockProductAttributes, mockProductHistory, mockExcludedWords, mockBrands } from "../mock-data";
import type { ProductAttribute, AttributeDefinition } from "../types";

const statusOptions = [
  { value: 'active', label: 'Активен' },
  { value: 'disabled', label: 'Черновик' },
  { value: 'archived', label: 'Архив' },
  { value: 'pending', label: 'Ожидание' },
];

const availabilityOptions = [
  { value: 'in_stock', label: 'В наличии' },
  { value: 'out_of_stock', label: 'Нет в наличии' },
  { value: 'preorder', label: 'Предзаказ' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);
  const [tab, setTab] = useState('general');

  if (!product) {
    return (
      <div className="space-y-4 animate-fade-in">
        <Link to="/admin/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Назад
        </Link>
        <p className="text-destructive">Товар не найден</p>
      </div>
    );
  }

  const attrs = mockProductAttributes[product.id] || [];
  const history = mockProductHistory[product.id] || [];
  const brand = product.brandId ? mockBrands.find(b => b.id === product.brandId) : null;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <Badge variant="outline">{product.id}</Badge>
        </div>
        <Button><Save className="h-4 w-4 mr-1" />Сохранить</Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="general">Основное</TabsTrigger>
          <TabsTrigger value="attributes">Атрибуты</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="media">Медиа</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="excluded">Исключения</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        {/* ===== ОСНОВНОЕ ===== */}
        <TabsContent value="general">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Название"><Input defaultValue={product.title} /></Field>
              <Field label="Slug"><Input defaultValue={product.slug} /></Field>
              <Field label="Категория"><Input defaultValue={product.category} /></Field>
              <Field label="Подкатегория"><Input defaultValue={product.subcategory || '—'} /></Field>
              <Field label="Цена">
                <Input type="number" defaultValue={product.price} />
              </Field>
              <Field label="Старая цена">
                <Input type="number" defaultValue={product.oldPrice ?? ''} placeholder="—" />
              </Field>
              <Field label="Валюта">
                <Select defaultValue={product.currency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUB">RUB</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Наличие">
                <Select defaultValue={product.availability}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Количество"><Input type="number" defaultValue={product.quantity} /></Field>
              <Field label="Статус">
                <Select defaultValue={product.status}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Бренд">
                <Select defaultValue={product.brandId ?? 'none'}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Нет —</SelectItem>
                    {mockBrands.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Источник"><Input defaultValue={product.source} readOnly className="bg-muted" /></Field>
              <Field label="Дата парсинга"><Input defaultValue={new Date(product.parsedAt).toLocaleString('ru')} readOnly className="bg-muted" /></Field>
              <Field label="Проверка актуальности"><Input defaultValue={product.relevanceCheckedAt ? new Date(product.relevanceCheckedAt).toLocaleString('ru') : '—'} readOnly className="bg-muted" /></Field>
              <div className="md:col-span-2">
                <Field label="Описание">
                  <textarea defaultValue={product.description} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </Field>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== АТРИБУТЫ (EAV) ===== */}
        <TabsContent value="attributes">
          <AttributesTab productId={product.id} attrs={attrs} />
        </TabsContent>

        {/* ===== ХАРАКТЕРИСТИКИ ===== */}
        <TabsContent value="specs">
          <Card>
            <CardHeader><CardTitle className="text-lg">Характеристики</CardTitle></CardHeader>
            <CardContent>
              {attrs.length === 0 ? (
                <p className="text-muted-foreground text-sm">Нет заполненных атрибутов. Добавьте на вкладке «Атрибуты».</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Параметр</TableHead>
                      <TableHead>Значение</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attrs.map(a => {
                      const def = mockAttributes.find(d => d.id === a.attributeId);
                      return (
                        <TableRow key={a.attributeId}>
                          <TableCell className="font-medium">{def?.name ?? a.attributeId}</TableCell>
                          <TableCell>{String(a.value)}{def?.unit ? ` ${def.unit}` : ''}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== МЕДИА ===== */}
        <TabsContent value="media">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5" />Медиа</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                  </div>
                ))}
                <button className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary transition-colors">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== AI ===== */}
        <TabsContent value="ai">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5" />AI обработка</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">AI статус:</span>
                <Badge className={product.aiStatus === 'processed' ? 'bg-emerald-100 text-emerald-800' : product.aiStatus === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-amber-100 text-amber-800'}>
                  {product.aiStatus}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1" />Генерировать заголовок</Button>
                <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1" />Генерировать описание</Button>
                <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1" />SEO оптимизация</Button>
                <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1" />Модерация</Button>
              </div>
              <p className="text-sm text-muted-foreground">AI автоматически проверяет текст на исключающие слова и очищает при генерации.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== ИСКЛЮЧЕНИЯ ===== */}
        <TabsContent value="excluded">
          <ProductExclusionsTab productId={product.id} title={product.title} description={product.description} category={product.category} />
        </TabsContent>

        {/* ===== ИСТОРИЯ ===== */}
        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5" />История изменений</CardTitle></CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-muted-foreground text-sm">Нет записей</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Поле</TableHead>
                      <TableHead>Было</TableHead>
                      <TableHead>Стало</TableHead>
                      <TableHead>Источник</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map(h => (
                      <TableRow key={h.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(h.timestamp).toLocaleString('ru')}</TableCell>
                        <TableCell className="font-medium">{h.field}</TableCell>
                        <TableCell className="text-muted-foreground max-w-[150px] truncate">{h.oldValue}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{h.newValue}</TableCell>
                        <TableCell><Badge variant="outline">{h.source}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ===== Attributes Tab Component ===== */
function AttributesTab({ productId, attrs }: { productId: string; attrs: ProductAttribute[] }) {
  const [localAttrs, setLocalAttrs] = useState<ProductAttribute[]>(attrs);
  const [addingId, setAddingId] = useState<string>('');

  const usedIds = new Set(localAttrs.map(a => a.attributeId));
  const available = mockAttributes.filter(a => !usedIds.has(a.id));

  const handleAdd = () => {
    if (!addingId) return;
    const def = mockAttributes.find(a => a.id === addingId);
    if (!def) return;
    const defaultVal = def.type === 'number' ? 0 : def.type === 'boolean' ? false : def.type === 'multiselect' ? [] : '';
    setLocalAttrs([...localAttrs, { attributeId: addingId, value: defaultVal }]);
    setAddingId('');
  };

  const updateValue = (attrId: string, value: ProductAttribute['value']) => {
    setLocalAttrs(localAttrs.map(a => a.attributeId === attrId ? { ...a, value } : a));
  };

  const remove = (attrId: string) => {
    setLocalAttrs(localAttrs.filter(a => a.attributeId !== attrId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Атрибуты (EAV)</CardTitle>
          <div className="flex gap-2">
            <Select value={addingId} onValueChange={setAddingId}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Добавить атрибут…" /></SelectTrigger>
              <SelectContent>
                {available.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleAdd} disabled={!addingId}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {localAttrs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет атрибутов. Добавьте из списка выше.</p>
        ) : (
          <div className="space-y-3">
            {localAttrs.map(a => {
              const def = mockAttributes.find(d => d.id === a.attributeId);
              if (!def) return null;
              return (
                <div key={a.attributeId} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-40 shrink-0">{def.name}{def.unit ? ` (${def.unit})` : ''}</span>
                  <AttributeInput def={def} value={a.value} onChange={(v) => updateValue(a.attributeId, v)} />
                  <Button variant="ghost" size="icon" onClick={() => remove(a.attributeId)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AttributeInput({ def, value, onChange }: { def: AttributeDefinition; value: ProductAttribute['value']; onChange: (v: ProductAttribute['value']) => void }) {
  if (def.type === 'select' && def.options) {
    return (
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
        <SelectContent>
          {def.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    );
  }
  if (def.type === 'multiselect' && def.options) {
    const selected = Array.isArray(value) ? value as string[] : [];
    return (
      <div className="flex flex-wrap gap-1.5 flex-1">
        {def.options.map(o => (
          <label key={o} className="flex items-center gap-1 text-sm">
            <Checkbox checked={selected.includes(o)} onCheckedChange={(c) => {
              onChange(c ? [...selected, o] : selected.filter(s => s !== o));
            }} />
            {o}
          </label>
        ))}
      </div>
    );
  }
  if (def.type === 'boolean') {
    return <Checkbox checked={!!value} onCheckedChange={onChange} />;
  }
  if (def.type === 'number') {
    return <Input type="number" value={String(value)} onChange={e => onChange(Number(e.target.value))} className="flex-1" />;
  }
  if (def.type === 'text') {
    return <textarea value={String(value)} onChange={e => onChange(e.target.value)} className="flex-1 min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm" />;
  }
  return <Input value={String(value)} onChange={e => onChange(e.target.value)} className="flex-1" />;
}

/* ===== Product Exclusions Tab ===== */
function ProductExclusionsTab({ productId, title, description, category }: { productId: string; title: string; description: string; category: string }) {
  const [selectedWord, setSelectedWord] = useState('');

  const words = title.split(/\s+/).concat(description.split(/\s+/)).filter(Boolean);
  const uniqueWords = [...new Set(words.map(w => w.replace(/[.,!?;:]/g, '').toLowerCase()).filter(w => w.length > 2))];

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Ban className="h-5 w-5" />Исключения для товара</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Выделите слово из заголовка или описания:</p>
          <div className="flex flex-wrap gap-1.5">
            {uniqueWords.slice(0, 30).map(w => (
              <button
                key={w}
                onClick={() => setSelectedWord(w)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${selectedWord === w ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border hover:border-primary'}`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {selectedWord && (
          <div className="border rounded-lg p-4 space-y-3">
            <p className="text-sm">Слово: <span className="font-mono font-bold">{selectedWord}</span></p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline"><Ban className="h-4 w-4 mr-1" />Глобальное исключение</Button>
              <Button size="sm" variant="outline"><Ban className="h-4 w-4 mr-1" />Для категории «{category}»</Button>
              <Button size="sm" variant="outline"><Ban className="h-4 w-4 mr-1" />Только для этого товара</Button>
              <Button size="sm" variant="outline">Заменить автоматически</Button>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium mb-2">Активные исключения для этого товара:</p>
          {mockExcludedWords.filter(e => e.scope === 'category' && e.categoryId === '2' && category === 'Одежда').length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет специфичных исключений</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {mockExcludedWords.filter(e => e.scope === 'category').map(e => (
                <Badge key={e.id} variant="outline">{e.word}</Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
