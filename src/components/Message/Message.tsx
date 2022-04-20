import * as React from 'react';
import { Link } from 'react-router-dom';
//
import styles from './Message.module.scss';
import warning from '@/assets/images/warning.svg';
import notFound from '@/assets/images/not-found.svg';

const MessageLayout: React.FunctionComponent<{ title: string }> = ({
  title,
  children,
}) => (
  <div className={styles.message}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

export const ErrorMessage: React.FunctionComponent<{
  message: string | null;
}> = ({ message }) => (
  <MessageLayout title="Something went wrong">
    <img className={styles.image} width={300} alt="Error" src={warning} />
    {message && <p className={styles.text}>{message}</p>}
  </MessageLayout>
);

export const NotFoundMessage: React.FunctionComponent = () => (
  <MessageLayout title="Page not found">
    <img className={styles.image} width={300} alt="Not Found" src={notFound} />
    <p className={styles.text}>This resource does not exist</p>
    <Link to="/" className={styles.link}>
      To main
    </Link>
  </MessageLayout>
);
