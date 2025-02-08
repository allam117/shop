import { TAGS } from '@lib/shopify';

import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from '../queries/collection';
import type {
  Collection,
  Product,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
} from '../types';
import { removeEdgesAndNodes } from './common';
import { shopifyFetch } from './fetch';
import { reshapeProducts } from './product';

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`,
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
    },
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  // const collections = [
  //   {
  //     handle: '',
  //     title: 'All',
  //     description: 'All products',
  //     seo: {
  //       title: 'All',
  //       description: 'All products',
  //     },
  //     path: '/search',
  //     updatedAt: new Date().toISOString(),
  //   },
  //   // Filter out the `hidden` collections.
  //   // Collections that start with `hidden-*` need to be hidden on the search page.
  //   ...reshapeCollections(shopifyCollections).filter(
  //     collection => !collection.handle.startsWith('hidden')
  //   ),
  // ];

  return reshapeCollections(shopifyCollections).filter(
    collection => !collection.handle.startsWith('hidden')
  );
}
