import addressFragment from './address';

const customerFragment = /* GraphQL */ `
  fragment customer on Customer {
    id
    acceptsMarketing
    defaultAddress {
      ...address
    }
    displayName
    email
    firstName
    lastName
    phone
    numberOfOrders
    createdAt
    updatedAt
  }
  ${addressFragment}
` as const;

export default customerFragment;
