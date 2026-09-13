import { cn } from "cn";
import Link from "next/link";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-2xl text-shop-dark-green font-black tracking-wider uppercase hover:text-shop-light-green hoverEffect group font-sans",
        className,
      )}
    >
      <h2>
        Shopcar
        <span
          className={cn(
            "text-shop-light-green group-hover:text-shop-dark-green hoverEffect",
            spanDesign,
          )}
        >
          t
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
