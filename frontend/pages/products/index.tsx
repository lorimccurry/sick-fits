import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductPage(): ReactElement {
  const { query } = useRouter();
  const page = Array.isArray(query.page)
    ? parseInt(query.page[0])
    : parseInt(query.page);

  return (
    <>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={1} />
    </>
  );
}
