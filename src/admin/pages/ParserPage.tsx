import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Square, RotateCcw, Loader2 } from "lucide-react";
import { mockParserConfig, mockParserStatus, mockCategories } from "../mock-data";
import type { ParserConfig, ParserStatus } from "../types";

export default function ParserPage() {
  const [config, setConfig] = useState<ParserConfig>(mockParserConfig);
  const [status, setStatus] = useState<ParserStatus>(mockParserStatus);
  const [logs] = useState<string[]>([
    '[14:30:01] Подключение к sadovodbaza.ru...',
    '[14:30:02] Загрузка категории "Электроника"...',
    '[14:30:05] Найдено 342 объявления',
    '[14:30:06] Обработка страницы 1/15...',
  ]);

  const handleStart = () => {
    setStatus({ ...status, isRunning: true, progress: 0, totalCount: 342, startedAt: new Date().toISOString() });
    // Mock progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8;
      if (p >= 100) { p = 100; clearInterval(interval); setStatus(s => ({ ...s, isRunning: false, progress: 100, processedCount: s.totalCount })); }
      else setStatus(s => ({ ...s, progress: Math.round(p), processedCount: Math.round(s.totalCount * p / 100) }));
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Управление парсером</h2>
        <Badge variant={status.isRunning ? "default" : "secondary"}>
          {status.isRunning ? "Работает" : "Остановлен"}
        </Badge>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Управление</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleStart} disabled={status.isRunning}><Play className="h-4 w-4 mr-1" />Запустить</Button>
            <Button variant="destructive" disabled={!status.isRunning} onClick={() => setStatus({ ...mockParserStatus })}><Square className="h-4 w-4 mr-1" />Остановить</Button>
            <Button variant="outline" disabled={status.isRunning}><RotateCcw className="h-4 w-4 mr-1" />Перезапустить</Button>
          </div>
          {status.isRunning && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Прогресс: {status.processedCount}/{status.totalCount}</span>
                <span>{status.progress}%</span>
              </div>
              <Progress value={status.progress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Переключатели</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {([
              ['withPhotos', 'Парсить с фото'],
              ['saveToDB', 'Сохранять в БД'],
              ['previewOnly', 'Только предпросмотр'],
              ['autoCheckRelevance', 'Авто-проверка актуальности'],
              ['retryOnError', 'Повтор при ошибке'],
            ] as const).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <Label>{label}</Label>
                <Switch checked={config[key] as boolean} onCheckedChange={(v) => setConfig({ ...config, [key]: v })} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Фильтрация</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Категория</Label>
              <Select value={config.category || 'all'} onValueChange={(v) => setConfig({ ...config, category: v === 'all' ? '' : v })}>
                <SelectTrigger><SelectValue placeholder="Все категории" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  {mockCategories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Глубина вложенности</Label>
              <Input type="number" value={config.depthLimit} onChange={(e) => setConfig({ ...config, depthLimit: +e.target.value })} />
            </div>
            <div>
              <Label>Лимит записей</Label>
              <Input type="number" value={config.recordLimit} onChange={(e) => setConfig({ ...config, recordLimit: +e.target.value })} />
            </div>
            <div>
              <Label>Ограничение потоков</Label>
              <Input type="number" value={config.threadLimit} onChange={(e) => setConfig({ ...config, threadLimit: +e.target.value })} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cron */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Расписание (cron)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input value={config.cronExpression} onChange={(e) => setConfig({ ...config, cronExpression: e.target.value })} className="max-w-xs font-mono" />
            <span className="text-sm text-muted-foreground">Каждые 6 часов</span>
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Логи выполнения</CardTitle></CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-3 font-mono text-xs space-y-1 max-h-48 overflow-auto">
            {logs.map((l, i) => <div key={i} className="text-muted-foreground">{l}</div>)}
            {status.isRunning && <div className="text-primary flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" />Обработка...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
