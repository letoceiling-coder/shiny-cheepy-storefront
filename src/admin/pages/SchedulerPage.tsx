import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Play, Plus } from "lucide-react";
import { mockSchedulerTasks } from "../mock-data";

const statusColors = { idle: 'bg-muted text-muted-foreground', running: 'bg-emerald-100 text-emerald-800', error: 'bg-destructive/10 text-destructive' };
const typeLabels = { parsing: 'Парсинг', relevance: 'Актуальность', ai_processing: 'AI обработка' };

export default function SchedulerPage() {
  const [tasks, setTasks] = useState(mockSchedulerTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Планировщик</h2>
        <Button><Plus className="h-4 w-4 mr-1" />Новая задача</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5" />Задачи</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Вкл</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Cron</TableHead>
                <TableHead>Последний запуск</TableHead>
                <TableHead>Следующий</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell><Switch checked={t.enabled} onCheckedChange={() => toggleTask(t.id)} /></TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell><Badge variant="outline">{typeLabels[t.type]}</Badge></TableCell>
                  <TableCell className="font-mono text-xs">{t.cronExpression}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{t.lastRun ? new Date(t.lastRun).toLocaleString('ru') : '—'}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{typeof t.nextRun === 'string' && t.nextRun !== '—' ? new Date(t.nextRun).toLocaleString('ru') : '—'}</TableCell>
                  <TableCell><Badge className={statusColors[t.status]}>{t.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon"><Play className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Cron конструктор</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {['Каждый час', 'Каждые 6 ч', 'Раз в сутки', 'Каждые 30 мин'].map((label) => (
              <Button key={label} variant="outline" size="sm">{label}</Button>
            ))}
          </div>
          <div className="mt-4">
            <Label>Произвольный cron</Label>
            <Input placeholder="*/30 * * * *" className="max-w-xs font-mono mt-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
