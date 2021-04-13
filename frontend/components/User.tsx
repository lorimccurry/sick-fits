import { gql, useQuery } from '@apollo/client';

type UseUser = {
  id: number;
  email: string;
  name: string;
};

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # todo: query cart once we have it
      }
    }
  }
`;

export function useUser(): UseUser | undefined {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
