import * as React from 'react';
import { Outlet } from 'react-router-dom';
//
import { Button } from '@/components';
import { UsersDataProvider } from '@/providers';
import styles from './App.module.scss';

export const App = () => (
  <div className={styles.app}>
    <aside className={styles.aside}>
      <h4 className={styles.aside_heading}>Сортировка</h4>
      <Button className={styles.button}>По городу</Button>
      <Button className={styles.button}>По компании</Button>
    </aside>
    <div className={styles.content}>
      <UsersDataProvider>
        <Outlet />
      </UsersDataProvider>
    </div>
  </div>
);
