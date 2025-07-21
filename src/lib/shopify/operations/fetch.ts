import { config } from "@config";
import { isShopifyError } from "@lib/type-guards";
import { ensureStartsWith } from "@lib/utils";

const storefrontAccessToken = config.shopify.accessToken;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

type Init = RequestInit & { cache?: RequestCache };

export const createShopifyFetch = (baseUrl: string, init?: Init) => {
  const { headers: headersInit, cache: cacheInit, ...baseInit } = init ?? {};

  return async <T>({
    cache = cacheInit,
    headers,
    query,
    tags,
    variables,
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
  }): Promise<{ status: number; body: T } | never> => {
    try {
      const result = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
          ...headersInit,
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
        cache,
        ...(tags && { next: { tags } }),
        ...baseInit,
      });

      const body = await result.json();

      if (body.errors) {
        throw body.errors[0];
      }

      return {
        status: result.status,
        body,
      };
    } catch (e) {
      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() || "unknown",
          status: e.status || 500,
          message: e.message,
          query,
        };
      }

      throw {
        error: e,
        query,
      };
    }
  };
};

const domain = ensureStartsWith(config.shopify.domain, "https://");
const endpoint = `/api/${config.shopify.apiVersion}/graphql.json`;



export const shopifyFetch = createShopifyFetch(`${domain}${endpoint}`, {
  headers: {
    "Accept-Language": localStorage.getItem("language") || "en",
  },
});