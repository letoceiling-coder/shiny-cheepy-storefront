import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Download, Upload, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Настройки</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Settings className="h-5 w-5" />Общие</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Название сайта</Label>
              <Input defaultValue="sadovodbaza.ru" />
            </div>
            <div>
              <Label>URL парсера</Label>
              <Input defaultValue="https://sadovodbaza.ru" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Уведомления об ошибках</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Автозапуск при старте</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5" />Безопасность</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Rate limiting</Label>
              <Switch defaultChecked />
            </div>
            <div>
              <Label>Максимум запросов / мин</Label>
              <Input type="number" defaultValue={60} />
            </div>
            <div className="flex items-center justify-between">
              <Label>XSS защита</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Логирование API</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Импорт / Экспорт</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full"><Download className="h-4 w-4 mr-2" />Экспорт CSV</Button>
            <Button variant="outline" className="w-full"><Upload className="h-4 w-4 mr-2" />Импорт CSV</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Проверка актуальности</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Автоотключение устаревших</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Обновление цен</Label>
              <Switch defaultChecked />
            </div>
            <div>
              <Label>Порог устаревания (дней)</Label>
              <Input type="number" defaultValue={30} />
            </div>
            <Button className="w-full">Запустить проверку</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
