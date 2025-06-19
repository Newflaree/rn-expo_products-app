// React
import { useEffect } from 'react';
// React Native
import { 
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Platform
} from 'react-native';
// Expo
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Components
import {
  ThemedTextInput,
  ThemedView
} from '@/presentation/theme/components';


const ProductScreen = () => {
  const navigation = useNavigation();

  useEffect( () => {
    // TODO: Insert product name
    navigation.setOptions({
      headerRight: () => ( <Ionicons name='camera-outline' size={ 25 } /> )
    });
  }, [] );

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
    >
      <ScrollView>
        {/* TODO: Product Images */}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ProductScreen;
