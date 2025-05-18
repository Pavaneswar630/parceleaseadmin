import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-xl px-4 py-2 text-sm font-medium transition-all';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
