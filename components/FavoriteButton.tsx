import { Heart } from "lucide-react";
import Link from "next/link";

const FavoriteButton = () => {
  return (
    <Link href={"/cart"} className="group relative">
      <Heart className="w-5 h-5 cursor-pointer hover:text-shop-light-green hoverEffect" />
      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-shop-dark-green text-white text-xs font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

export default FavoriteButton;
