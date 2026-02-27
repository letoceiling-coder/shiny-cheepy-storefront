import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockUser } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Save, MapPin, Plus } from "lucide-react";

const PersonalDataPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [birthday, setBirthday] = useState(mockUser.birthday);
  const [subscribed, setSubscribed] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Личные данные</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Имя</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Телефон</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Дата рождения</label>
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}
            className="w-full py-2.5 px-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      {/* Addresses */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Адреса доставки</h3>
        <div className="space-y-2">
          {mockUser.addresses.map((addr, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-foreground">{addr}</span>
            </div>
          ))}
          <button className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Plus className="w-4 h-4" />Добавить адрес
          </button>
        </div>
      </div>

      {/* PVZ */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Адреса ПВЗ</h3>
        <div className="space-y-2">
          {mockUser.pvzAddresses.map((addr, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground">{addr}</span>
            </div>
          ))}
          <button className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Plus className="w-4 h-4" />Добавить ПВЗ
          </button>
        </div>
      </div>

      {/* Referral code */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Реферальный код</h3>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
          <span className="text-sm font-mono font-bold text-primary">{mockUser.referralCode}</span>
          <button onClick={() => navigator.clipboard.writeText(mockUser.referralCode)} className="text-xs text-primary hover:underline">Копировать</button>
        </div>
      </div>

      {/* Subscribe */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={subscribed} onChange={e => setSubscribed(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary" />
        <span className="text-sm text-foreground">Подписка на акции и скидки</span>
      </label>

      {/* Social */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Социальные сети</h3>
        <div className="flex gap-3">
          {["VK", "Google", "Яндекс"].map(s => (
            <button key={s} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              Привязать {s}
            </button>
          ))}
        </div>
      </div>

      <Button className="gradient-primary text-primary-foreground rounded-lg gap-2">
        <Save className="w-4 h-4" />Сохранить изменения
      </Button>
    </div>
  );
};

export default PersonalDataPage;
