import { Product } from "@/sanity.types";
import { cn } from "cn";
import { Heart } from "lucide-react";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <button className="p-2.5 rounded-full hover:bg-shop-dark-green hover:text-white hoverEffect bg-product-bg">
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
