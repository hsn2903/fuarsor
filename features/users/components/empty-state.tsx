import { UserX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-muted/10 border-dashed">
      <div className="bg-background p-3 rounded-full border mb-3 shadow-sm">
        <UserX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">Kullanıcı bulunamadı</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1">
        Aradığınız kullanıcılara ulaşılamadı. Arama filtrelerinizi kontrol edin.
      </p>
    </div>
  );
}
