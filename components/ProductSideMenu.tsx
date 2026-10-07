"use client";
import { Product } from "@/sanity.types";
import { cn } from "cn";
import { Heart } from "lucide-react";
import useStore from "@/store";
import React from "react";
import toast from "react-hot-toast";

type ProductSideMenuProps = {
  product: Product;
  className?: string;
};

const ProductSideMenu = ({ product, className }: ProductSideMenuProps) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const existingProduct = favoriteProduct.find(
    (item) => item._id === product._id,
  );

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product._id) {
      addToFavorite(product);
      toast.success(
        existingProduct
          ? "Product Removed Successfully!"
          : "Product Added Successfully",
      );
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 cursor-pointer", className)}>
      <button
        type="button"
        onClick={handleFavorite}
        aria-label={
          existingProduct ? "Remover from favorites" : "Add to favorites"
        }
        className={`p-2.5 rounded-full hover:bg-shop-dark-green/80 hover:text-white hoverEffect ${existingProduct ? "bg-shop-dark-green/80 text-white" : "bg-light-color/10"}`}
      >
        <Heart size={15} />
      </button>
    </div>
  );
};

export default ProductSideMenu;
