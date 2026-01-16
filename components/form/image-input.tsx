// components/form/ImageInput.tsx

import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput({ name, label }: { name: string; label?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize mb-1.5">
        {label || "Resim"}
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
      />
    </div>
  );
}
export default ImageInput;
