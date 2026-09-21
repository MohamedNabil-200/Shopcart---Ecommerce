import { cn } from "cn";
import PriceFormatter from "./PriceFormatter";

type PriceViewProps = {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
};

const PriceView = ({ price, discount, className }: PriceViewProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PriceFormatter amount={price} className="text-shop-dark-green" />
      {price && discount && discount < 100 && (
        <PriceFormatter
          amount={price / (1 - discount / 100)}
          className="line-through font-normal text-light-text"
        />
      )}
    </div>
  );
};

export default PriceView;
