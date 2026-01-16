import { getPaginatedUsers } from "@/features/users/actions";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";
import { UserPagination } from "@/features/users/components/user-pagination";
import { UserSearch } from "@/features/users/components/user-search";
import { UserTable } from "@/features/users/components/user-table";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Await the searchParams Promise (Next.js 15 requirement)
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = typeof params.search === "string" ? params.search : undefined;

  // 2. Fetch data
  const { data, metadata, error } = await getPaginatedUsers({
    page,
    per_page: 10,
    search,
  });

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Kullanıcı Yönetimi
        </h1>
        <CreateUserDialog />
      </div>

      <UserSearch />

      <UserTable users={data || []} />

      {metadata && <UserPagination totalPages={metadata.pageCount} />}
    </div>
  );
}
