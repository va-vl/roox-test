import * as React from 'react';
//
import { useUsersContextState } from '@/providers';

export const UsersList = () => {
  const { data, error, state } = useUsersContextState();

  if (state === 'loading') {
    return <div>Loading</div>;
  }

  if (state === 'error') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.city}</p>
          <p>{user.company}</p>
        </div>
      ))}
    </div>
  );
};
