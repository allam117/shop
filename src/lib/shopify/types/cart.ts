import type { Connection, Money } from './common';
import { Product, ShopifyProduct } from './product';

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: Array<
    Omit<ShopifyCartItem, 'merchandise'> & {
      merchandise: {
        id: string;
        title: string;
        selectedOptions: {
          name: string;
          value: string;
        }[];
        product: Product;
      };
    }
  >;
};

export type CartBuyerIdentityInput = {
  phone?: string | null;
  email?: string | null;
  countryCode?: string | null;
  customerAccessToken?: string | null;
};

export type ShopifyCartBuyerIdentity = {
  id: string;
  buyerIdentity: {
    customer: { email: string } | null;
  };
};

export type CartCheckoutUrl = {
  checkoutUrl: string;
};

export type CartProduct = ShopifyProduct;

export type ShopifyCartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type CartDiscountAllocation = {
  discountedAmount: Money;
};

export type ShopifyCart = {
  id: string;
  discountAllocations: CartDiscountAllocation[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<ShopifyCartItem>;
  totalQuantity: number;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCartCheckoutUrlOperation = {
  data: {
    cart: CartCheckoutUrl;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCartBuyerIdentityUpdateOperation = {
  data: {
    cartBuyerIdentityUpdate: {
      cart: ShopifyCartBuyerIdentity;
      userErrors: {
        code: string;
        field: string;
        message: string;
      }[];
      warnings: {
        code: string;
        target: string;
        message: string;
      }[];
    };
  };
  variables: {
    cartId: string;
    buyerIdentity: CartBuyerIdentityInput;
  };
};
