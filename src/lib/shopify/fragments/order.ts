const orderFragment = /* GraphQL */ `
  fragment order on Order {
    id
    name
    email
    phone
    processedAt
    edited
    cancelReason
    financialStatus
    fulfillmentStatus
    totalPrice {
      amount
      currencyCode
    }
    totalRefunded {
      amount
      currencyCode
    }
    billingAddress {
      ...address
    }
    shippingAddress {
      ...address
    }
    lineItems(first: 10) {
      edges {
        node {
          quantity
          title
        }
      }
    }
  }
`;

export default orderFragment;
