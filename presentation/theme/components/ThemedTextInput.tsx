import {
  useState,
  useRef
} from 'react';
// React Native
import { 
  View,
  TextInput,
  TextInputProps,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';


interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  style?: string | any;
}

export const ThemedTextInput = ({ icon, style, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const [ isActive, setIsActive ] = useState( false );
  const inputRef = useRef<TextInput>( null );

  return (
    <View
      onTouchStart={ () => inputRef.current?.focus() }
      style={[
        {
        ...styles.border,
        borderColor: isActive ? primaryColor : '#CCC'
        },
        style
      ]}
    >
      {
        icon && (
          <Ionicons
            name={ icon }
            size={ 24 }
            color={ textColor }
            style={{ marginRight: 10 }}
          />
        )
      }
      <TextInput
        ref={ inputRef }
        placeholderTextColor='#5C5C5C'
        onFocus={ () => setIsActive( true ) }
        onBlur={ () => setIsActive( false ) }
        style={{
          color: textColor,
          marginRight: 10,
          flex: 1
        }}
        { ...rest }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
