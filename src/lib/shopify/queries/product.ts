import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;














// queries/product.ts
export const searchProductsQuery = `
  query SearchProducts($searchTerm: String!) {
    products(first: 10, query: $searchTerm) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
          tags
        }
      }
    }
  }
`;














export const getLatestProductsQuery = /* GraphQL */ `
  query getLatestProducts(
    $first: Int!
    $sortKey: ProductSortKeys!
    $reverse: Boolean!
  ) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;










export const getCollectionProductsQuery = `
  query getCollectionProducts($first: Int!, $collectionHandle: String!) {
    collectionByHandle(handle: $collectionHandle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle           
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;
