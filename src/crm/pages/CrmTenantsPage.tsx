import { PageHeader } from "../components/PageHeader";
import { DataTable, Column } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "@/components/ui/button";
import { tenants } from "../tenant/mock-tenants";
import { Tenant } from "../tenant/types";
import { Link } from "react-router-dom";
import { Plus, Globe, Users, Store, Package } from "lucide-react";
import { PermissionGate } from "../rbac/PermissionGate";

export default function CrmTenantsPage() {
  const columns: Column<Tenant>[] = [
    { key: "logo", title: "", className: "w-12", render: (t) => <span className="text-2xl">{t.logo}</span> },
    { key: "name", title: "Маркетплейс", render: (t) => <span className="font-medium text-sm">{t.name}</span> },
    { key: "domain", title: "Домен", render: (t) => <span className="text-sm text-muted-foreground">{t.domain}</span> },
    { key: "status", title: "Статус", render: (t) => <StatusBadge status={t.status} /> },
    { key: "sellersCount", title: "Продавцы", render: (t) => <span className="flex items-center gap-1 text-sm"><Store className="h-3 w-3" />{t.sellersCount}</span> },
    { key: "usersCount", title: "Пользователи", render: (t) => <span className="flex items-center gap-1 text-sm"><Users className="h-3 w-3" />{t.usersCount}</span>, className: "hidden md:table-cell" },
    { key: "productsCount", title: "Товары", render: (t) => <span className="flex items-center gap-1 text-sm"><Package className="h-3 w-3" />{t.productsCount}</span>, className: "hidden lg:table-cell" },
    { key: "commission", title: "Комиссия", render: (t) => `${t.commission}%` },
    { key: "currency", title: "Валюта", className: "hidden lg:table-cell" },
  ];

  return (
    <PermissionGate permission="tenants.manage" showForbidden>
      <div className="space-y-4 animate-fade-in">
        <PageHeader
          title="Маркетплейсы"
          description={`${tenants.length} маркетплейсов`}
          actions={<Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Новый маркетплейс</Button>}
        />
        <DataTable data={tenants} columns={columns} onRowClick={(t) => {}} />
      </div>
    </PermissionGate>
  );
}
