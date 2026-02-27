import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Download } from "lucide-react";
import { mockLogs } from "../mock-data";

const levelColors = { info: 'bg-emerald-100 text-emerald-800', warn: 'bg-amber-100 text-amber-800', error: 'bg-destructive/10 text-destructive' };

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [moduleFilter, setModuleFilter] = useState<string>('all');

  const modules = [...new Set(mockLogs.map(l => l.module))];
  const filtered = mockLogs.filter(l =>
    (levelFilter === 'all' || l.level === levelFilter) &&
    (moduleFilter === 'all' || l.module === moduleFilter) &&
    (search === '' || l.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Логи</h2>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Экспорт</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все модули</SelectItem>
                {modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filtered.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm border">
                <span className="text-muted-foreground shrink-0 w-16 font-mono text-xs mt-0.5">
                  {new Date(log.timestamp).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <Badge className={`shrink-0 ${levelColors[log.level]}`}>{log.level}</Badge>
                <Badge variant="outline" className="shrink-0">{log.module}</Badge>
                <div className="flex-1">
                  <p>{log.message}</p>
                  {log.details && <p className="text-xs text-muted-foreground mt-1">{log.details}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Показано {filtered.length} записей</p>
        </CardContent>
      </Card>
    </div>
  );
}
