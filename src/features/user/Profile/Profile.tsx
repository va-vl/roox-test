import * as React from 'react';
import clsx from 'clsx';
//
import { Button, SkeletonShape } from '@/components';
import styles from './Profile.module.scss';

type ProfileLayoutProps = {
  handleDisabled?: () => void;
};

export const ProfileLayout: React.FunctionComponent<ProfileLayoutProps> = ({
  children,
  handleDisabled,
}) => (
  <div className={styles.content}>
    <header className={styles.header}>
      <h2 className={styles.heading}>Профиль пользователя</h2>
      {!!handleDisabled && (
        <Button onClick={handleDisabled} className={styles.button}>
          Редактировать
        </Button>
      )}
    </header>
    {children}
  </div>
);

type FormLayoutProps = {
  disabled: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  disabled,
  onSubmit,
  children,
}) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <fieldset className={styles.fieldset}>{children}</fieldset>
    <Button
      type="submit"
      className={clsx(styles.button, styles.button_send)}
      disabled={disabled}
    >
      Отправить
    </Button>
  </form>
);

export const FormSkeleton = () => (
  <div className={styles.form}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className={styles.field}>
        <SkeletonShape width="10%" height="10px" marginBottom="3px" />
        <SkeletonShape height="12px" />
      </div>
    ))}
  </div>
);
