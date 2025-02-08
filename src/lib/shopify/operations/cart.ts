import { TAGS, reshapeProduct } from '@lib/shopify';

import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
  updateCartBuyerIdentityMutation,
} from '../mutations/cart';
import { getCartCheckoutUrlQuery, getCartQuery } from '../queries';
import type {
  Cart,
  CartBuyerIdentityInput,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartBuyerIdentity,
  ShopifyCartBuyerIdentityUpdateOperation,
  ShopifyCartCheckoutUrlOperation,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from '../types';
import { removeEdgesAndNodes } from './common';
import { shopifyFetch } from './fetch';

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines).map(({ merchandise, ...line }) => ({
      ...line,
      merchandise: {
        ...merchandise,
        product: reshapeProduct(merchandise.product)!,
      },
    })),
  };
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string | undefined): Promise<Cart | undefined> {
  if (!cartId) {
    return undefined;
  }

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCartCheckoutUrl(cartId: string): Promise<string | undefined> {
  const res = await shopifyFetch<ShopifyCartCheckoutUrlOperation>({
    query: getCartCheckoutUrlQuery,
    variables: { cartId },
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return res.body.data.cart.checkoutUrl;
}

export async function updateCartBuyerIdentity(
  cartId: string,
  input: CartBuyerIdentityInput
): Promise<ShopifyCartBuyerIdentity> {
  const res = await shopifyFetch<ShopifyCartBuyerIdentityUpdateOperation>({
    query: updateCartBuyerIdentityMutation,
    variables: {
      cartId,
      buyerIdentity: input,
    },
  });

  const payload = res.body.data.cartBuyerIdentityUpdate;
  if (payload.userErrors.length || payload.warnings.length) {
    throw payload.userErrors[0] || payload.warnings[0];
  }

  return payload.cart;
}
