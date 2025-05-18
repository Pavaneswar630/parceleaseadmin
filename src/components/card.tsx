import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-sm p-4 border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={clsx('p-2', className)}>{children}</div>;
};
