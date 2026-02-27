import { Package, PlusCircle, AlertTriangle, Clock, Activity, Brain, Zap, Bug } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDashboard, mockLogs } from "../mock-data";

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-muted text-muted-foreground',
  error: 'bg-destructive/10 text-destructive',
  running: 'bg-emerald-100 text-emerald-800',
  stopped: 'bg-muted text-muted-foreground',
  paused: 'bg-amber-100 text-amber-800',
};

export default function DashboardPage() {
  const d = mockDashboard;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Всего объявлений" value={d.totalProducts.toLocaleString()} icon={Package} />
        <StatCard title="Новые сегодня" value={d.newToday} icon={PlusCircle} variant="success" trend="+12% к вчера" />
        <StatCard title="Отключены" value={d.disabled} icon={AlertTriangle} variant="warning" />
        <StatCard title="Ошибки" value={d.errors} icon={AlertTriangle} variant="error" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Bug className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Последний парсинг</p>
              <p className="font-medium">{new Date(d.lastParserRun).toLocaleString('ru')}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">AI статус</p>
              <Badge className={statusColors[d.aiStatus]}>{d.aiStatus}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Планировщик</p>
              <Badge className={statusColors[d.schedulerStatus]}>{d.schedulerStatus}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Последние события</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  log.level === 'error' ? 'bg-destructive' : log.level === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="text-muted-foreground shrink-0 w-14">{new Date(log.timestamp).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}</span>
                <Badge variant="outline" className="shrink-0 text-xs">{log.module}</Badge>
                <span className="text-foreground">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
