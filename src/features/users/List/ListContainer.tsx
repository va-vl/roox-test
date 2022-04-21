import * as React from 'react';
//
import { useDataStatusContext, useDataContext } from '@/providers';
import { SortState, APIRequestStatus } from '@/types';
import { ErrorMessage } from '@/components';
import { UsersListSkeleton, UsersList, UsersListLayout } from './List';

export const UsersListContainer: React.FunctionComponent<{
  sort: SortState;
}> = ({ sort }) => {
  const { error, state } = useDataStatusContext();
  const data = useDataContext();
  const sortedData = [...data].sort((a, b) => a[sort].localeCompare(b[sort]));

  let content: React.ReactNode;

  if (state === APIRequestStatus.Idle || state === APIRequestStatus.Loading) {
    content = <UsersListSkeleton />;
  } else if (state === APIRequestStatus.Error) {
    content = <ErrorMessage message={error} />;
  } else {
    content = <UsersList data={sortedData} />;
  }

  return <UsersListLayout>{content}</UsersListLayout>;
};
