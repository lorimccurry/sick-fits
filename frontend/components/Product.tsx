import Link from 'next/link';
import { ReactElement } from 'react';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

interface ProductProps {
  key: string;
  product: Product;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo?: Photo;
}

interface Photo {
  id: string;
  image?: Image;
}

interface Image {
  publicUrlTransformed: string;
}

export default function Product({ product }: ProductProps): ReactElement {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: add buttons to edit/delete item */}
    </ItemStyles>
  );
}
