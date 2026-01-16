import Footer from "@/components/layouts/public/footer";
import MainNav from "@/components/layouts/public/main-nav";
import WhatsAppButton from "@/components/layouts/public/whatsapp-button";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <MainNav />
      <main className="">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
