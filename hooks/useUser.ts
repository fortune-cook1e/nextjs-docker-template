import { get } from '@/lib/request';
import { User } from '@/types';
import useSWR from 'swr';

export function useUsers() {
  const { data, error, isLoading } = useSWR<User[]>(`/api/user`, () => get('/user'));

  return {
    users: data,
    isLoading,
    isError: error,
  };
}

// export function useUser(id: string) {
//   const { data, error, isLoading } = useSWR(`/api/user/${id}`, getUserList);

//   return {
//     user: data,
//     isLoading,
//     isError: error,
//   };
// }
