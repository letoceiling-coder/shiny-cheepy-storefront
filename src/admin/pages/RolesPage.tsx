import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, Plus, Edit } from "lucide-react";
import type { UserRole } from "../types";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

const mockUsers: User[] = [
  { id: 'u-1', name: 'Иван Петров', email: 'ivan@example.com', role: 'admin', active: true },
  { id: 'u-2', name: 'Мария Сидорова', email: 'maria@example.com', role: 'moderator', active: true },
  { id: 'u-3', name: 'Алексей Козлов', email: 'alexey@example.com', role: 'operator', active: true },
  { id: 'u-4', name: 'Ольга Новикова', email: 'olga@example.com', role: 'operator', active: false },
];

const roleBadge = (r: UserRole) => {
  const m = { admin: 'bg-destructive/10 text-destructive', moderator: 'bg-amber-100 text-amber-800', operator: 'bg-muted text-muted-foreground' };
  return <Badge className={m[r]}>{r}</Badge>;
};

const permissions = ['Парсер', 'Объявления', 'Категории', 'AI', 'Планировщик', 'Логи', 'Настройки', 'Роли'];
const rolePerms: Record<UserRole, boolean[]> = {
  admin: [true, true, true, true, true, true, true, true],
  moderator: [false, true, true, true, false, true, false, false],
  operator: [false, true, false, false, false, false, false, false],
};

export default function RolesPage() {
  const [users, setUsers] = useState(mockUsers);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Роли и доступ</h2>
        <Button><Plus className="h-4 w-4 mr-1" />Добавить пользователя</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5" />Пользователи</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Активен</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>{roleBadge(u.role)}</TableCell>
                  <TableCell><Switch checked={u.active} onCheckedChange={() => setUsers(users.map(x => x.id === u.id ? { ...x, active: !x.active } : x))} /></TableCell>
                  <TableCell><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Матрица прав</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Модуль</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Moderator</TableHead>
                <TableHead>Operator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((p, i) => (
                <TableRow key={p}>
                  <TableCell className="font-medium">{p}</TableCell>
                  {(['admin', 'moderator', 'operator'] as const).map(role => (
                    <TableCell key={role}>
                      <span className={rolePerms[role][i] ? 'text-emerald-600' : 'text-destructive'}>
                        {rolePerms[role][i] ? '✓' : '✗'}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
