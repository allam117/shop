import type { Connection, Money } from './common';

export type MarketingState =
  | 'INVALID'
  | 'NOT_SUBSCRIBED'
  | 'PENDING'
  | 'REDACTED'
  | 'SUBSCRIBED'
  | 'UNSUBSCRIBED';

export type FinancialStatus =
  | 'AUTHORIZED'
  | 'PAID'
  | 'EXPIRED'
  | 'PARTIALLY_PAID'
  | 'PARTIALLY_REFUNDED'
  | 'PENDING'
  | 'REFUNDED'
  | 'VOIDED';

export type CustomerAddressInput = {
  country: string;
  province: string;
  city: string;
  address1: string;
  address2: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  zip: string;
};

export type CustomerAddress = CustomerAddressInput & {
  id: string;
  name: string | null;
  formattedArea: string | null;
  countryCodeV2: string;
  provinceCode: string;
};

export type OrderLineItem = {
  quantity: number;
  title: string;
};

export type CustomerOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  processedAt: string;
  edited: boolean;
  cancelReason: 'CUSTOMER' | 'DECLINED' | 'FRAUD' | 'INVENTORY' | 'OTHER' | 'STAFF';
  fulfillmentStatus: 'UNFULFILLED' | 'FULFILLED' | 'IN_PROGRESS' | 'ON_HOLD' | 'SCHEDULED';
  financialStatus: FinancialStatus;
  totalPrice: Money;
  totalRefunded: Money;
  billingAddress: CustomerAddress;
  shippingAddress: CustomerAddress;
  lineItems: OrderLineItem[];
};

export type Customer = {
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  creationDate: string;
  email: string;
  phone: string | null;
  defaultAddress: CustomerAddress | null;
  orders: CustomerOrder[];
  addresses: CustomerAddress[];
};

type ShopifyCustomerOrder = Omit<CustomerOrder, 'lineItems'> & {
  lineItems: Connection<OrderLineItem>;
};

export type ShopifyCustomer = Omit<Customer, 'addresses' | 'orders'> & {
  addresses: Connection<CustomerAddress>;
  orders: Connection<ShopifyCustomerOrder>;
};

export type CustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

type CustomerUserErrors = {
  code?: string;
  field: string;
  message: string;
}[];

export type CustomerCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  acceptsMarketing?: boolean;
};

export type ShopifyCustomerOperation = {
  data: {
    customer: ShopifyCustomer;
  };
  variables: {
    customerAccessToken: string;
  };
};

export type ShopifyCustomerActivateByUrlOperation = {
  data: {
    customerActivateByUrl: {
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    password: string;
    activationUrl: string;
  };
};

export type ShopifyCustomerResetByUrlOperation = {
  data: {
    customerResetByUrl: {
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    password: string;
    resetUrl: string;
  };
};

export type ShopifyCustomerAccessTokenCreateOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    input: Pick<CustomerCreateInput, 'email' | 'password'>;
  };
};

export type ShopifyCustomerAccessTokenDeleteOperation = {
  data: {
    customerAccessTokenDelete: {
      customerAccessToken: string;
      deletedCustomerAccessTokenId: string;
      userErrors: CustomerUserErrors;
    };
  };
  variables: {
    customerAccessToken: string;
  };
};

export type ShopifyCustomerRecoverOperation = {
  data: {
    customerRecover: {
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    email: string;
  };
};

export type ShopifyCustomerCreateOperation = {
  data: {
    customerCreate: {
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    input: CustomerCreateInput;
  };
};

export type ShopifyCustomerUpdateOperation = {
  data: {
    customerUpdate: {
      customer: Customer;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    input: Omit<CustomerCreateInput, 'email'>;
    customerAccessToken: string;
  };
};

export type ShopifyCustomerAddressCreateOperation = {
  data: {
    customerAddressCreate: {
      customerAddress: CustomerAddress;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    address: CustomerAddressInput;
    defaultAddress: boolean;
  };
};

export type ShopifyCustomerAddressUpdateOperation = {
  data: {
    customerAddressUpdate: {
      customerAddress: CustomerAddress;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    addressId: string;
    address: Partial<CustomerAddressInput>;
    defaultAddress: boolean;
  };
};

export type ShopifyCustomerAddressDeleteOperation = {
  data: {
    customerAddressDelete: {
      deletedAddressId: string;
      customerUserErrors: CustomerUserErrors;
    };
  };
  variables: {
    addressId: string;
  };
};
