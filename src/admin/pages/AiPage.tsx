import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Brain, Sparkles, FileText, Search as SearchIcon, Image, Shield, Type, Wand2 } from "lucide-react";
import { mockAiConfig, mockAiTasks } from "../mock-data";
import type { AiConfig } from "../types";

const taskTypeIcons = { title: Type, description: FileText, seo: SearchIcon, image: Image, moderation: Shield, analysis: Wand2 };
const taskStatusColors = { queued: 'bg-muted text-muted-foreground', processing: 'bg-amber-100 text-amber-800', done: 'bg-emerald-100 text-emerald-800', error: 'bg-destructive/10 text-destructive' };

export default function AiPage() {
  const [config, setConfig] = useState<AiConfig>(mockAiConfig);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Модуль</h2>
        <Badge className={config.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-muted text-muted-foreground'}>
          {config.enabled ? 'Активен' : 'Отключен'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5" />Настройки</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Включить AI</Label>
              <Switch checked={config.enabled} onCheckedChange={(v) => setConfig({ ...config, enabled: v })} />
            </div>
            <div>
              <Label>API ключ</Label>
              <Input type="password" value={config.apiKey} onChange={(e) => setConfig({ ...config, apiKey: e.target.value })} />
            </div>
            <div>
              <Label>Модель</Label>
              <Select value={config.model} onValueChange={(v) => setConfig({ ...config, model: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Лимит токенов</Label>
              <Input type="number" value={config.tokenLimit} onChange={(e) => setConfig({ ...config, tokenLimit: +e.target.value })} />
            </div>
            <Button className="w-full">Сохранить настройки</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5" />Функции</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Type, label: 'Генерация title' },
                { icon: FileText, label: 'Генерация описания' },
                { icon: Wand2, label: 'Улучшение текста' },
                { icon: SearchIcon, label: 'SEO-оптимизация' },
                { icon: Image, label: 'Генерация изображения' },
                { icon: Brain, label: 'Анализ текста' },
                { icon: Shield, label: 'Модерация' },
                { icon: Sparkles, label: 'Замена слов' },
              ].map(({ icon: Icon, label }) => (
                <Button key={label} variant="outline" className="h-auto py-3 flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Очередь задач</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Товар</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Создано</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAiTasks.map((t) => {
                const Icon = taskTypeIcons[t.type];
                return (
                  <TableRow key={t.id}>
                    <TableCell className="flex items-center gap-2"><Icon className="h-4 w-4" />{t.type}</TableCell>
                    <TableCell className="text-muted-foreground">{t.productId}</TableCell>
                    <TableCell><Badge className={taskStatusColors[t.status]}>{t.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-xs">{new Date(t.createdAt).toLocaleTimeString('ru')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
