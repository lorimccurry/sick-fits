import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { ReactElement } from 'react';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut(): ReactElement {
  function handleSignOut() {
    signout();
    Router.push({
      pathname: `/signin`,
    });
  }

  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
