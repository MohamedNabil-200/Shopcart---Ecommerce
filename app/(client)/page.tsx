import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

const page = async () => {
  const categories = await getCategories(6);
  return (
    <Container>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories categories={categories}/>
        <ShopByBrands />
      </div>
    </Container>
  );
};

export default page;
