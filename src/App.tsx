import * as React from 'react';
import { Outlet } from 'react-router-dom';
//
import { DataProvider } from '@/providers';
import { SortPanel } from '@/features/sort';
import { SortState } from '@/types';
import styles from './App.module.scss';

export const App = () => {
  const [sort, setSort] = React.useState<SortState>('city');

  return (
    <div className={styles.app}>
      <aside className={styles.aside}>
        <SortPanel sortFunc={setSort} />
      </aside>
      <div className={styles.content}>
        <DataProvider>
          <Outlet context={sort} />
        </DataProvider>
      </div>
    </div>
  );
};
