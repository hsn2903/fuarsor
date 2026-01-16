"use client";

import { useState, useEffect } from "react"; // <--- Added useEffect
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, User, Phone, Briefcase, Globe } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "./_components/image-upload";

export default function SettingsPage() {
  const router = useRouter();
  // Fetch session and loading state
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  // Initialize form with empty strings
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    bio: "",
    phoneNumber: "",
    jobTitle: "",
    website: "",
  });

  // --- THE FIX: EFFECT TO PRE-FILL DATA ---
  // As soon as 'user' data arrives, update the form state
  useEffect(() => {
    if (user) {
      // Cast to 'any' to access custom fields if Typescript complains
      const userData = user as any;
      setFormData({
        name: userData.name || "",
        image: userData.image || "",
        bio: userData.bio || "",
        phoneNumber: userData.phoneNumber || "",
        jobTitle: userData.jobTitle || "",
        website: userData.website || "",
      });
    }
  }, [user]); // Run whenever 'user' changes (e.g., from null to loaded)

  // ----------------------------------------

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.updateUser(
      {
        name: formData.name,
        image: formData.image,
        // Pass extra fields
        // @ts-ignore
        bio: formData.bio,
        phoneNumber: formData.phoneNumber,
        jobTitle: formData.jobTitle,
        website: formData.website,
      },
      {
        onSuccess: () => {
          toast.success("Profiliniz başarıyla güncellendi!");
          router.refresh();
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error("Güncelleme hatası: " + ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  // Show a loading spinner while fetching the initial session
  if (isPending || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil Ayarları</h1>
        <p className="text-muted-foreground mt-1">
          Kişisel bilgilerinizi ve herkese açık profilinizi yönetin.
        </p>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* --- SECTION 1: VISUAL IDENTITY --- */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Fotoğrafı</CardTitle>
            <CardDescription>
              Sizi en iyi temsil eden fotoğrafı yükleyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Image Upload Component */}
            <ImageUpload
              value={formData.image ? [formData.image] : []}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, image: url }))
              }
              onRemove={() => setFormData((prev) => ({ ...prev, image: "" }))}
            />
          </CardContent>
        </Card>

        {/* --- SECTION 2: BASIC INFO --- */}
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-9"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Unvan / Meslek</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    className="pl-9"
                    placeholder="Örn: Yazılım Mühendisi"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Hakkımda</Label>
              <Textarea
                id="bio"
                className="min-h-[120px]"
                placeholder="Kendinizden, deneyimlerinizden ve ilgi alanlarınızdan bahsedin..."
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
              <p className="text-[10px] text-muted-foreground text-right">
                Kısa ve öz tutmaya çalışın.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- SECTION 3: CONTACT INFO --- */}
        <Card>
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    className="pl-9"
                    placeholder="+90 555 ..."
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Web Sitesi</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    className="pl-9"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Email Read-Only */}
            <div className="pt-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Kayıtlı Email Adresi
              </Label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-slate-100 text-slate-500 mt-1.5"
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                Email adresinizi değiştirmek için lütfen yönetici ile iletişime
                geçin.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t p-4 bg-slate-50/50 rounded-b-lg">
            <Button type="submit" disabled={loading} size="lg">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Değişiklikleri Kaydet
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
