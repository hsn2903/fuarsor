"use client";

import { sendMessage } from "@/app/_actions/contact";
import { SubmitButton } from "@/components/form/buttons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  message: "",
};

const ContactForm = ({ from = "İletişim Sayfası" }: { from: string }) => {
  const [state, formAction] = useActionState(sendMessage, initialState);
  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardContent className="px-6 py-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          İletişim Formu
        </h2>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="from" value={from} />
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Adınız
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800  dark:text-gray-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              E-posta Adresiniz
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mesajınız
            </label>
            <Textarea
              id="message"
              name="contactMessage"
              required
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows={4}
            />
          </div>

          <SubmitButton text="Gönder" className="w-full" />
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
