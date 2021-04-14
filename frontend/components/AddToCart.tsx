import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import { CURRENT_USER_QUERY } from './User';

type AddToCartProps = {
  id: string;
};

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }: AddToCartProps): ReactElement {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      disabled={loading}
      type="button"
      onClick={() =>
        addToCart().catch((err) => console.log(`Boo you got an error: ${err}`))
      }
    >
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}
