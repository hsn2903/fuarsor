"use server";

import { renderError } from "@/lib/error-handling";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { z } from "zod";

// const messageSchema = z.object({
//   name: z.string().min(1),
//   email: z.string().email(),
//   subject: z.string().min(1),
//   contactMessage: z.string().min(1),
// });

export const sendMessage = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const contactMessage = formData.get("contactMessage") as string;

  try {
    await prisma.message.create({
      data: {
        name,
        email,
        subject,
        contactMessage,
      },
    });

    revalidatePath("/admin/messages");
    return {
      message: "Mesajınız iletildi. En kısa sürede dönüş yapılacaktır.",
    };
  } catch (error) {
    return renderError(error);
  }
};

/**
 * Mark a message as read
 * @param formData Form data containing message ID
 */
export async function markMessageAsRead(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });

    // Revalidate the current path to refresh the data
    revalidatePath("/admin/messages");
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
}

/**
 * Mark a message as unread
 * @param formData Form data containing message ID
 */
export async function markMessageAsUnread(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.message.update({
      where: { id },
      data: { isRead: false },
    });

    // Revalidate the current path to refresh the data
    revalidatePath("/admin/messages");
  } catch (error) {
    console.error("Error marking message as unread:", error);
  }
}

/**
 * Delete a message
 * @param formData Form data containing message ID
 */
export async function deleteMessage(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    await prisma.message.delete({
      where: { id },
    });

    // Revalidate the current path to refresh the data
    revalidatePath("/admin/messages");
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}
