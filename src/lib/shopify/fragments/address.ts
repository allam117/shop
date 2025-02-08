const addressFragment = /* GraphQL */ `
  fragment address on MailingAddress {
    id
    name
    address1
    address2
    city
    country
    countryCodeV2
    firstName
    lastName
    formattedArea
    phone
    province
    provinceCode
    zip
  }
` as const;

export default addressFragment;
