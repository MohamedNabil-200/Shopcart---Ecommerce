"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Category, Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import ProductCard from "./ProductCard";

type CategoryProductProps = {
  categories: Category[];
  slug: string;
};

const CategoryProduct = ({ categories, slug }: CategoryProductProps) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return; //Prevent Unnecessary Updates.
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}
      `;
      const data = await client.fetch(query, { categorySlug });

      if (requestId !== requestIdRef.current) return

      setProducts(data);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching products: ", error);
      setProducts([]);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      if (requestId !== requestIdRef.current) return;
      
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories.map((category) => {
          const slugCurrent = category.slug?.current;
          if (!slugCurrent) return null;

          return (
            <Button
              onClick={() => handleCategoryChange(slugCurrent)}
              key={category._id}
              className={`bg-transparent border-0 p-0 rounded-none text-dark-color shadow-none hover:bg-dark-red hover:text-white font-semibold hoverEffect border-b border-[#e5e5e5] last:border-b-0 transition-colors capitalize ${slugCurrent === currentSlug && "bg-dark-red text-white border-dark-red"}`}
            >
              <p className="w-full text-left px-2">{category.title}</p>
            </Button>
          );
        })}
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-red-50 rounded-lg w-full">
            <div className="text-red-600 font-semibold">
              Failed to load products.
            </div>
            <div className="text-sm text-muted-foreground">{error}</div>
            <div>
              <Button
                onClick={() => fetchProducts(currentSlug)}
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products.map((product) => (
              <AnimatePresence key={product._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
