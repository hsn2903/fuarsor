import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import MessagesTable from "./_components/messages-table";
import prisma from "@/lib/prisma";

const MessagesPage = async () => {
  const messages = await prisma.message.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold">Mesajlar</h1>
      <p className="text-muted-foreground">
        Bu sayfada, kullanıcıların siteye mesaj göndermesini görebilirsiniz.
      </p>

      <Tabs defaultValue="all" className="mt-10">
        <TabsList className="grid w-80 grid-cols-3 ">
          <TabsTrigger value="all" className="cursor-pointer">
            Hepsi
          </TabsTrigger>
          <TabsTrigger value="read" className="cursor-pointer">
            Okunmuş
          </TabsTrigger>
          <TabsTrigger value="unread" className="cursor-pointer">
            Okunmamış
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MessagesTable messages={messages} />
        </TabsContent>

        <TabsContent value="read">
          <MessagesTable
            messages={messages.filter((msg) => msg.isRead === true)}
          />
        </TabsContent>

        <TabsContent value="unread">
          <MessagesTable
            messages={messages.filter((msg) => msg.isRead === false)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesPage;
