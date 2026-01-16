"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/app/generated/prisma/client";
import ImageUpload from "@/components/shared/image-upload";

interface PostFormProps {
  initialData: Post | null; // If null, we are in "Create" mode
}

export const PostForm = ({ initialData }: PostFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    category: initialData?.category || "Diğer",
    coverImage: initialData?.coverImage || "",
    published: initialData?.published || false,
  });

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Handler when an image is uploaded via the widget
  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, coverImage: url }));
  };

  // Handler when the trash icon is clicked
  const handleImageRemove = (url: string) => {
    setFormData((prev) => ({ ...prev, coverImage: "" }));
  };

  // Generic handler for text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Optional: Auto-generate slug from title if in Create mode and slug is empty
    if (name === "title" && !initialData) {
      const slugValue = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug: slugValue, [name]: value }));
    }
  };

  // Handler for Switch (Published)
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
            {errors?.title && (
              <p className="text-sm text-red-500">{errors.title[0]}</p>
            )}
          </div>

          {/* Slug Input */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              name="slug"
              placeholder="example-post-slug"
              value={formData.slug}
              onChange={handleChange}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly name. Only lowercase letters, numbers, and hyphens.
            </p>
            {errors?.slug && (
              <p className="text-sm text-red-500">{errors.slug[0]}</p>
            )}
          </div>

          {/* Category Input */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="News, Tech, Lifestyle..."
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              className="min-h-[200px]"
              placeholder="Write your post content here..."
              value={formData.content}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Published Switch */}
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={handleSwitchChange}
              disabled={loading}
            />
            <Label htmlFor="published">Published</Label>
            <span className="text-sm text-muted-foreground ml-auto">
              {formData.published ? "Visible to public" : "Draft mode"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* NEW CARD FOR IMAGE */}
      <Card>
        <CardHeader>
          <CardTitle>Cover Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            disabled={loading}
            // Adapt single string to array for the component
            value={formData.coverImage ? [formData.coverImage] : []}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
          {/* Hidden input to ensure it submits if we used standard forms, 
          but useful for debugging state */}
          <input
            type="hidden"
            name="coverImage"
            value={formData.coverImage || ""}
          />
        </CardContent>
      </Card>
    </div>
  );
};
