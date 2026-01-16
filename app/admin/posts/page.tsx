import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeletePostButton } from "@/features/posts/components/post-actions";
import { Search } from "@/features/posts/components/search";
import { StatusToggle } from "@/features/posts/components/status-toggle";
import { Pagination } from "@/features/dashboard/pagination";
import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

interface PostsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string; // Add search param type
  }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const query = params.search || ""; // Get the search term

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Update logic: Add 'where' clause for filtering
  const whereCondition = query
    ? {
        title: {
          contains: query,
          // mode: 'insensitive', // Unfortunately, SQLite doesn't support insensitive directly in standard Prisma without raw query, but standard contains works for basic matching.
        },
      }
    : {};

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: skip,
    }),
    prisma.post.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" /> Yeni Post Oluştur
          </Link>
        </Button>
      </div>

      {/* Add Search Bar here */}
      <div className="w-full">
        <Search />
      </div>

      <div className="border rounded-lg shadow-sm">
        <Table>
          {/* ... Table Header ... */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  {query
                    ? "No results found for your search."
                    : "No posts found."}
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  {/* ... Same Table Cells as before ... */}
                  <TableCell className="font-medium">
                    {post.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell>
                    <StatusToggle id={post.id} isPublished={post.published} />
                  </TableCell>
                  <TableCell>
                    {post.category ? (
                      <Badge variant="secondary">{post.category}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {post.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/blog/${post.id}/edit`}>Edit</Link>
                      </Button>
                      <DeletePostButton id={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/dashboard/posts"
      />
    </div>
  );
}
