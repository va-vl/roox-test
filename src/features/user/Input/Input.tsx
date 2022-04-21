import * as React from 'react';
//
import type { UserInput, InputTypes } from '@/types';
import styles from './Input.module.scss';

type InputProps<ComponentType extends HTMLInputElement | HTMLTextAreaElement> =
  React.InputHTMLAttributes<ComponentType> & {
    id: keyof UserInput;
    label: string;
    type?: InputTypes;
  };

export const FormInput: React.FunctionComponent<
  InputProps<HTMLInputElement>
> = ({ id, label, ...props }) => (
  <label htmlFor={id} className={styles.field}>
    <span className={styles.label}>{label}</span>
    <input className={styles.input} id={id} name={id} {...props} />
  </label>
);

export const FormTextarea: React.FunctionComponent<
  InputProps<HTMLTextAreaElement>
> = ({ id, label, ...props }) => (
  <label htmlFor={id} className={styles.field}>
    <span className={styles.label}>{label}</span>
    <textarea className={styles.textarea} id={id} name={id} {...props} />
  </label>
);
