import { create } from 'zustand';
import {
  authLogin,
  authCheckStatus
} from '@/core/auth/actions/auth-actions';
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter';
import type { User } from '@/core/auth/interfaces/user';


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  changeStatus: ( token?: string, user?: User ) => Promise<boolean>;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()( ( set, get ) => ({
  // Properties
  status: 'checking',
  token: undefined,
  user: undefined,
  // Actions
  changeStatus: async ( token?: string, user?: User ) => {
    if ( !token || !user ) {
      set({
        status: 'unauthenticated',
        token: undefined,
        user: undefined,
      });
      await SecureStorageAdapter.deleteItem( 'token' );
      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    });
    // TODO: Guardar token en secure storage
    await SecureStorageAdapter.setItem( 'token', token );

    return true;
  },
  login: async ( email: string, password: string ) => {
    const resp = await authLogin( email, password );
    return get().changeStatus( resp?.token, resp?.user );
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus( resp?.token, resp?.user );
  },
  logout: async () => {
    SecureStorageAdapter.deleteItem( 'token' );

    set({
      status: 'unauthenticated',
      token: undefined,
      user: undefined,
    });
  },
}));
