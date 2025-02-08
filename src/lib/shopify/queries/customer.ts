import customerFragment from '../fragments/customer';
import orderFragment from '../fragments/order';

export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...customer
      orders(first: 5, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            ...order
          }
        }
      }
      addresses(first: 5, reverse: true) {
        edges {
          node {
            ...address
          }
        }
      }
    }
  }
  ${customerFragment}
  ${orderFragment}
` as const;
