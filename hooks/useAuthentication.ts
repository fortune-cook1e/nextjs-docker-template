import { post } from '@/lib/request';
import { AuthenticationResponse, Login, Register } from '@/types';
import useSWRMutation from 'swr/mutation';

function registerFetcher(url: string, { arg }: { arg: Register }) {
  return post<AuthenticationResponse>(url, arg);
}

function loginFetcher(url: string, { arg }: { arg: Login }) {
  return post<AuthenticationResponse>(url, arg);
}

function logoutFetcher(url: string) {
  return post(url);
}

export function useRegister() {
  const { trigger, isMutating, error } = useSWRMutation<
    AuthenticationResponse,
    Error,
    string,
    Register
  >('/auth/register', registerFetcher);

  return {
    register: trigger,
    loading: isMutating,
    error,
  };
}

export function useLogin() {
  const { trigger, isMutating, error } = useSWRMutation<
    AuthenticationResponse,
    Error,
    string,
    Login
  >('/auth/login', loginFetcher);

  return {
    login: trigger,
    loading: isMutating,
    error,
  };
}

export function useLogout() {
  const { trigger, isMutating, error } = useSWRMutation<any, Error, string>(
    '/auth/logout',
    logoutFetcher
  );

  return {
    logout: trigger,
    loading: isMutating,
    error,
  };
}
