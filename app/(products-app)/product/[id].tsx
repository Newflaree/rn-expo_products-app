// React
import { useEffect } from 'react';
// React Native
import { 
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform
} from 'react-native';
// Expo
import {
  useNavigation,
  useLocalSearchParams,
  Redirect
} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Components
import {
  ThemedTextInput,
  ThemedView,
  ThemedButton,
  ThemedButtonGroup,
} from '@/presentation/theme/components';
import { ProductImages } from '@/presentation/products/components';
// Hooks
import { useProduct } from '@/presentation/products/hooks';


const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery } = useProduct( `${ id }` );

  useEffect( () => {
    navigation.setOptions({
      headerRight: () => ( <Ionicons name='camera-outline' size={ 25 } /> )
    });
  }, [] );

  useEffect( () => {
    if ( productQuery.data ) {
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [ productQuery.data ] );

  if ( productQuery.isLoading ) return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <ActivityIndicator size={ 30 } />
  </View>

  if ( !productQuery.data ) return <Redirect
    href='/(products-app)/(home)'
  />

  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    >
      <ScrollView>
        <ProductImages
          images={ product.images }
        />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Título'
            style={{
              marginHorizontal: 5
            }}
          />

          <ThemedTextInput
            placeholder='Slug'
            style={{
              marginHorizontal: 5
            }}
          />

          <ThemedTextInput
            placeholder='Descripción'
            multiline
            numberOfLines={ 5 }
            style={{
              marginHorizontal: 5
            }}
          />
        </ThemedView>

        <ThemedView style={{
          marginHorizontal: 10,
          marginVertical: 20,
          flexDirection: 'row',
          gap: 10
        }}>
          <ThemedTextInput
            placeholder='Precio'
            style={{
              flex: 1,
              marginHorizontal: 5
            }}
          />

          <ThemedTextInput
            placeholder='Inventario'
            style={{
              flex: 1,
              marginHorizontal: 5
            }}
          />
        </ThemedView>

        <ThemedView style={{
          marginHorizontal: 10
        }}>
          <ThemedButtonGroup
            options={[ 'XS', 'S', 'M', 'L', 'XL', 'XXL' ]}
            selectedOptions={ product.sizes }
            onSelect={ ( options ) => console.log({ options }) }
          />

          <ThemedButtonGroup
            options={[ 'kid', 'men', 'women', 'unisex' ]}
            selectedOptions={ [product.gender] }
            onSelect={ ( options ) => console.log({ options }) }
          />
        </ThemedView>

        <View style={{
          marginHorizontal: 10,
          marginBottom: 50,
          marginTop: 20
        }}>
          <ThemedButton
            onPress={ () => console.log( 'Guardar' ) }
            icon='save-outline'
          >
            Guardar
          </ThemedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ProductScreen;
