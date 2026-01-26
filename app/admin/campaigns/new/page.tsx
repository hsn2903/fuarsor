import { CampaignForm } from "@/features/campaign/components/campaign-form";

export default function NewCampaignPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Yeni Kampanya</h2>
            <p className="text-sm text-muted-foreground">
              Yeni bir kampanya oluşturun
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <CampaignForm />
        </div>
      </div>
    </div>
  );
}
