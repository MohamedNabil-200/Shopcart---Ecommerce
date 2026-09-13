"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
  const pathName = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-between text-sm capitalize font-semibold text-light-color">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-shop-light-green hoverEffect relative group ${pathName === item?.href && "text-shop-light-green"}`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 right-1/2 h-0.5 w-0 bg-shop-light-green translate-x-1/2 group-hover:w-full hoverEffect ${pathName === item?.href && "w-full"}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
