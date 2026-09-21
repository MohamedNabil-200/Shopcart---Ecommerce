import { productType } from "@/constants/data";
import { Button } from "./ui/button";
import Link from "next/link";

type HomeTabBarProps = {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
};

const HomeTabBar = ({ selectedTab, onTabSelect }: HomeTabBarProps) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType.map((item) => (
          <Button
            onClick={() => onTabSelect(item.title)}
            key={item.title}
            className={`text-black px-4 py-1.5 md:px-6 md:py-2 border border-shop-light-green/10 hover:bg-shop-light-green hover:text-white hover:border-shop-light-green hoverEffect ${selectedTab === item.title ? "bg-shop-light-green text-white border-shop-light-green" : "bg-shop-light-green/10"}`}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div>
        <Link
          href={"/shop"}
          className="bg-shop-light-bg text-black px-4 py-1.5 md:px-6 md:py-2 border border-shop-light-green/30 rounded-full hover:bg-shop-light-green hover:text-white hover:border-shop-light-green hoverEffect"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default HomeTabBar;
