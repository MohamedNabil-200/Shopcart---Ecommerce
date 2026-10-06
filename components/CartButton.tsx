"use client";

import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartButton = () => {
  const { items } = useStore();
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-shop-light-green hoverEffect" />
      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-shop-dark-green text-white text-xs font-semibold flex items-center justify-center">
        {items.length ? items.length : 0}
      </span>
    </Link>
  );
};

export default CartButton;
