import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuperAdminPage = () => {
  return (
    <div>
      <h2>Super Admin</h2>
      <p>Bu alanda super admin yetkilerini göreceğiz</p>

      <div className="flex gap-2">
        {/* Kullanıcıları yönet */}
        <Button variant="default" asChild>
          <Link href="/admin/users">Kullanıcıları Yönet</Link>
        </Button>
        {/* Fuarları yönet */}
        <Button variant="default" asChild>
          <Link href="/admin/fair-scraping">Fuarları Yönet</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminPage;
