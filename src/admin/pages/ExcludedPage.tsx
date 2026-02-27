import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ban, Plus, Trash2 } from "lucide-react";
import { mockExcludedWords, mockCategories } from "../mock-data";
import type { ExcludedWord } from "../types";

const typeLabels: Record<string, string> = { word: 'Слово', phrase: 'Фраза', regex: 'Regex' };
const actionLabels: Record<string, string> = { delete: 'Удалить', replace: 'Заменить', hide: 'Скрыть', flag: 'Пометить' };
const scopeLabels: Record<string, string> = { global: 'Глобально', category: 'Категория', product_type: 'Тип товара', temporary: 'Временное' };

const actionColors: Record<string, string> = {
  delete: 'bg-destructive/10 text-destructive',
  replace: 'bg-amber-100 text-amber-800',
  hide: 'bg-muted text-muted-foreground',
  flag: 'bg-blue-100 text-blue-800',
};

const scopeColors: Record<string, string> = {
  global: 'bg-primary/10 text-primary',
  category: 'bg-emerald-100 text-emerald-800',
  product_type: 'bg-violet-100 text-violet-800',
  temporary: 'bg-orange-100 text-orange-800',
};

export default function ExcludedPage() {
  const [words, setWords] = useState<ExcludedWord[]>(mockExcludedWords);
  const [newWord, setNewWord] = useState('');
  const [newType, setNewType] = useState<ExcludedWord['type']>('word');
  const [newAction, setNewAction] = useState<ExcludedWord['action']>('delete');
  const [newScope, setNewScope] = useState<ExcludedWord['scope']>('global');
  const [scopeFilter, setScopeFilter] = useState<string>('all');

  const handleAdd = () => {
    if (!newWord.trim()) return;
    setWords([...words, {
      id: `ew-${Date.now()}`,
      word: newWord,
      type: newType,
      action: newAction,
      scope: newScope,
      matchCount: 0,
    }]);
    setNewWord('');
  };

  const filtered = scopeFilter === 'all' ? words : words.filter(w => w.scope === scopeFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Исключающие слова</h2>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Ban className="h-5 w-5" />Добавить правило</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Слово или фраза..." value={newWord} onChange={(e) => setNewWord(e.target.value)} className="flex-1 min-w-[200px]" />
            <Select value={newType} onValueChange={(v: ExcludedWord['type']) => setNewType(v)}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="word">Слово</SelectItem>
                <SelectItem value="phrase">Фраза</SelectItem>
                <SelectItem value="regex">Regex</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newAction} onValueChange={(v: ExcludedWord['action']) => setNewAction(v)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Удалить</SelectItem>
                <SelectItem value="replace">Заменить</SelectItem>
                <SelectItem value="hide">Скрыть</SelectItem>
                <SelectItem value="flag">Пометить</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newScope} onValueChange={(v: ExcludedWord['scope']) => setNewScope(v)}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Глобально</SelectItem>
                <SelectItem value="category">Категория</SelectItem>
                <SelectItem value="product_type">Тип товара</SelectItem>
                <SelectItem value="temporary">Временное</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-1" />Добавить</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={scopeFilter} onValueChange={setScopeFilter}>
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="global">Глобальные</TabsTrigger>
          <TabsTrigger value="category">По категории</TabsTrigger>
          <TabsTrigger value="product_type">По типу</TabsTrigger>
          <TabsTrigger value="temporary">Временные</TabsTrigger>
        </TabsList>

        <TabsContent value={scopeFilter}>
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Выражение</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Действие</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>Замена</TableHead>
                    <TableHead className="text-right">Совпадений</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((w) => (
                    <TableRow key={w.id}>
                      <TableCell className="font-mono text-sm">{w.word}</TableCell>
                      <TableCell><Badge variant="outline">{typeLabels[w.type]}</Badge></TableCell>
                      <TableCell><Badge className={actionColors[w.action]}>{actionLabels[w.action]}</Badge></TableCell>
                      <TableCell><Badge className={scopeColors[w.scope]}>{scopeLabels[w.scope]}{w.categoryId ? ` (${w.categoryId})` : ''}{w.productType ? ` (${w.productType})` : ''}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{w.replacement || '—'}</TableCell>
                      <TableCell className="text-right">{w.matchCount}</TableCell>
                      <TableCell><Button variant="ghost" size="icon" onClick={() => setWords(words.filter(x => x.id !== w.id))}><Trash2 className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Нет правил</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
