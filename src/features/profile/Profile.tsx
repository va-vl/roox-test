import * as React from 'react';
import { useDataContextState } from '@/providers';

export const UserProfile = () => {
  const { data, error, state } = useDataContextState();

  if (state === 'loading') {
    return <div>Loading</div>;
  }

  if (state === 'error') {
    return <div>{error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
