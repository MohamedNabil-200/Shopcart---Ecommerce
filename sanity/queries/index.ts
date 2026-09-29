import { sanityFetch } from "../lib/live";
import {
  BRANDS_QUERY,
  BRAND_QUERY,
  categoriesQuery,
  categoriesWithQuantityQuery,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const { data } = await sanityFetch({
      query: quantity ? categoriesWithQuantityQuery : categoriesQuery,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error Fetching Categories: ", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error Fetching All Brands: ", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error Fetching Latest Blogs: ", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error Fetching Deal Products: ", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
      stega: false
    });
    return product.data || null;
  } catch (error) {
    console.log("Error Fetching Product By Slug: ", error);
    throw error;
  }
};

const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error Fetching Brand: ", error);
    return null;
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
};
