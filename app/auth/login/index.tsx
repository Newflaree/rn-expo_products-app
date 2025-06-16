// React Native
import { 
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
  ThemedLink
} from '@/presentation/theme/components';


const LoginScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{ color: 'gray' }}>Por favor, ingrese para continuar</ThemedText>
        </View>

        { /*Email y Password*/ }
        <View>
          <ThemedTextInput
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon='lock-closed-outline'
          />
        </View>

        <View style={{ marginTop: 10 }} />

        <ThemedButton icon='arrow-forward-outline'>
          Ingresar
        </ThemedButton>

        <View style={{ marginTop: 50 }} />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ThemedText>¿No tienes cuente?</ThemedText>
          <ThemedLink href='/auth/register' style={{ marginHorizontal: 5 }}>
            Crear Cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
