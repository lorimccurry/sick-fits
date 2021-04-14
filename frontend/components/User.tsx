import { gql, useQuery } from '@apollo/client';
import { ProductType } from './Product';

export type UseUserType = {
  id: number;
  email: string;
  name: string;
  cart: [CartItemType];
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductType;
};

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser(): UseUserType | undefined {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
