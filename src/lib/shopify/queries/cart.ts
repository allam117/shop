import cartFragment, { cartCheckoutUrlFragment } from '../fragments/cart';

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const getCartCheckoutUrlQuery = /* GraphQL */ `
  query getCartCheckoutUrl($cartId: ID!) {
    cart(id: $cartId) {
      ...cartCheckoutUrl
    }
  }
  ${cartCheckoutUrlFragment}
`;
