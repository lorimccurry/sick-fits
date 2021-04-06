import Link from 'next/link';
import { ReactElement } from 'react';

export default function Nav(): ReactElement {
  return (
    <nav>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </nav>
  );
}
