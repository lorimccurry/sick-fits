import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './DisplayError';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp(): ReactElement {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email}. Please go ahead and sign in.
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
