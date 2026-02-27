import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ban, Plus, Trash2 } from "lucide-react";
import { mockExcludedWords } from "../mock-data";

const typeLabels = { word: 'Слово', phrase: 'Фраза', regex: 'Regex' };
const actionLabels = { delete: 'Удалить', replace: 'Заменить' };

export default function ExcludedPage() {
  const [words, setWords] = useState(mockExcludedWords);
  const [newWord, setNewWord] = useState('');
  const [newType, setNewType] = useState<'word' | 'phrase' | 'regex'>('word');

  const handleAdd = () => {
    if (!newWord.trim()) return;
    setWords([...words, { id: `ew-${Date.now()}`, word: newWord, type: newType, action: 'delete', matchCount: 0 }]);
    setNewWord('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Исключающие слова</h2>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Ban className="h-5 w-5" />Добавить</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Слово или фраза..." value={newWord} onChange={(e) => setNewWord(e.target.value)} className="flex-1 min-w-[200px]" />
            <Select value={newType} onValueChange={(v: 'word' | 'phrase' | 'regex') => setNewType(v)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="word">Слово</SelectItem>
                <SelectItem value="phrase">Фраза</SelectItem>
                <SelectItem value="regex">Regex</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-1" />Добавить</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Выражение</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Действие</TableHead>
                <TableHead>Замена</TableHead>
                <TableHead className="text-right">Совпадений</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {words.map((w) => (
                <TableRow key={w.id}>
                  <TableCell className="font-mono text-sm">{w.word}</TableCell>
                  <TableCell><Badge variant="outline">{typeLabels[w.type]}</Badge></TableCell>
                  <TableCell><Badge className={w.action === 'delete' ? 'bg-destructive/10 text-destructive' : 'bg-amber-100 text-amber-800'}>{actionLabels[w.action]}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{w.replacement || '—'}</TableCell>
                  <TableCell className="text-right">{w.matchCount}</TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => setWords(words.filter(x => x.id !== w.id))}><Trash2 className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
