import * as React from 'react';
import { useUsersContextState, useUsersUpdateContext } from '@/providers';

export const UserForm = () => {
  const { data, error, state } = useUsersContextState();

  if (state === 'loading') {
    return <div>Loading</div>;
  }

  if (state === 'error') {
    return <div>{error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
