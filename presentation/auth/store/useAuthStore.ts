import { create } from 'zustand';
import {
  authLogin,
  authCheckStatus
} from '@/core/auth/actions/auth-actions';
import type { User } from '@/core/auth/interfaces/user';


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  changeStatus: ( token?: string, user?: User ) => boolean;

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
  changeStatus: ( token?: string, user?: User ) => {
    if ( !token || !user ) {
      set({
        status: 'unauthenticated',
        token: undefined,
        user: undefined,
      });
      // TODO: Llamar logout

      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user
    });
    // TODO: Guardar token en secure storage

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
    // Clear token del secure storage
    set({
      status: 'unauthenticated',
      token: undefined,
      user: undefined,
    });
  },
}));
