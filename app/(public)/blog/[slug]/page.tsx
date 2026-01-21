import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { getPostBySlug } from "@/features/posts/actions";
import ContactForm from "@/components/shared/contact-form";

export const metadata = {
  title: "Blog",
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const blogSlug = (await params).slug;
  const blog = await getPostBySlug(blogSlug);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={blog?.coverImage || "/images/hero.jpg"}
                alt={blog?.title || "Makale resmi"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <Badge className="mb-4">{blog?.category}</Badge>
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {blog?.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {blog?.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
                <Clock className="ml-4 mr-2 h-4 w-4" />
                {/* <span>{blog.readTime}</span> */}
              </div>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
              />
            </div>
          </article>
        </div>
        <div className="lg:w-1/3">
          <div className="mb-6 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={blog?.coverImage || ""} alt="" />
                    <AvatarFallback>{blog?.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      Fuarlarım Künye
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dünya çapında fuarlar
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo, dolor.
                </p>
                <div className="flex space-x-4">
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
                    <Instagram size={20} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-4  flex flex-col gap-8">
            <ContactForm from={`${blog?.title} - Makalesi`} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailPage;
