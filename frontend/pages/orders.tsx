import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import styled from 'styled-components';
import OrderItem from '../components/OrderItem';
import Head from 'next/head';

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      label
      total
      charge
      items {
        id
        quantity
        name
        description
        price
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUlStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

export default function Orders(): ReactElement {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUlStyles>
        {allOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </OrderUlStyles>
    </div>
  );
}
