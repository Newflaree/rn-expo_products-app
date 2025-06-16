import { useEffect } from 'react';
// React Native
import { 
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';


const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

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
    <Stack>
      <Stack.Screen
        name='(home)/index'
        options={{
          title: 'Productos'
        }}
      />
    </Stack>
  );
}

export default CheckAuthenticationLayout;
