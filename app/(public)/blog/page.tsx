import BlogsListing from "./_components/blogs-listing";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog",
};

const BlogsListPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts) {
    return <div>Posts not found</div>;
  }

  return (
    <div>
      <header className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fuarlarım Blog</h1>
          <p className="text-xl text-gray-300">
            Dünyadaki fuarları keşfedin, seyahat ipuçlarını öğrenin
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3"></div>
          <div className="lg:w-1/3"></div>
        </div>
      </main>

      <BlogsListing posts={posts} />

      <div className="h-24"></div>
    </div>
  );
};

export default BlogsListPage;
