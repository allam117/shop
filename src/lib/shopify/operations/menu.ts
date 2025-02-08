import { config } from "@config";
import { getMenuQuery } from "@lib/shopify/queries/menu";
import { ensureStartsWith } from "@lib/utils";

import type { Menu, ShopifyMenuOperation } from "../types";
import { shopifyFetch } from "./fetch";

const domain = ensureStartsWith(config.shopify.domain, "https://");

const reshapeMenu = (menu: ShopifyMenuOperation["data"]["menu"]): Menu[] => {
  if (!menu?.items || !menu.items?.length) return [];

  return menu.items.map(({ items, ...item }) => ({
    title: item.title,
    path: item.url
      .replace(domain, "")
      .replace("/collections", "/search")
      .replace("/pages", ""),
    children: items?.length ? reshapeMenu({ items }) : undefined,
  }));
};

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    cache: "no-cache",
    variables: {
      handle,
    },
  });

  return reshapeMenu(res.body?.data?.menu);
}
