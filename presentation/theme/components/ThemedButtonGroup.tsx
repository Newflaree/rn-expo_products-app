// React Native
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';


interface Props {
  options: string[];
  selectedOptions: string[];

  onSelect: ( option: string ) => void;
}

export const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const primaryColor = useThemeColor( {}, 'primary' );

  return (
    <View style={ styles.container }>
      {
        options.map( option => (
          <TouchableOpacity
            key={ option }
            onPress={ () => onSelect( option ) }
            style={[
              styles.button,
              selectedOptions.includes( option ) && {
                backgroundColor: primaryColor
              }
            ]}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={ 1 }
              style={[
                styles.buttonText,
                selectedOptions.includes( option ) && styles.selectedButtonText
              ]}
            >
              { option }
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16
  },
  selectedButtonText: {
    color: '#FFF'
  }
});
