"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { productType } from "@/constants/data";
import HomeTabBar from "./HomeTabBar";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const query = `*[_type == "product" && variant == $variant]{...,"categories":categories[]->title}`;

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const params: Record<string, unknown> = {
          variant: selectedTab.toLowerCase(),
        };
        const response = await client.fetch(query, params);
        if (!isCurrentRequest) return;
        setProducts(response);
      } catch (error) {
        if (!isCurrentRequest) return;
        console.log("Product Fetching Error: ", error);
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedTab, query]);
  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 mt-10 min-h-80 bg-gray-100 w-full">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Products is loading...</span>
          </div>
        </div>
      ) : products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {products.map((product) => (
            <AnimatePresence key={product._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
