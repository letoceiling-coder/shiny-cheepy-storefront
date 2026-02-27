import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChangePasswordPage = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Смена пароля</h2>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Текущий пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type={showCurrent ? "text" : "password"} value={current} onChange={e => setCurrent(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Новый пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type={showNew ? "text" : "password"} value={newPass} onChange={e => setNewPass(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Подтвердите пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
          </div>
          {confirm && newPass !== confirm && <p className="text-xs text-destructive mt-1">Пароли не совпадают</p>}
        </div>

        <Button type="submit" className="gradient-primary text-primary-foreground rounded-lg">Сменить пароль</Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
