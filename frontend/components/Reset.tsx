import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './DisplayError';

type ResetProps = {
  token?: string;
};

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }: ResetProps): ReactElement {
  const { inputs, handleChange, resetForm } = useForm({
    token,
    email: '',
    password: '',
  });

  const [signup, { loading, data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
