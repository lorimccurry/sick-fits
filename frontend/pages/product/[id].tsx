import { ReactElement } from 'react';
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }): ReactElement {
  return <SingleProduct id={query.id} />;
}
