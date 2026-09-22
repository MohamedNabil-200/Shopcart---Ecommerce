import { sanityFetch } from "../lib/live";
import {
  BRANDS_QUERY,
  categoriesQuery,
  categoriesWithQuantityQuery,
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

export { getCategories, getAllBrands };
