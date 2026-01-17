import { Post } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BlogCategory =
  | "tumu"
  | "Haberler"
  | "Bilgi Bankası"
  | "Gezi Rehberi"
  | "Diğer";

const categories: { id: BlogCategory; label: string }[] = [
  { id: "tumu", label: "Tümü" },
  { id: "Haberler", label: "Haberler" },
  { id: "Bilgi Bankası", label: "Bilgi Bankası" },
  { id: "Gezi Rehberi", label: "Gezi Rehberi" },
  { id: "Diğer", label: "Diğer" },
];

const BlogCard = ({ post }: { post: Post }) => {
  return (
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
            {categories.find((c) => c.id === post.category)?.label || "Genel"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-1">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-1">
            {post.content?.substring(0, 100)}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4">
          <Button asChild className="w-full hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              Devamını oku
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
