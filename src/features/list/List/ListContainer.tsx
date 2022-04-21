import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
//
import { useDataStatusContext, useDataContext } from '@/providers';
import { SortState, APIRequestStatus } from '@/types';
import { ErrorMessage } from '@/components';
import { UsersListSkeleton, UsersList, UsersListLayout } from './List';

export const UsersListContainer = () => {
  const [sortedData, setSortedData] = React.useState<typeof data>([]);
  const { error, state } = useDataStatusContext();
  const data = useDataContext();
  const sort: SortState = useOutletContext();

  let content: React.ReactNode;

  React.useEffect(() => {
    const sorted = [...data].sort((a, b) => a[sort].localeCompare(b[sort]));
    setSortedData(sorted);
  }, [sort, data]);

  if (state === APIRequestStatus.Idle || state === APIRequestStatus.Loading) {
    content = <UsersListSkeleton />;
  } else if (state === APIRequestStatus.Error) {
    content = <ErrorMessage message={error} />;
  } else {
    content = <UsersList data={sortedData} />;
  }

  return <UsersListLayout>{content}</UsersListLayout>;
};
