"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import toast from "react-hot-toast";

type FavoriteButtonProps = {
  showProduct?: boolean;
  product: Product;
};

const FavoriteButton = ({
  showProduct = false,
  product,
}: FavoriteButtonProps) => {
  const { favoriteProduct, addToFavorite } = useStore();

  const hasHydrated = useSyncExternalStore(
    (listener) => {
      const unsubscribe = useStore.persist.onFinishHydration(() => {
        listener();
      });

      return unsubscribe;
    },
    () => useStore.persist.hasHydrated(),
    () => false,
  );

  const existingProduct = hasHydrated ? favoriteProduct.find(
    (item) => item._id === product?._id,
  ) : undefined;

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
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 cursor-pointer hover:text-shop-light-green hoverEffect" />
          {hasHydrated && (
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-shop-dark-green text-white text-xs font-semibold flex items-center justify-center">
              {favoriteProduct.length ? favoriteProduct.length : 0}
            </span>
          )}
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-shop-light-green hoverEffect border border-shop-light-green/80 hover:border-shop-light-green p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-shop-light-green/80 group-hover:text-shop-light-green hoverEffect mt-0.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-shop-light-green/80 group-hover:text-shop-light-green hoverEffect mt-0.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
