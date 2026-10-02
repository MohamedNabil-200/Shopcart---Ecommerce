import { BRANDS_QUERY_RESULT } from "@/sanity.types";
import { Dispatch, SetStateAction } from "react";
import { Title } from "../ui/Text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type BrandListProps = {
  brands: BRANDS_QUERY_RESULT;
  selectedBrand?: string | null;
  setSelectedBrand: Dispatch<SetStateAction<string | null>>;
};

const BrandList = ({
  brands,
  selectedBrand,
  setSelectedBrand,
}: BrandListProps) => {
  return (
    <div>
      <Title className="text-base font-black">Brand List</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand.slug?.current as string)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={brand.slug?.current}
              id={brand.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand.slug?.current}
              className={`${selectedBrand === brand.slug?.current ? "font-semibold text-shop-dark-green" : "font-normal"}`}
            >
              {brand.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm text-left font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop-dark-green hoverEffect"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
