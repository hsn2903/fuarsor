"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Post } from "@/app/generated/prisma/client";

type PostCategory =
  | "tumu"
  | "Haberler"
  | "Bilgi Bankası"
  | "Gezi Rehberi"
  | "Diğer";

const categories: { id: PostCategory; label: string }[] = [
  { id: "tumu", label: "Tümü" },
  { id: "Haberler", label: "Haberler" },
  { id: "Bilgi Bankası", label: "Bilgi Bankası" },
  { id: "Gezi Rehberi", label: "Gezi Rehberi" },
  { id: "Diğer", label: "Diğer" },
];

export default function PostsSection({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<PostCategory>("tumu");

  const filteredPosts = useMemo(() => {
    if (activeTab === "tumu") {
      return posts;
    }
    return posts.filter((post) => post.category === activeTab);
  }, [posts, activeTab]);

  return (
    <section className="py-16 bg-linear-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Blog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              En son haberler ve bilgiler
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="hover:shadow-md transition-shadow"
          >
            <Link href="/blog">
              Tümünü Gör
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeTab === category.id ? "default" : "outline"}
              onClick={() => setActiveTab(category.id)}
              className="transition-all duration-200"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 py-0"
            >
              <div className="aspect-video relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${post.coverImage})`,
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 dark:bg-gray-800/90 shadow-sm"
                  >
                    {categories.find((c) => c.id === post.category)?.label ||
                      "Genel"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 -mt-6">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-1">
                    {post.content && post?.content.slice(0, 100) + "..."}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Button
                    asChild
                    className="w-full hover:shadow-md transition-shadow"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Devamını oku
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Bu kategoride henüz blog yazısı bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
