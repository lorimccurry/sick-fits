import { ReactElement } from 'react';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import CartItem from './CartItem';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/CartState';
import { Checkout } from './Checkout';

export default function Cart(): ReactElement {
  const me = useUser();

  const { cartOpen, closeCart } = useCart();

  if (!me) return <p>Cannot view cart.</p>;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
