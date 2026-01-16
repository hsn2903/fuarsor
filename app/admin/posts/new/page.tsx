import { createPost } from "@/features/posts/actions";
import { PostForm } from "@/features/posts/components/post-form";

export default async function NewPostPage() {
  return <PostForm action={createPost} />;
}
