import Link from 'next/link';
import { ReactElement } from 'react';
import Nav from './Nav';

export default function Header(): ReactElement {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}
