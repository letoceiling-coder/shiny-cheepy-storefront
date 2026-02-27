import { Wallet, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUser, mockBalanceHistory } from "@/data/mock-data";

const BalancePage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Баланс</h2>

      <div className="gradient-primary rounded-2xl p-6 text-primary-foreground mb-6">
        <p className="text-sm opacity-80 mb-1">Текущий баланс</p>
        <p className="text-3xl font-bold mb-4">{mockUser.balance.toLocaleString()} ₽</p>
        <Button className="bg-background text-foreground hover:bg-background/90 rounded-lg gap-2">
          <Plus className="w-4 h-4" />Пополнить
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-3">История операций</h3>
      <div className="space-y-2">
        {mockBalanceHistory.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {item.type === "credit" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-sm text-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${item.type === "credit" ? "text-green-600" : "text-foreground"}`}>
              {item.type === "credit" ? "+" : "-"}{item.amount.toLocaleString()} ₽
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalancePage;
