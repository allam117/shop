import { GraphQLClient } from "graphql-request";

export const storefrontClient = new GraphQLClient(
  "https://your-shop-name.myshopify.com/api/2023-10/graphql.json",
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": "your-storefront-token",
      "Content-Type": "application/json",
    },
  }
);
