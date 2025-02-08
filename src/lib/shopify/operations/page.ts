import { getPageQuery, getPagesQuery } from '@lib/shopify/queries/page';

import type { Page, ShopifyPageOperation, ShopifyPagesOperation } from '../types';
import { removeEdgesAndNodes } from './common';
import { shopifyFetch } from './fetch';

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: 'no-store',
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: 'no-store',
  });

  return removeEdgesAndNodes(res.body.data.pages);
}
