"use client";

import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import TextAreaInput from "@/components/form/textarea-input";
import { SubmitButton } from "@/components/form/buttons";
import { updateSeoData } from "@/app/_actions/seo";
import { SeoPage } from "@/app/generated/prisma/client";

export function SeoForm({ seoData }: { seoData: SeoPage }) {
  return (
    <FormContainer action={updateSeoData}>
      {/* <FormInput label="Sayfa URL" name="url" type="text" /> */}
      <input type="hidden" name="id" value={seoData.id} />
      <FormInput
        label="Başlık"
        name="title"
        type="text"
        defaultValue={seoData.title || ""}
      />
      <TextAreaInput
        label="Açıklama"
        name="description"
        defaultValue={seoData.description || ""}
      />
      <TextAreaInput
        label="Anahtar Kelimeler (virgül ile ayırınız)"
        name="keywords"
        defaultValue={seoData.keywords || ""}
      />
      <SubmitButton text="Kaydet" />
    </FormContainer>
  );
}
