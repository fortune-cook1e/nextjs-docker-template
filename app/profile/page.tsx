'use client';
import { useUsers } from '@/hooks';

const Page = () => {
  const { users = [] } = useUsers();

  return (
    <div>
      <h1>this is User Page</h1>
      {users.map(p => (
        <p key={p.id}>{p.id}</p>
      ))}
    </div>
  );
};

export default Page;
