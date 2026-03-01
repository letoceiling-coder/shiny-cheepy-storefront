import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { regions, Region } from "../mock/regions";
import { ChevronRight, ChevronDown, MapPin, Globe } from "lucide-react";

function RegionRow({ region, depth = 0 }: { region: Region; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = region.children && region.children.length > 0;

  return (
    <>
      <div
        className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
        style={{ marginLeft: depth * 24 }}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <button onClick={() => setExpanded(!expanded)} className="p-0.5">
              {expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </button>
          ) : (
            <span className="w-5" />
          )}
          {region.type === 'country' ? <Globe className="h-4 w-4 text-muted-foreground" /> : <MapPin className="h-4 w-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{region.name}</span>
          <span className="text-xs text-muted-foreground capitalize">({region.type})</span>
          {region.deliveryRestricted && <StatusBadge status="restricted" />}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Налог: {region.taxRate}%</span>
          <span>{region.currency}</span>
          <Switch checked={region.active} />
        </div>
      </div>
      {expanded && hasChildren && region.children!.map(child => (
        <RegionRow key={child.id} region={child} depth={depth + 1} />
      ))}
    </>
  );
}

export default function CrmRegionsPage() {
  return (
    <div className="space-y-4 animate-fade-in">
      <PageHeader title="Регионы и города" description="Иерархия регионов, налоги и ограничения доставки" />
      <div className="space-y-2">
        {regions.map(r => <RegionRow key={r.id} region={r} />)}
      </div>
    </div>
  );
}
