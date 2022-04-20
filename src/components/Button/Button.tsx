import * as React from 'react';
import clsx from 'clsx';
//
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FunctionComponent<ButtonProps> = ({
  type = 'button',
  className = '',
  children,
  ...props
}) => (
  <button type={type} className={clsx(styles.button, className)} {...props}>
    {children}
  </button>
);
