import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  cool?: string;
};

export default function Page({ children, cool }: Props) {
  return (
    <div>
      <h2>i'm a page component</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}
