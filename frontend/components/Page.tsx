import React, { ReactElement, ReactNode } from 'react';
import Header from './Header';

type Props = {
  children?: ReactNode;
  cool?: string;
};

export default function Page({ children, cool }: Props): ReactElement {
  return (
    <div>
      <Header />
      <h2>i'm a page component</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}
