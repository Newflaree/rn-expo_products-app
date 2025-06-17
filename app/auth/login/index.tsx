// React
import { useState } from 'react';
// React Native
import { 
  Alert,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';

import {
  ThemedButton,
  ThemedText,
  ThemedTextInput,
  ThemedLink
} from '@/presentation/theme/components';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';


const LoginScreen = () => {
  const { login } = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor( {}, 'background' );

  const [ isPosting, setIsPosting ] = useState( false );
  const [ form, setForm ] = useState({
    email: 'test2@email.com',
    password: 'Abc123'
  });

  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password });

    if ( email.length === 0 || password.length === 0 )
      return;

    setIsPosting( true );
    const wasSuccessful = await login( email, password );
    setIsPosting( false );

    if ( wasSuccessful ) {
      router.replace( '/' );
      return;
    }

    Alert.alert( 'Error', 'Usuario o contraseña no son correctos' );
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor
        }}
      >
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

            value={ form.email }
            onChangeText={ (value) => setForm({ ...form, email: value }) }
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon='lock-closed-outline'

            value={ form.password }
            onChangeText={ (value) => setForm({ ...form, password: value }) }
          />
        </View>

        <View style={{ marginTop: 10 }} />

        <ThemedButton
          icon='arrow-forward-outline'
          disabled={ isPosting }
          onPress={ onLogin }
        >
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
