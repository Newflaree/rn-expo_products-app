// React Native
import { 
  View,
  Text,
  FlatList
} from 'react-native';
import { Product } from '@/core/products/interfaces/product.interface';
import { ProductCard } from './';


interface Props {
  products: Product[];
  loadNextPage: () => void;
}


export const ProductList = ({ products, loadNextPage }: Props) => {
  return (
    <FlatList
      data={ products }
      numColumns={ 2 }
      keyExtractor={ (item) => item.id }
      renderItem={ ({ item }) => <ProductCard product={ item } /> }
    />
  );
}
