import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/ui/Text";
import { getDealProducts } from "@/sanity/queries";

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 bg-product-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration text-base uppercase tracking-wide">
          Hot Deals od the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
