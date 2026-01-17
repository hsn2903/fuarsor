// "use client";

import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function About() {
  const teamMembers = [
    {
      name: "Ahmet Yılmaz",
      role: "CEO & Kurucu",
      image: "/images/hero.jpg",
    },
    {
      name: "Ayşe Kaya",
      role: "Operasyon Müdürü",
      image: "/images/hero.jpg",
    },
    {
      name: "Mehmet Demir",
      role: "Pazarlama Direktörü",
      image: "/images/hero.jpg",
    },
    {
      name: "Zeynep Şahin",
      role: "Müşteri İlişkileri Yöneticisi",
      image: "/images/hero.jpg",
    },
  ];

  return (
    <div className="">
      <header className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-gray-300">
            Dünya çapında fuarları keşfetmenize yardımcı oluyoruz
          </p>
        </div>
      </header>

      <main className="container mx-auto px-12 py-12">
        <section className="mb-16">
          {/* <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Biz Kimiz?
          </h2> */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-bold">Fuarlarım</span> , Türkiye’nin dört
                bir yanındaki sektör fuarlarını tek çatı altında toplayan akıllı
                bir arama platformudur.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                İş dünyasının nabzını tutan firmalar, yeni iş bağlantıları
                kurmak isteyen girişimciler ve en güncel fuar fırsatlarını
                arayan profesyoneller için tasarlandı.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Amacımız; fuar bilgilerine kolay, güvenilir ve hızlı erişim
                sağlamaktır. Kullanıcılarımız, katılmak istedikleri fuarları
                detaylarıyla inceleyebilir, karşılaştırabilir ve kendilerine en
                uygun çözümleri bulabilirler.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Fuarlarım, yalnızca bir listeleme sitesi değil —{" "}
                <span className="font-bold">
                  iş dünyasının buluşma noktasıdır.
                </span>{" "}
                Görünmeyen tarafta sürekli güncellenen sistemimizle,
                ziyaretçilere en taze veriyi ulaştırırız. Basit, şeffaf ve
                etkili. Hepsi bu.
              </p>
            </div>
            <div className="relative aspect-video">
              <Image
                src="/images/hakkimizda-ucak.png"
                alt="TurkSeyahat Ofisi"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Neden Biz?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="px-6 py-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  Uzman Ekip
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deneyimli ve tutkulu seyahat uzmanlarımızla size en iyi
                  hizmeti sunuyoruz.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-6 py-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  Özel Deneyimler
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kişiselleştirilmiş seyahat planları ve benzersiz yerel
                  deneyimler sunuyoruz.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-6 py-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  7/24 Destek
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seyahatinizin her anında yanınızdayız, 7/24 müşteri desteği
                  sağlıyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Ekibimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {member.role}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Facebook size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Twitter size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Linkedin size={20} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}
