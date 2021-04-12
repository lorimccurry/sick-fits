import { PAGINATION_QUERY } from './../components/Pagination';

export default function paginationField() {
  return {
    read(existing = [], { args, cache }) {
      // asks read fn for items
      // options:
      // 1. return items b/c they are already in cache
      // 2. or return false from here to trigger a network request

      const { skip, first } = args;
      // read num of items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x); // filters out undefined items)

      // if there are items and there aren't enuf to satisfy how many were requested
      // and we are on the last page
      // then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have items so go to network to fetch
        return false;
      }

      if (items.length) {
        console.log(`There are ${items.length} in cache so sending to apollo.`);

        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      // runs when the apollo client comes back from the network with products
      // answers "how do you want to put the items back into the cache"

      console.log(`Merging items from the network: ${incoming.length}.`);

      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      console.log({ merged });
      // return items from the merged cache, which will trigger the read fn again
      return merged;
    },
  };
}
