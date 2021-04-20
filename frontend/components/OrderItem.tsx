import Link from 'next/link';
import { ReactElement } from 'react';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import { ProductType } from './Product';
import { OrderType } from './SingleOrder';

type OrderItemProps = {
  key: string;
  order: OrderType;
};

type OrderItem = {
  quantity: number;
  title: string;
};

export type OrderItemType = OrderItem & ProductType;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrderItem({ order }: OrderItemProps): ReactElement {
  return (
    <OrderItemStyles>
      <Link href={`/order/${order.id}`}>
        <a>
          <div className="order-meta">
            <p>{countItemsInAnOrder(order)} Items</p>
            <p>
              {order.items.length} Product
              {order.items.length === 1 ? '' : 's'}
            </p>
            <p>{formatMoney(order.total)}</p>
          </div>
          <div className="images">
            {order.items.map((item) => (
              <img
                key={`image-${item.id}`}
                src={item.photo?.image?.publicUrlTransformed}
                alt={item.name}
              />
            ))}
          </div>
        </a>
      </Link>
    </OrderItemStyles>
  );
}
