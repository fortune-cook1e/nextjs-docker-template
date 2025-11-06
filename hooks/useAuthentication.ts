import { post } from '@/lib/request';
import { User } from '@/types';
import useSWRMutation from 'swr/mutation';

interface RegisterParams {
  email: string;
  password: string;
}

interface RegisterResponse {
  data?: User;
  message?: string;
  error?: string;
}

export function useRegister() {
  const { trigger, isMutating, error } = useSWRMutation<
    RegisterResponse,
    Error,
    string,
    RegisterParams
  >('/auth/register', async (url, { arg }: { arg: RegisterParams }) => {
    return post<RegisterResponse>(url, arg);
  });

  return {
    register: ({ email, password }: { email: string; password: string }) =>
      trigger({ email, password }),
    isLoading: isMutating,
    error,
  };
}
