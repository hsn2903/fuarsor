import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRowActions } from "./user-row-actions";
import { EmptyState } from "./empty-state";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: Date;
}

export function UserTable({ users }: { users: User[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Resim</TableHead>
            <TableHead>Ad</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Kayıt Tarihi</TableHead>
            <TableHead className="text-right">Eylemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-96 text-center">
                <EmptyState />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                {/* Avatar Column */}
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name & Email Column */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {user.name || "No Name"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </TableCell>

                {/* Role Badge Column */}
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                {/* Date Column */}
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions Column */}
                <TableCell className="text-right">
                  <UserRowActions user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
