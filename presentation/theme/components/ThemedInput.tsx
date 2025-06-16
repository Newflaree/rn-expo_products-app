// React Native
import { 
  View,
  Text,
  TextInput,
  TextInputProps
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

export const ThemedInput = ({ icon, ...rest }: Props) => {
  return (
    <View>
      <Text>ThemedInput</Text>
    </View>
  );
}
