import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockCards = [
  { id: "1", type: "Visa", last4: "4242", expiry: "12/26" },
  { id: "2", type: "Mastercard", last4: "1234", expiry: "08/25" },
];

const PaymentMethodsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Способы оплаты</h2>

      <div className="space-y-3 mb-6">
        {mockCards.map(card => (
          <div key={card.id} className="flex items-center justify-between p-4 rounded-2xl border border-border">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{card.type} •••• {card.last4}</p>
                <p className="text-xs text-muted-foreground">Действует до {card.expiry}</p>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="rounded-lg gap-2"><Plus className="w-4 h-4" />Добавить карту</Button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Другие способы</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["QIWI", "ЮMoney", "СБП"].map(m => (
            <div key={m} className="p-4 rounded-xl border border-border text-center">
              <p className="text-sm font-medium text-foreground">{m}</p>
              <p className="text-xs text-muted-foreground mt-1">Не привязан</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
