import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/Text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop-light-bg">
        {product?.images && (
          <Image
            src={urlFor(product.images[0]).url()}
            alt={`${product.name}`}
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-light-bg hoverEffect ${product.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <div className="absolute top-2 flex flex-row-reverse items-center justify-between left-2 right-2 z-10">
          <AddToWishlistButton product={product} />
          {product.status === "sale" && (
            <p className="text-xs border border-dark-color/50 px-2 rounded-full group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect">
              Sale!
            </p>
          )}
          {product.status === "hot" && (
            <Link
              href={"/deal"}
              className="border border-shop-orange/50 p-1 rounded-full group-hover:border-shop-orange hover:text-shop-dark-green hoverEffect"
            >
              <Flame
                size={18}
                fill="#fb6c08"
                className="text-shop-orange/50 group-hover:text-shop-orange hoverEffect"
              />
            </Link>
          )}
          {product.status === "new" && (
            <p className="text-xs border border-dark-color/50 px-2 rounded-full group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect">
              New!
            </p>
          )}
        </div>
      </div>
      <div className="p-3">
        {product.categories && (
          <p className="uppercase line-clamp-1 text-xs text-dark-text">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className={index < 4 ? "text-light-green" : "text-light-text"}
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-light-text text-xs tracking-wide">5 Review</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium">In Stock</p>
          <p
            className={`font-semibold ${product.stock === 0 ? "text-red-600" : "text-shop-light-green"}`}
          >
            {(product.stock as number) > 0 ? product.stock : "unavailable"}
          </p>
        </div>
        <PriceView
          price={product.price}
          discount={product.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
