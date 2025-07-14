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
  Redirect,
  router
} from 'expo-router';
// Formik
import { Formik } from 'formik';

// Components
import {
  MenuIconButton,
  ThemedTextInput,
  ThemedView,
  ThemedButton,
  ThemedButtonGroup
} from '@/presentation/theme/components';
import { ProductImages } from '@/presentation/products/components';
// Hooks
import { useProduct } from '@/presentation/products/hooks';


const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct( `${ id }` );

  useEffect( () => {
    navigation.setOptions({
      headerRight: () => <MenuIconButton
        onPress={ () => router.push( '/camera' ) }
        icon='camera-outline'
      />
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
    <Formik
      initialValues={ product }
      onSubmit={ productMutation.mutate }
    >
      { 
        ({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
          >
            <ScrollView>
              <ProductImages
                images={ values.images }
              />

              <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                <ThemedTextInput
                  placeholder='Título'
                  value={ values.title }
                  onChangeText={ handleChange( 'title' ) }
                  style={{
                    marginHorizontal: 5
                  }}
                />

                <ThemedTextInput
                  placeholder='Slug'
                  value={ values.slug }
                  onChangeText={ handleChange( 'slug' ) }
                  style={{
                    marginHorizontal: 5
                  }}
                />

                <ThemedTextInput
                  placeholder='Descripción'
                  value={ values.description }
                  onChangeText={ handleChange( 'description' ) }
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
                  value={ values.price.toString() }
                  onChangeText={ handleChange( 'price' ) }
                  style={{
                    flex: 1,
                    marginHorizontal: 5
                  }}
                />

                <ThemedTextInput
                  placeholder='Inventario'
                  value={ values.stock.toString() }
                  onChangeText={ handleChange( 'stock' ) }
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
                  selectedOptions={ values.sizes }
                  onSelect={ ( selectedSize ) => {
                    const newSizesValue = values.sizes.includes( selectedSize )
                      ? values.sizes.filter( size => size !== selectedSize )
                      : [ ...values.sizes, selectedSize ];

                    setFieldValue( 'sizes', newSizesValue );
                  }}
                />

                <ThemedButtonGroup
                  options={[ 'kid', 'men', 'women', 'unisex' ]}
                  selectedOptions={ [values.gender] }
                  onSelect={ ( selectedOption ) => setFieldValue( 'gender', selectedOption ) }
                />
              </ThemedView>

              <View style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20
              }}>
                <ThemedButton
                  onPress={ () => handleSubmit() }
                  icon='save-outline'
                >
                  Guardar
                </ThemedButton>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }
    </Formik>
  );
}

export default ProductScreen;
