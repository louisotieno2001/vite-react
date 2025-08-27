import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("bg-white shadow-md rounded-lg p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </h3>
);

const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("text-gray-700", className)} {...props}>
    {children}
  </div>
);

// New CardFooter component
const CardFooter: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("mt-4 border-t pt-4", className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
