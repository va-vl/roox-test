import * as React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
//
import { SkeletonShape } from '@/components/SkeletonShape/SkeletonShape';
import styles from './Card.module.scss';

type CardSkeletonProps = {
  className?: string;
};

export const CardSkeleton: React.FunctionComponent<CardSkeletonProps> = ({
  className,
}) => (
  <div className={clsx(styles.card, className)}>
    <SkeletonShape className={styles.paragraph} width="30%" />
    <SkeletonShape className={styles.paragraph} width="80%" />
    <SkeletonShape className={styles.paragraph} />
  </div>
);

type CardProps = {
  id: string;
  name: string;
  city: string;
  company: string;
};

export const Card: React.FunctionComponent<CardProps> = React.memo(
  ({ id, name, city, company }) => (
    <article className={styles.card}>
      <p className={styles.paragraph}>
        <span className={styles.category}>ФИО:</span>
        <span>{name}</span>
      </p>
      <p className={styles.paragraph}>
        <span className={styles.category}>город:</span>
        <span>{city}</span>
      </p>
      <p className={styles.paragraph}>
        <span className={styles.category}>компания:</span>
        <span>{company}</span>
        <Link to={`/users/${id}`} className={styles.link}>
          Подробнее
        </Link>
      </p>
    </article>
  ),
);

Card.displayName = 'UserCard';
