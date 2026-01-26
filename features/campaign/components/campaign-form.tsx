"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Campaign } from "@/app/generated/prisma/client";
import { CampaignFormValues, CampaignSchema } from "../schemas";
import { createCampaign, deleteCampaign, updateCampaign } from "../actions";
import ImageUpload from "@/components/shared/image-upload";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CampaignFormProps {
  initialData?: Campaign | null;
}

export const CampaignForm = ({ initialData }: CampaignFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize state with existing data or defaults
  const [formData, setFormData] = useState<CampaignFormValues>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    isPublished: initialData?.isPublished || false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // 1. Client-side Zod Validation
    const result = CampaignSchema.safeParse(formData);

    if (!result.success) {
      // Map Zod errors to our state
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    // 2. Server Action Call
    try {
      if (initialData) {
        // Update mode
        await updateCampaign(initialData.id, formData);
      } else {
        // Create mode
        await createCampaign(formData);
      }
      // The actions handle the redirect, so we don't need to push router here usually,
      // but just in case of lag:
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Inside CampaignForm component...
  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteCampaign(initialData!.id);
      router.refresh();
      // redirect is handled by server action
    } catch (error) {
      setErrors({ form: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Only show Delete button if we are editing */}
        {initialData && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={loading} variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Kampanyayı Silmek İstediğinize Emin Misiniz?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bu eylem geri alınamaz. Bu kampanyayı kalıcı olarak siler.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
        {/* Global Form Error */}
        {errors.form && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        )}

        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Arkaplan Resmi</Label>
          <ImageUpload
            value={formData.image ? [formData.image] : []}
            disabled={loading}
            onChange={(url) => setFormData({ ...formData, image: url })}
            onRemove={() => setFormData({ ...formData, image: "" })}
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image}</p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Kampanya Adı</Label>
            <Input
              id="name"
              disabled={loading}
              placeholder="e.g. Summer Sale 2024"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Published Checkbox */}
          <div className="space-y-2 flex flex-row items-start space-x-3 rounded-md border p-4">
            <Checkbox
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPublished: checked as boolean })
              }
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="isPublished">Yayımlandı</Label>
              <p className="text-sm text-muted-foreground">
                Bu kampanya ana sayfada görünecek.
              </p>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            disabled={loading}
            placeholder="Kampanyanızı tanımlayın..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <Button disabled={loading} type="submit" className="ml-auto">
          {initialData ? "Değişiklikleri Kaydet" : "Kampanyayı Oluştur"}
        </Button>
      </form>
    </>
  );
};
