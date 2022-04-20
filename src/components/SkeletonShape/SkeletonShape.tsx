import * as React from 'react';
import clsx from 'clsx';
//
import styles from './SkeletonShape.module.scss';

type SkeletonShapeProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  marginBottom?: string;
  className?: string;
};

export const SkeletonShape: React.FunctionComponent<SkeletonShapeProps> = ({
  className = '',
  height = '11px',
  ...props
}) => (
  <div
    className={clsx(styles.skeleton, className)}
    style={{ height, ...props }}
  />
);
