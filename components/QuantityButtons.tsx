"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "cn";
import toast from "react-hot-toast";

type QuantityButtonsProps = {
  product: Product;
  className?: string;
};

const QuantityButtons = ({ product, className }: QuantityButtonsProps) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product.name?.substring(0, 12)} removed successfully!`);
    }
  };

  const handleAddToCart = () => {
    if ((product.stock as number) > itemCount) {
      addItem(product);
      toast.success("Quantity Increased successfully!");
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className={cn("flex items-center gap-1.5 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        className="w-6 h-6 border hover:bg-shop-dark-green/20 hoverEffect bg-transparent rounded-md"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-dark-color">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border hover:bg-shop-dark-green/20 hoverEffect bg-transparent rounded-md"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
