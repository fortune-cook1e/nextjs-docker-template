'use client';
import { useEffect, useState } from 'react';

import { get } from '../../lib/request';
import { User } from '@/types';

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    get('/user')
      .then(data => setUsers(data))
      .catch(err => {
        // 可处理错误
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>this is User Page</h1>
      {users.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
};

export default Page;
