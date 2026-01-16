import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { CellAction } from "@/features/campaign/components/cell-action";

export default async function CampaignsPage() {
  // 1. Fetch data directly in the Server Component
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Link href="/admin/campaigns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
            {campaigns.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-16 h-10 overflow-hidden rounded-md border">
                    {/* Simple native img tag for preview, or Next/Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  {item.isPublished ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  )}
                </TableCell>
                <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <CellAction data={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
