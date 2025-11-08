import { get } from '@/lib/request';
import { User } from '@/types';
import useSWR from 'swr';

function getUserInfo(url: string) {
  return get<User>(url);
}

export function useUser() {
  const { data, error, isLoading } = useSWR('/user', getUserInfo);

  return {
    user: data,
    error,
    loading: isLoading,
  };
}
