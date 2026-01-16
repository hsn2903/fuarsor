"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CampaignFormValues, CampaignSchema } from "./schemas";
import prisma from "@/lib/prisma";

// 1. Create Action
export async function createCampaign(data: CampaignFormValues) {
  // Validate data against Zod schema on the server
  const result = CampaignSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid data passed" };
  }

  try {
    await prisma.campaign.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        image: result.data.image,
        isPublished: result.data.isPublished,
      },
    });

    // Revalidate the admin dashboard to show the new item immediately
    revalidatePath("/admin/campaigns");
  } catch (error) {
    return { error: "Failed to create campaign" };
  }

  // Redirect back to list view
  redirect("/admin/campaigns");
}

// 2. Update Action
export async function updateCampaign(id: string, data: CampaignFormValues) {
  const result = CampaignSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid data passed" };
  }

  try {
    await prisma.campaign.update({
      where: { id },
      data: {
        name: result.data.name,
        description: result.data.description,
        image: result.data.image,
        isPublished: result.data.isPublished,
      },
    });

    revalidatePath("/admin/campaigns");
    revalidatePath(`/admin/campaigns/${id}`); // Revalidate the specific edit page
  } catch (error) {
    return { error: "Failed to update campaign" };
  }

  redirect("/admin/campaigns");
}

// 3. Delete Action
export async function deleteCampaign(id: string) {
  try {
    await prisma.campaign.delete({
      where: { id },
    });

    revalidatePath("/admin/campaigns");
  } catch (error) {
    return { error: "Failed to delete campaign" };
  }

  // Redirect to list after deletion
  redirect("/admin/campaigns");
}
