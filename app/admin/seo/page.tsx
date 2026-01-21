import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SeoForm } from "./_components/seo-form";
import { getSeoDataById } from "@/app/_actions/seo";

export default async function SeoDashboard() {
  const seoData = await getSeoDataById("cmaju823n0000tpuof72oypt7");

  if (!seoData) {
    return <div>SEO verisi bulunamadı</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SEO Yönetimi</CardTitle>
        </CardHeader>
        <CardContent>
          <SeoForm seoData={seoData} />
        </CardContent>
      </Card>
    </div>
  );
}
