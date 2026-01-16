import { Label } from "../ui/label";
import { Input } from "../ui/input";

// const name = Prisma.PropertyScalarFieldEnum.price;
// const name = 'price';
type FormInputNumberProps = {
  name: string;
  defaultValue?: number;
};

function PriceInput({ name, defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor="price" className="capitalize mb-1.5">
        Price ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}
export default PriceInput;
