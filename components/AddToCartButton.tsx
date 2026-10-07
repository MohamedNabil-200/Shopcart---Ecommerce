"use client";

import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "cn";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);

  const isOutOfStock = (product.stock ?? 0) <= 0;
  const handleAddToCart = () => {
    if ((product.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product.name?.substring(0, 12)}... added successfully!`);
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs text-dark-color/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={(product.price ?? 0) * (1 - (product.discount ?? 0) / 100) * itemCount}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-shop-dark-green/80 text-light-bg shadow-none border border-shop-dark-green/80 font-semibold tracking-wide hover:text-white hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect",
            className,
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
