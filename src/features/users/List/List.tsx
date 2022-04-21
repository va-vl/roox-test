import * as React from 'react';
//
import { Card, CardSkeleton } from '../Card';
import type { UserData } from '@/types';
import styles from './List.module.scss';

export const UsersListLayout: React.FunctionComponent = ({ children }) => (
  <div className={styles.content}>
    <h2 className={styles.heading}>Список пользователей</h2>
    {children}
  </div>
);

export const UsersList: React.FunctionComponent<{ data: UserData[] }> = ({
  data,
}) => (
  <>
    <ul>
      {data.map(({ id, name, city, company }) => (
        <li key={id} className={styles.item}>
          <Card id={id} name={name} city={city} company={company} />
        </li>
      ))}
    </ul>
    <p className={styles.totals}>Найдено {data.length} пользователей</p>
  </>
);

export const UsersListSkeleton: React.FunctionComponent = () => (
  <>
    <CardSkeleton className={styles.item} />
    <CardSkeleton className={styles.item} />
    <CardSkeleton className={styles.item} />
    <CardSkeleton className={styles.item} />
  </>
);
