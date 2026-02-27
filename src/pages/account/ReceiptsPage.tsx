import { FileText, Download } from "lucide-react";
import { mockReceipts } from "@/data/mock-data";

const ReceiptsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Чеки</h2>

      {mockReceipts.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <FileText className="w-16 h-16 text-border mb-4" />
          <p className="text-lg font-medium text-foreground mb-1">Чеков пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockReceipts.map(r => (
            <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl border border-border">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.id}</p>
                  <p className="text-xs text-muted-foreground">Заказ {r.orderId} · {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-foreground">{r.amount.toLocaleString()} ₽</span>
                <button className="text-primary hover:underline"><Download className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiptsPage;
