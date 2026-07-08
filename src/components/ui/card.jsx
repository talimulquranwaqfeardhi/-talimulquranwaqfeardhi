import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={className}>{children}</h3>
);

export default Card;
