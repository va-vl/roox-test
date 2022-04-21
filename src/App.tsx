import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import { DataProvider } from '@/providers';
import { SortPanel } from '@/features/sort';
import { SortState } from '@/types';
import { UsersList } from '@/features/users';
import { UserProfile } from '@/features/user';
import { NotFoundMessage } from '@/components';
import styles from './App.module.scss';

export const App = () => {
  const [sort, setSort] = React.useState<SortState>('city');
  const [isDirect, setIsDirect] = React.useState(true);

  const handleSort = (sortState: SortState) => {
    if (sortState !== sort) {
      setSort(sort);
      setIsDirect(true);
    } else {
      setIsDirect(!isDirect);
    }
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <aside className={styles.aside}>
          <SortPanel sortFunc={handleSort} />
        </aside>
        <div className={styles.content}>
          <DataProvider>
            <Routes>
              <Route
                index
                element={<UsersList sort={sort} isDirect={isDirect} />}
              />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="*" element={<NotFoundMessage />} />
            </Routes>
          </DataProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};
