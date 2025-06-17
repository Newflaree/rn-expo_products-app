// React Native
import { 
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useProducts } from '@/presentation/products/hooks/useProducts';
import { ProductList } from '@/presentation/products/components';


const HomeScreen = () => {
  const primaryColor = useThemeColor({}, 'primary');
  const { productsQuery, loadNextPage } = useProducts();

  if ( productsQuery.isLoading ) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size={ 30 } />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ProductList
        products={ productsQuery.data?.pages.flatMap( page => page ) ?? [] }
        loadNextPage={ loadNextPage }
      />
    </View>
  );
}

export default HomeScreen;
