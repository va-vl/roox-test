import * as React from 'react';
import styles from './App.module.scss';
//
import { UserForm } from '@/features/form';
import { UsersList } from './features/list';
import { UsersDataProvider } from '@/providers';

export const App = () => (
  <div className={styles.app}>
    <aside className={styles.aside}>
      <h5>Aside content</h5>
      <p>content</p>
      <p>content</p>
    </aside>
    <div className={styles.content}>
      <UsersDataProvider>
        <UserForm />
        <UsersList />
      </UsersDataProvider>
    </div>
  </div>
);
