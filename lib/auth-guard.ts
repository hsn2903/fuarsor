import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Your Better Auth server config

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(), // Pass request headers
  });
  return session?.user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !user.role || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}
