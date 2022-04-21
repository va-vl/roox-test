import * as React from 'react';
import { useParams } from 'react-router-dom';
//
import { useDataStatusContext, useDataContextUpdater } from '@/providers';
import { ErrorMessage, NotFoundMessage } from '@/components';
import { APIRequestStatus } from '@/types';

export const UserProfileContainer = () => {
  const [disabled, setDisabled] = React.useState(true);
  const { error, state } = useDataStatusContext();
  const { getUserById, updateUserById } = useDataContextUpdater();
  const { id } = useParams();
  const user = getUserById(String(id));

  if (!user) {
    return <NotFoundMessage />;
  }

  if (state === APIRequestStatus.Idle || state === APIRequestStatus.Loading) {
    return <div>Loading</div>;
  }

  if (state === APIRequestStatus.Error) {
    return <ErrorMessage message={error} />;
  }

  return <div>{JSON.stringify(user)}</div>;
};
