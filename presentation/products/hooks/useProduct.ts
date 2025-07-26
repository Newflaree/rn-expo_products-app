// React
import { useRef } from 'react';
// React Native
import { Alert } from 'react-native';
// TanStack
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';

// Actions
import {
  getProductById,
  createUpdateProduct
} from '@/core/products/actions';
// Interfaces
import { Product } from '@/core/products/interfaces/product.interface';
import { useCameraStore } from '@/presentation/store/useCameraStore';


export const useProduct = ( productId: string ) => {
  const { clearImages } = useCameraStore();
  const queryClient = useQueryClient();
  const productIdRef = useRef( productId );

  const productQuery = useQuery({
    queryKey: [ 'products', productId ],
    queryFn: () => getProductById( productId ),
    staleTime: 1000 * 60 * 60
  });

  const productMutation = useMutation({
    mutationFn: async ( data: Product ) => createUpdateProduct({
      ...data,
      id: productIdRef.current
    }),
    onSuccess: ( data: Product ) => {
      productIdRef.current = data.id;

      clearImages();

      queryClient.invalidateQueries({
        queryKey: [ 'products', 'infinite' ]
      });

      queryClient.invalidateQueries({
        queryKey: [ 'products', data.id ]
      });

      Alert.alert( 'Producto Guardado', `${ data.title } se guardó correctamente` );
    }
  });

  // TODO: Maintenande id product when it's a new product

  return {
    productQuery,
    productMutation
  }
}
