import { defineQuery } from "next-sanity";

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(name asc) {
    ...,
    "productCount": count(
      *[_type == "product" && references(^._id)]
    )
  }
`);

export const categoriesWithQuantityQuery = defineQuery(`
  *[_type == "category"] | order(name asc) [0...$quantity] {
    ...,
    "productCount": count(
      *[_type == "product" && references(^._id)]
    )
  }
`);

export const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(title asc)`);
