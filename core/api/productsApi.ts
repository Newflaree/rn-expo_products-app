import { Platform } from 'react-native';
import axios from 'axios';

import { SecureStorageAdapter} from '@/helpers/adapters/secure-storage.adapter';


const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';

export const API_URL = ( STAGE === 'prod' )
  ? process.env.EXPO_PUBLIC_API_URL
  : Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;
    
const productsApi = axios.create({
  baseURL: API_URL 
});

// Interceptors
productsApi.interceptors.request.use( async ( config ) => {
  // Check token on secure storage
  const token = await SecureStorageAdapter.getItem( 'token' );

  if ( token ) {
    config.headers.Authorization = `Bearer ${ token }`;
  }
  
  return config;
});

export { productsApi }
