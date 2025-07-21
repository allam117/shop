import { gql } from "graphql-request";
import { storefrontClient } from "./shopifyClient";

export async function loginCustomer(email: string, password: string) {
  const mutation = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  const response = await storefrontClient.request(mutation, variables);
  return response.customerAccessTokenCreate;
}
