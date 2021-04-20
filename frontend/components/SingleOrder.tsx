import { gql, useQuery } from '@apollo/client';
import { ReactElement } from 'react';
import DisplayError from './DisplayError';
import Head from 'next/head';
import OrderStyles from './styles/OrderStyles';
import formatMoney from '../lib/formatMoney';
import { UseUserType } from './User';
import { OrderItemType } from './OrderItem';

type SingleOrderProps = {
  id: string;
};

export type OrderType = {
  id: string;
  total: number;
  charge: string;
  label: string;
  user: UseUserType;
  items: [OrderItemType];
};

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      charge
      user {
        id
      }
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

export default function SingleOrder({ id }: SingleOrderProps): ReactElement {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const order: OrderType = data?.Order;
  const orderItems = order.items;

  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits | {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>ItemCount:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {orderItems.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
