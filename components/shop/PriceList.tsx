import { Dispatch, SetStateAction } from "react";
import { Title } from "../ui/Text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

type PriceListProps = {
  selectedPrice?: string | null;
  setSelectedPrice: Dispatch<SetStateAction<string | null>>;
};

const PriceList = ({ selectedPrice, setSelectedPrice }: PriceListProps) => {
  return (
    <div>
      <Title className="text-base font-black">Price List</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray.map((price) => (
          <div
            key={price.title}
            onClick={() => setSelectedPrice(price.value)}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              value={price.value}
              id={price.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price.value ? "font-semibold text-shop-dark-green" : "font-normal"} cursor-pointer`}
            >
              {price.title}
            </Label>
          </div>
        ))}
        {selectedPrice && (
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-sm text-left font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop-dark-green hoverEffect"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
