import { Tag, Copy, Check } from "lucide-react";
import { mockCoupons } from "@/data/mock-data";
import { useState } from "react";

const CouponsPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const activeCoupons = mockCoupons.filter(c => !c.used);
  const usedCoupons = mockCoupons.filter(c => c.used);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Купоны и скидки</h2>

      {activeCoupons.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-foreground mb-3">Активные</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {activeCoupons.map(c => (
              <div key={c.id} className="p-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{c.type === "percent" ? `-${c.discount}%` : `-${c.discount} ₽`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-foreground">{c.code}</span>
                  <button onClick={() => copyCode(c.id, c.code)} className="text-primary hover:underline text-xs flex items-center gap-1">
                    {copiedId === c.id ? <><Check className="w-3 h-3" />Скопировано</> : <><Copy className="w-3 h-3" />Копировать</>}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">До {c.expiresAt}{c.minOrder ? ` · от ${c.minOrder.toLocaleString()} ₽` : ""}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {usedCoupons.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Использованные</h3>
          <div className="space-y-2">
            {usedCoupons.map(c => (
              <div key={c.id} className="p-3 rounded-xl border border-border opacity-50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-muted-foreground">{c.code}</span>
                  <span className="text-sm text-muted-foreground">{c.type === "percent" ? `-${c.discount}%` : `-${c.discount} ₽`}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CouponsPage;
