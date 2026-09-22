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

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand" && defined(slug.current)] | order(title asc)
`);

export const LATEST_BLOG_QUERY = defineQuery(
  `
  *[_type == "blog" && isLatest == true] | order(name asc) {
    ...,
    blogCategories[]->{
      title
    }
  }
`,
);

export const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories": categories[]->title
  }`,
);
