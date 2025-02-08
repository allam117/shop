import { TAGS } from '@lib/shopify';

import {
  activateCustomerByUrlMutation,
  createCustomerAccessTokenMutation,
  createCustomerAddressMutation,
  createCustomerMutation,
  customerRecoverMutation,
  customerResetByUrlMutation,
  deleteCustomerAccessTokenMutation,
  deleteCustomerAddressMutation,
  updateCustomerAddressMutation,
  updateCustomerMutation,
} from '../mutations';
import { getCustomerQuery } from '../queries';
import type {
  Customer,
  CustomerAccessToken,
  CustomerAddress,
  CustomerCreateInput,
  ShopifyCustomer,
  ShopifyCustomerAccessTokenCreateOperation,
  ShopifyCustomerAccessTokenDeleteOperation,
  ShopifyCustomerActivateByUrlOperation,
  ShopifyCustomerAddressCreateOperation,
  ShopifyCustomerAddressDeleteOperation,
  ShopifyCustomerAddressUpdateOperation,
  ShopifyCustomerCreateOperation,
  ShopifyCustomerOperation,
  ShopifyCustomerRecoverOperation,
  ShopifyCustomerResetByUrlOperation,
  ShopifyCustomerUpdateOperation,
} from '../types';
import { removeEdgesAndNodes } from './common';
import { shopifyFetch } from './fetch';

const reshapeCustomer = (customer: ShopifyCustomer): Customer => {
  return {
    ...customer,
    addresses: removeEdgesAndNodes(customer.addresses),
    orders: removeEdgesAndNodes(customer.orders).map(({ lineItems, ...order }) => ({
      ...order,
      lineItems: removeEdgesAndNodes(lineItems),
    })),
  };
};

export const getCustomer = async (customerToken: string): Promise<Customer | null> => {
  const res = await shopifyFetch<ShopifyCustomerOperation>({
    query: getCustomerQuery,
    tags: [TAGS.customer],
    variables: {
      customerAccessToken: customerToken,
    },
  });

  const customer = res.body.data.customer;
  return customer ? reshapeCustomer(customer) : null;
};

export const createCustomer = async (input: CustomerCreateInput): Promise<void> => {
  const res = await shopifyFetch<ShopifyCustomerCreateOperation>({
    query: createCustomerMutation,
    tags: [TAGS.customer],
    variables: {
      input,
    },
  });

  const payload = res.body.data.customerCreate;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }
};

export const customerRecover = async (email: string): Promise<void> => {
  const res = await shopifyFetch<ShopifyCustomerRecoverOperation>({
    query: customerRecoverMutation,
    tags: [TAGS.customer],
    variables: {
      email,
    },
  });

  const payload = res.body.data.customerRecover;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }
};

export const customerActivateByUrl = async (
  activationUrl: string,
  password: string
): Promise<CustomerAccessToken> => {
  const res = await shopifyFetch<ShopifyCustomerActivateByUrlOperation>({
    query: activateCustomerByUrlMutation,
    tags: [TAGS.customer],
    variables: {
      activationUrl,
      password,
    },
  });

  const payload = res.body.data.customerActivateByUrl;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customerAccessToken;
};

export const customerResetByUrl = async (
  resetUrl: string,
  password: string
): Promise<CustomerAccessToken> => {
  const res = await shopifyFetch<ShopifyCustomerResetByUrlOperation>({
    query: customerResetByUrlMutation,
    tags: [TAGS.customer],
    variables: {
      resetUrl,
      password,
    },
  });

  const payload = res.body.data.customerResetByUrl;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customerAccessToken;
};

export const createCustomerAccessToken = async (
  email: string,
  password: string
): Promise<CustomerAccessToken> => {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenCreateOperation>({
    query: createCustomerAccessTokenMutation,
    tags: [TAGS.customer],
    variables: {
      input: { email, password },
    },
  });

  const payload = res.body.data.customerAccessTokenCreate;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customerAccessToken;
};

export const deleteCustomerAccessToken = async (customerToken: string): Promise<void> => {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenDeleteOperation>({
    query: deleteCustomerAccessTokenMutation,
    tags: [TAGS.customer],
    variables: {
      customerAccessToken: customerToken,
    },
  });

  const payload = res.body.data.customerAccessTokenDelete;

  if (payload.userErrors.length) {
    throw payload.userErrors[0];
  }
};

export const updateCustomer = async (
  customerToken: string,
  input: Omit<CustomerCreateInput, 'email'>
): Promise<Customer> => {
  const res = await shopifyFetch<ShopifyCustomerUpdateOperation>({
    query: updateCustomerMutation,
    tags: [TAGS.customer],
    variables: {
      input,
      customerAccessToken: customerToken,
    },
  });

  const payload = res.body.data.customerUpdate;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customer;
};

export const createCustomerAddress = async (
  customerToken: string,
  variables: ShopifyCustomerAddressCreateOperation['variables']
): Promise<CustomerAddress> => {
  const res = await shopifyFetch<ShopifyCustomerAddressCreateOperation>({
    query: createCustomerAddressMutation,
    tags: [TAGS.customer],
    headers: {
      Authorization: customerToken,
    },
    variables,
  });

  const payload = res.body.data.customerAddressCreate;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customerAddress;
};

export const updateCustomerAddress = async (
  customerToken: string,
  variables: ShopifyCustomerAddressUpdateOperation['variables']
): Promise<CustomerAddress> => {
  const res = await shopifyFetch<ShopifyCustomerAddressUpdateOperation>({
    query: updateCustomerAddressMutation,
    tags: [TAGS.customer],
    headers: {
      Authorization: customerToken,
    },
    variables,
  });

  const payload = res.body.data.customerAddressUpdate;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return payload.customerAddress;
};

export const deleteCustomerAddress = async (
  customerToken: string,
  variables: { addressId: string }
): Promise<{ id: string }> => {
  const res = await shopifyFetch<ShopifyCustomerAddressDeleteOperation>({
    query: deleteCustomerAddressMutation,
    tags: [TAGS.customer],
    headers: {
      Authorization: customerToken,
    },
    variables,
  });

  const payload = res.body.data.customerAddressDelete;

  if (payload.customerUserErrors.length) {
    throw payload.customerUserErrors[0];
  }

  return { id: payload.deletedAddressId };
};
