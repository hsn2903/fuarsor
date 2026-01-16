"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { actionFunction } from "@/lib/types";
import { UserIcon } from "lucide-react";
import FormContainer from "./form-container";
import ImageInput from "./image-input";
import { SubmitButton } from "./buttons";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  const userIcon = (
    <UserIcon className="w-24 h-24 bg-primary rounded-md text-white mb-4" />
  );
  return (
    <div>
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          className="rounded-md object-cover mb-4 w-24 h-24"
          alt={name}
        />
      ) : (
        userIcon
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
        className="cursor-pointer"
      >
        {text}
      </Button>

      {isUpdateFormVisible && (
        <div className="max-w-lg mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput name="image" />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
