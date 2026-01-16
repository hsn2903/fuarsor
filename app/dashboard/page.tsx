import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  CalendarDays,
  Mail,
  Shield,
  Phone,
  Globe,
  Briefcase,
  MapPin,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  // Cast user to 'any' to access custom fields if TS complains before generation
  const user = session.user as any;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profilim</h1>
          <p className="text-muted-foreground mt-1">
            Hesap detaylarınızın herkese açık görünümü.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/settings">
            <Pencil className="mr-2 h-4 w-4" /> Profili Düzenle
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN (Main Info) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* HERO CARD */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600"></div>
            <div className="px-6 pb-6">
              <div className="relative flex justify-between items-end -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage
                    src={user.image || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl bg-slate-200">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {user.emailVerified ? (
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50 border-green-200 gap-1 mb-2"
                  >
                    <CheckCircle2 className="h-3 w-3" /> Onaylı Hesap
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="text-amber-600 bg-amber-50 border-amber-200 gap-1 mb-2"
                  >
                    <XCircle className="h-3 w-3" /> Onaysız
                  </Badge>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.jobTitle && (
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    <span>{user.jobTitle}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* ABOUT / BIO CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Hakkımda</CardTitle>
            </CardHeader>
            <CardContent>
              {user.bio ? (
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {user.bio}
                </p>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground mb-2">
                    Henüz bir biyografi eklemediniz.
                  </p>
                  <Button variant="link" size="sm" asChild>
                    <Link href="/dashboard/settings">Hemen Ekle</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* --- RIGHT COLUMN (Sidebar Info) --- */}
        <div className="space-y-6">
          {/* CONTACT CARD */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">İletişim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p
                    className="text-sm font-medium truncate"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              {user.phoneNumber && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telefon</p>
                    <p className="text-sm font-medium">{user.phoneNumber}</p>
                  </div>
                </div>
              )}

              {user.website && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground">Web Sitesi</p>
                    <a
                      href={
                        user.website.startsWith("http")
                          ? user.website
                          : `https://${user.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline truncate block"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SYSTEM INFO CARD */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sistem Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" /> Rol
                </div>
                <Badge variant="outline" className="capitalize">
                  {user.role || "user"}
                </Badge>
              </div>

              <div className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" /> Katılım
                </div>
                <span className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString("tr-TR", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {!user.emailVerified && (
                <div className="pt-2">
                  <Button className="w-full" variant="destructive" size="sm">
                    Emaili Doğrula
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
