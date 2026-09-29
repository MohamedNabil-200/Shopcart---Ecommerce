"use client";

import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "cn";
import { Product } from "@/sanity.types";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const isOutOfStock = (product.stock ?? 0) <= 0;
  const handleAddToCart = () => {
    window.alert("Added to cart");
  };

  return (
    <div className="w-full h-12 flex items-center">
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
    </div>
  );
};

export default AddToCartButton;
