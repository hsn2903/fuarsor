import ContactForm from "@/components/shared/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function Contact() {
  return (
    <div className="">
      <header className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-xl text-gray-300">
            Bizimle iletişime geçin, size yardımcı olmaktan memnuniyet duyarız.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* <Card className="mb-8">
          <CardContent className="p-6 py-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              İletişim Bilgileri
            </h2>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  +90 545 970 1919
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  info@fuarlarim.com
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  İstiklal Caddesi No: 123, Beyoğlu, İstanbul
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Pazartesi - Cuma: 09:00 - 18:00
                </span>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <ContactForm from="İletişim Sayfası" />
          </div>
          {/* <div className="lg:w-1/2">
            <Card className="py-0">
              <CardContent className="p-0">
                <div className="w-full h-80 rounded-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10120.177751010599!2d28.97843277830672!3d41.05265939065575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x179cb600b76fc273!2s%C3%87in+Vizesi!5e0!3m2!1str!2str!4v1545996546542"
                    // allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    aria-hidden="false"
                    // tabIndex="0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    Ofis Konumumuz
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus dolorem totam dolor enim asperiores, possimus quia
                  </p>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </main>
    </div>
  );
}
