import { sanityFetch } from "../lib/live";
import { categoriesQuery, categoriesWithQuantityQuery } from "./query";

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

export { getCategories };
