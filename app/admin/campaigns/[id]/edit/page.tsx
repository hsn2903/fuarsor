import { CampaignForm } from "@/features/campaign/components/campaign-form";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CampaignIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignIdPage({ params }: CampaignIdPageProps) {
  const id = (await params).id;
  // 1. Fetch the existing campaign
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
  });

  // 2. Safety check: If ID is invalid/not found, go back to list
  if (!campaign) {
    redirect("/admin/campaigns");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Edit Campaign</h2>
            <p className="text-sm text-muted-foreground">
              Edit the details of existing campaign
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          {/* 3. Pass data to the form to trigger "Edit Mode" */}
          <CampaignForm initialData={campaign} />
        </div>
      </div>
    </div>
  );
}
