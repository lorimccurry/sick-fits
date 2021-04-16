import Link from 'next/link';
import { ReactElement } from 'react';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/CartState';
import CartCount from './styles/CartCount';

export default function Nav(): ReactElement {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce((tally, cartItem) => {
                return tally + (cartItem.product ? cartItem.quantity : 0);
              }, 0)}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
