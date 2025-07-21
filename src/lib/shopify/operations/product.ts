



import { HIDDEN_PRODUCT_TAG, TAGS } from "@lib/shopify/constants";

import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
  getCollectionProductsQuery,
  getLatestProductsQuery,
} from "@lib/shopify/queries/product";

import type {
  Connection,
  Image,
  Product,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyCollectionProductsOperation,
} from "../types";

import { removeEdgesAndNodes } from "./common";
import { shopifyFetch } from "./fetch";

// ✅ دالة آمنة تتأكد أن images موجودة
const reshapeImages = (
  images: Connection<Image> | undefined,
  productTitle: string
) => {
  if (!images || !Array.isArray(images.edges)) return [];

  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

export const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts &&
      Array.isArray(product.tags) &&
      product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants || { edges: [] }),
  };
};

export const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data?.product, false);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data?.productRecommendations || []);
}



export async function getProducts({
  first = 100,
  after,
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number;
  after?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      first,
      after,
    },
  });

  // ✅ اطبع كل الـ response وشوف إيه اللي راجع من Shopify
  console.log("✅ Shopify response:", res.body);

  const products = res.body?.data?.products;

  if (!products || !products.edges) {
    console.error("❌ البيانات غير صالحة أو غير موجودة:", res.body);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(products));
}



export async function fetchLatestProducts({
  first = 15,
}: {
  first?: number;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getLatestProductsQuery,
    tags: [TAGS.products],
    variables: {
      first,
      sortKey: "CREATED_AT",
      reverse: true,
    },
  });

  const products = res.body.data?.products;
  return reshapeProducts(removeEdgesAndNodes(products || { edges: [] }));
}

export async function fetchCollectionProducts({
  collectionHandle,
  first = 15,
}: {
  collectionHandle: string;
  first?: number;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.products],
    variables: {
      first,
      collectionHandle,
    },
  });

  const products = res.body.data?.collectionByHandle?.products;
  return reshapeProducts(removeEdgesAndNodes(products || { edges: [] }));
}





import { searchProductsQuery } from "@lib/shopify/queries/product";
// import { shopifyFetch } from "./fetch";
// import { reshapeProducts } from "./product"; // موجود بالفعل عندك

export async function searchProducts({
  keyword,
  first = 10,
}: {
  keyword: string;
  first?: number;
}) {
  const res = await shopifyFetch({
    query: searchProductsQuery,
    tags: ["products"],
    variables: {
      searchTerm: keyword,
      first,
    },
  });

  const products = res.body.data?.products;
  return reshapeProducts(products.edges.map((edge: any) => edge.node));
}