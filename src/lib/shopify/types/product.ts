import type { Connection, Image, Money, SEO } from './common';

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  image: Image;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage?: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    first?: number;
    after?: string;
  };
};













// export async function fetchCollectionProducts({
//   collectionHandle,
//   first = 15,
// }: {
//   collectionHandle: string;
//   first?: number;
// }): Promise<Product[]> {
//   const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
//     query: getCollectionProductsQuery,
//     tags: [TAGS.products],
//     variables: {
//       first,
//       collectionHandle,
//     },
//   });

//   return reshapeProducts(
//     removeEdgesAndNodes(res.body.data.collectionByHandle.products)
//   );
// }




// types/product.ts

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    url: string;
  }[];
}
