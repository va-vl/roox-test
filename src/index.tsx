import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'normalize.css';
//
import { App } from './App';
import { UsersList } from '@/features/list';
import { UserProfile } from '@/features/profile';
import { NotFoundMessage } from '@/components';
import './sass/style.scss';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<UsersList />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFoundMessage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
