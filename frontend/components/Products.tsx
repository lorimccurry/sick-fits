import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactElement } from 'react';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCT_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products(): ReactElement {
  const { data, error, loading } = useQuery(ALL_PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </>
  );
}