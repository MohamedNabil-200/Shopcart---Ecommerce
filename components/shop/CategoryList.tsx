import { Category } from "@/sanity.types";
import { Dispatch, SetStateAction } from "react";
import { Title } from "../ui/Text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type CategoryListProps = {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
};

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  return (
    <div>
      <Title className="text-base font-black">Products Categories</Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories.map((category) => (
          <div
            onClick={() => {
              setSelectedCategory(category.slug?.current as string);
            }}
            key={category._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category.slug?.current}
              id={category.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category.slug?.current}
              className={`${selectedCategory === category.slug?.current ? "font-semibold text-shop-dark-green" : "font-normal"} cursor-pointer`}
            >
              {category.title}
            </Label>
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-left font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop-dark-green hoverEffect"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;
