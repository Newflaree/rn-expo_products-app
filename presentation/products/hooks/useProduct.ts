import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/core/products/actions';


export const useProduct = ( productId: string ) => {
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById( productId ),
    staleTime: 1000 * 60 * 60
  });

  return {
    productQuery,
  }
}
