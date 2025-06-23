import { useEffect } from 'react';
// React Native
import { 
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { LogoutIconButton } from '@/presentation/auth/components';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';


const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor( {}, 'background' );

  useEffect( () => {
    checkStatus();
  }, [] );


  if ( status === 'checking' ) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
    }}>
      <ActivityIndicator />
    </View>
  }

  if ( status === 'unauthenticated' ) {
    // TODO: Save user path on storage before redirect
    return <Redirect href='/auth/login' />
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor
        },
        contentStyle: {
          backgroundColor: backgroundColor
        }
      }}
    >
      <Stack.Screen
        name='(home)/index'
        options={{
          title: 'Productos',
          headerLeft: () => <LogoutIconButton />
        }}
      />

      <Stack.Screen
        name='product/[id]'
        options={{
          title: 'Producto',
        }}
      />
    </Stack>
  );
}

export default CheckAuthenticationLayout;
