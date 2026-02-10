import GoUpButton from "@/components/layouts/public/go-up-button";
import WhatsAppButton from "@/components/layouts/public/whatsapp-button";
import AboutSection from "@/features/public/landing/about-section";
import CampaignsSection from "@/features/public/landing/campaigns";
import FeaturedFairs from "@/features/public/landing/featured-fairs";
import DefiniteDepartureTours from "@/features/public/landing/guaranteed-departure-tours";
import HeroSection from "@/features/public/landing/hero-section";
import PostsSection from "@/features/public/landing/posts-section";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { connection } from "next/server";
import Footer from "@/components/layouts/public/footer";

export default async function Home() {
  await connection();
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

      <WhatsAppButton />
      <GoUpButton />
      <Footer />
    </div>
  );
}
