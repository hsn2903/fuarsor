import GoUpButton from "@/components/layouts/public/go-up-button";
import WhatsAppButton from "@/components/layouts/public/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AboutSection from "@/features/public/landing/about-section";
import CampaignsSection from "@/features/public/landing/campaigns";
import FeaturedFairs from "@/features/public/landing/featured-fairs";
import DefiniteDepartureTours from "@/features/public/landing/guaranteed-departure-tours";
import HeroSection from "@/features/public/landing/hero-section";
import PostsSection from "@/features/public/landing/posts-section";
import prisma from "@/lib/prisma";
import {
  UsersIcon,
  ArrowRightIcon,
  LayoutDashboardIcon,
  LogInIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Footer } from "react-day-picker";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();

  return (
    <div>
      <HeroSection />
      <CampaignsSection />
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <DefiniteDepartureTours />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <FeaturedFairs />
      </Suspense>

      <Suspense fallback={<p>Yükleniyor...</p>}>
        <PostsSection posts={posts} />
      </Suspense>

      <main className="container mx-auto px-4 py-24 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Super<span className="text-primary">blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            A modern platform for sharing thoughts and connecting with creators.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button size="lg" className="gap-2 px-8" asChild>
            <Link href="/auth/register">
              Get Started <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 px-8" asChild>
            <Link href="/auth/login">
              <LogInIcon className="h-4 w-4" /> Login
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/profile">
              <LayoutDashboardIcon className="h-4 w-4" /> Profile
            </Link>
          </Button>
        </div>

        {/* User Directory Section */}
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-slate-700">
              Recent Members
            </h2>
            <span className="ml-auto text-sm text-muted-foreground bg-slate-100 px-2 py-0.5 rounded">
              {users.length} registered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.length > 0 ? (
              users.map((user) => (
                <Card
                  key={user.id}
                  className="group hover:border-primary/50 transition-colors shadow-sm"
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="text-sm font-bold text-slate-600 group-hover:text-primary">
                        {user.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-slate-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        Member since 2024
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-8">
                No users found. Be the first to join!
              </p>
            )}
          </div>
        </div>
      </main>
      <WhatsAppButton />
      <GoUpButton />
      <Footer />
    </div>
  );
}
