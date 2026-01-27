"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostFormState } from "../actions";
import { SubmitButton } from "./submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "./editor";
import { POST_CATEGORIES } from "@/lib/constants";
import ImageUpload from "@/components/shared/image-upload";

// Define the shape of the data we expect (subset of Prisma Post)
interface PostData {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  coverImage?: string | null;
  category?: string | null;
  published?: boolean;
}

// Props Interface
interface PostFormProps {
  post?: PostData;
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
}

export function PostForm({ post, action }: PostFormProps) {
  const initialState: PostFormState = { message: "", errors: {} };
  const [state, formAction] = useActionState(action, initialState);

  // State for the image URL (array format because our component expects an array)
  const [imageUrl, setImageUrl] = useState<string[]>(
    post?.coverImage ? [post.coverImage] : [],
  );

  // 1. State for Content
  // We initialize it with the existing post content or an empty string
  const [content, setContent] = useState<string>(post?.content || "");

  return (
    <div className="container mx-auto flex flex-col gap-6 h-full">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">
          {post ? "Post Düzenle" : "Yeni Post Oluştur"}
        </h1>
      </div>

      <div className="border rounded-lg p-6 bg-card shadow-sm">
        <form action={formAction} className="flex flex-col gap-6">
          {/* We need a hidden input for ID if we are editing */}
          {post?.id && <input type="hidden" name="id" value={post.id} />}

          {/* 2. Hidden Input for Content */}
          {/* This is crucial! It bridges the React State to the Server Action */}
          <input type="hidden" name="content" value={content} />

          {/* This hidden input sends the data to the server action */}
          <input type="hidden" name="coverImage" value={imageUrl[0] || ""} />

          {/* Image Upload UI */}
          <div className="grid gap-2">
            <Label>Resim</Label>
            <ImageUpload
              value={imageUrl}
              disabled={false}
              onChange={(url) => setImageUrl((current) => [...current, url])}
              onRemove={(url) =>
                setImageUrl((current) =>
                  current.filter((currentUrl) => currentUrl !== url),
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              name="title"
              placeholder="Başlık"
              defaultValue={post?.title} // Pre-fill data
            />
            {state.errors?.title && (
              <p className="text-red-500 text-sm">{state.errors.title}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="enter-post-slug"
              defaultValue={post?.slug} // Pre-fill data
            />
            {state.errors?.slug && (
              <p className="text-red-500 text-sm">{state.errors.slug}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            {/* Name is now "category" */}
            <Select name="category" defaultValue={post?.category || "Diğer"}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. The Editor UI */}
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Editor
              value={content}
              onChange={setContent}
              placeholder="Yazınızı buraya yaz ın..."
            />
            {state.errors?.content && (
              <p className="text-red-500 text-sm">{state.errors.content}</p>
            )}
          </div>

          {state.message && (
            <p className="text-red-500 text-sm font-medium">{state.message}</p>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin/posts">İptal</Link>
            </Button>
            <SubmitButton>
              {post ? "Güncelle" : "Yeni Post Oluştur"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
