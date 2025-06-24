import { Alert } from 'react-native';
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';

import { getProductById, createUpdateProduct } from '@/core/products/actions';
import { Product } from '@/core/products/interfaces/product.interface';




export const useProduct = ( productId: string ) => {
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById( productId ),
    staleTime: 1000 * 60 * 60
  });

  const productMutation = useMutation({
    mutationFn: async ( data: Product ) => createUpdateProduct( data ),
    onSuccess: ( data: Product ) => {
      // TODO: Invalidate products queries
      Alert.alert( 'Producto Guardado', `${ data.title } se guardó correctamente` );
    }
  });

  // TODO: Maintenande id product when it's a new product

  return {
    productQuery,
    productMutation
  }
}
