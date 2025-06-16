// React Native
import { 
  View,
  Text
} from 'react-native';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';


const HomeScreen = () => {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: 'KanitBold', color: primaryColor}}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: 'KanitRegular' }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: 'KanitThin' }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>
    </View>
  );
}

export default HomeScreen;
