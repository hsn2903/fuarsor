import {
  deleteMessage,
  markMessageAsRead,
  markMessageAsUnread,
} from "@/app/_actions/messages";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Message } from "@/lib/generated/prisma";
import {
  MailIcon,
  CheckCircle2Icon,
  TrashIcon,
  MessageCircleIcon,
  EyeIcon,
} from "lucide-react";

const MessagesTable = ({ messages }: { messages: Message[] }) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground py-8 space-y-4">
        <MessageCircleIcon className="w-12 h-12 text-gray-400" />
        <p className="text-lg">Hiç mesaj bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="w-[50px]">Durum</TableHead>
            <TableHead className="w-[150px] font-bold text-gray-700">
              İsim
            </TableHead>
            <TableHead className="w-[200px] font-bold text-gray-700">
              Email
            </TableHead>
            <TableHead className="flex-1 font-bold text-gray-700">
              Mesaj
            </TableHead>
            <TableHead className="w-[250px] font-bold text-gray-700 text-center">
              Eylemler
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
              className={`hover:bg-gray-50 transition-colors ${
                message.isRead ? "opacity-60" : ""
              }`}
            >
              <TableCell>
                {message.isRead ? (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                )}
              </TableCell>
              <TableCell className="font-medium">{message.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {message.email}
              </TableCell>
              <TableCell className="text-gray-600">
                {message.contactMessage}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-blue-50"
                    asChild
                  >
                    <a href={`mailto:${message.email}`}>
                      <MailIcon className="mr-2 h-4 w-4" />
                      Cevapla
                    </a>
                  </Button>

                  <form
                    action={
                      message.isRead ? markMessageAsUnread : markMessageAsRead
                    }
                  >
                    <input type="hidden" name="id" value={message.id} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-green-50"
                      type="submit"
                    >
                      {message.isRead ? (
                        <>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          Okunmadı
                        </>
                      ) : (
                        <>
                          <CheckCircle2Icon className="mr-2 h-4 w-4" />
                          Okundu
                        </>
                      )}
                    </Button>
                  </form>

                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600"
                      type="submit"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Sil
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MessagesTable;
