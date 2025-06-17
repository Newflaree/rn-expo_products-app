import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/core/products/actions';


export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({pageParam}) =>  getProducts( 20, pageParam * 20 ),

    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: ( lastPage, allPages ) =>  allPages.length,
  });

  return {
    productsQuery,
    // Metohods
    loadNextPage: productsQuery.fetchNextPage,
  }
}
