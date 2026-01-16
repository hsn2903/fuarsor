import { updatePost } from "@/features/posts/actions";
import { PostForm } from "@/features/posts/components/post-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  // Fetch post
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  // Pass categories to the form
  return <PostForm post={post} action={updatePost} />;
}
