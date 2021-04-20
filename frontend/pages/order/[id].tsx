import { ReactElement } from 'react';
import SingleOrder from '../../components/SingleOrder';

export default function SingleOrderPage({ query }): ReactElement {
  return (
    <div>
      <SingleOrder id={query.id} />
    </div>
  );
}
