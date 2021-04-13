import { ReactElement } from 'react';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

type ResetPageProps = {
  query: ResetQuery;
};

type ResetQuery = {
  token: string;
};

export default function ResetPage({ query }: ResetPageProps): ReactElement {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply a token.</p>
        <RequestReset />
      </>
    );
  }

  return (
    <>
      <Reset token={query.token} />
    </>
  );
}
