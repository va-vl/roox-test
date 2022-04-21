import * as React from 'react';
import { Link } from 'react-router-dom';
//
import type { SortState } from '@/types';
import styles from './Panel.module.scss';

type SortPanelProps = {
  sortFunc: (state: SortState) => void;
};

export const SortPanel: React.FunctionComponent<SortPanelProps> = React.memo(
  ({ sortFunc }) => {
    const sortByCity = () => {
      sortFunc('city');
    };

    const sortByCompany = () => {
      sortFunc('company');
    };

    return (
      <nav className={styles.nav}>
        <h3 className={styles.heading}>Сортировка</h3>
        <Link to="/" onClick={sortByCity} className={styles.button}>
          По городу
        </Link>
        <Link to="/" onClick={sortByCompany} className={styles.button}>
          По компании
        </Link>
      </nav>
    );
  },
);

SortPanel.displayName = 'SortPanel';
