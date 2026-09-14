import { cn } from "cn";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-3xl font-bold capitalize tracking-wide text-shop-dark-green font-sans",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export { Title };
