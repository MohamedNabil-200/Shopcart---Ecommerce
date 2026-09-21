import { cn } from "cn";

type PriceFormatterProps = {
  amount: number | undefined;
  className?: string;
};

const PriceFormatter = ({ amount, className }: PriceFormatterProps) => {
  if (amount === undefined || amount === null) {
    return null;
  }

  const formattedPrice = new Number(amount).toLocaleString("en-us", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return (
    <span className={cn("text-sm font-semibold text-dark-color", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
