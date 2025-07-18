// React Native
import { 
  View,
  FlatList,
  Image,
} from 'react-native';


interface Props {
  images: string[];
}

export const ProductImages = ({ images }: Props) => {
  if ( images.length === 0 ) return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Image
        source={ require( '../../../assets/images/no-product-image.png' ) }
        style={{
          width: 300,
          height: 300
        }}
      />
    </View>
  );

  return (
    <FlatList
      data={ images }
      keyExtractor={ ( item ) => item }
      horizontal
      showsHorizontalScrollIndicator={ false }
      renderItem={ ({ item }) => (
        <Image
          source={{ uri: item }}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: 7,
            borderRadius: 5,
          }}
        />
      )}
    />
  );
}
