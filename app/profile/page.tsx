"use client";

import SignOutButton from "@/app/auth/_components/sign-out-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeftIcon,
  LockIcon,
  UserIcon,
  MailIcon,
  ShieldCheckIcon,
  Loader2Icon,
  DatabaseIcon,
} from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground font-medium">
            Fetching session...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-[80vh] items-center justify-center px-4">
        <Card className="max-w-md w-full border-destructive/50">
          <CardHeader className="text-center">
            <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-2">
              <LockIcon className="text-destructive h-6 w-6" />
            </div>
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You must be signed in to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/auth/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 container mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <Button size="sm" variant="ghost" asChild className="gap-2">
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <ShieldCheckIcon className="h-3.5 w-3.5 text-green-500" />
          Active Session
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{session.user.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MailIcon className="h-3 w-3" />
                {session.user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                User ID
              </p>
              <p className="text-sm font-mono truncate bg-muted p-1 rounded">
                {session.user.id}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Role
              </p>
              {/* <p className="text-sm capitalize">
                {session.user.role || "User"}
              </p> */}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Manage your authentication session
            </p>
            <SignOutButton />
          </div>
        </CardContent>
      </Card>

      {/* Debug/JSON Section - Collapsible or subtler */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground px-1">
          <DatabaseIcon className="h-4 w-4" />
          <h2 className="text-sm font-medium">Session Metadata</h2>
        </div>
        <pre className="text-[11px] p-4 bg-zinc-950 text-zinc-400 rounded-lg overflow-x-auto border border-zinc-800">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ProfilePage;
