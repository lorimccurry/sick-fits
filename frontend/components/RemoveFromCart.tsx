import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import DisplayError from './DisplayError';
import styled from 'styled-components';

type RemoveFromCartProps = {
  id: number;
};

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButtonStyles = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({
  id,
}: RemoveFromCartProps): ReactElement {
  const [removeFromCart, { loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
      update,
      // NOTE: error with how this should perform
      // leaving here as a reference when apollo fixes
      // optimisticResponse: {
      //   deleteCartItem: {
      //     __typename: 'CartItem',
      //     id,
      //   },
      // },
    }
  );

  if (error) return <DisplayError error={error} />;

  return (
    <BigButtonStyles
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButtonStyles>
  );
}
