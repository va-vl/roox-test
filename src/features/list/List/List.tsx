import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
//
import { useDataContextState } from '@/providers';
import { ErrorMessage } from '@/components';
import { UserCard, UserCardSkeleton } from '../Card';
import { SortState, UserData } from '@/types';
import styles from './List.module.scss';

const UsersListLayout: React.FunctionComponent = ({ children }) => (
  <div className={styles.content}>
    <h2 className={styles.heading}>Список пользователей</h2>
    {children}
  </div>
);

const UsersList: React.FunctionComponent<{ data: UserData[] }> = ({ data }) => (
  <>
    <ul>
      {data.map(({ id, name, city, company }) => (
        <li key={id} className={styles.item}>
          <UserCard id={id} name={name} city={city} company={company} />
        </li>
      ))}
    </ul>
    <p className={styles.totals}>Найдено {data.length} пользователей</p>
  </>
);

export const UsersListContainer = () => {
  const { data, error, state } = useDataContextState();
  const [sortedData, setSortedData] = React.useState<typeof data>([]);
  const sort: SortState = useOutletContext();

  let content: React.ReactNode;

  React.useEffect(() => {
    const sorted = [...data].sort((a, b) => a[sort].localeCompare(b[sort]));
    setSortedData(sorted);
  }, [sort, data]);

  if (state === 'loading' || state === 'idle') {
    content = (
      <>
        <UserCardSkeleton className={styles.item} />
        <UserCardSkeleton className={styles.item} />
        <UserCardSkeleton className={styles.item} />
        <UserCardSkeleton className={styles.item} />
      </>
    );
  } else if (state === 'error') {
    content = <ErrorMessage message={error} />;
  } else {
    content = <UsersList data={sortedData} />;
  }

  return <UsersListLayout>{content}</UsersListLayout>;
};
