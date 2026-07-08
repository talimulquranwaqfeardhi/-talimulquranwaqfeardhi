import React from 'react';

export const Button = ({ children, asChild, className = '', ...props }) => {
  const Tag = asChild ? 'span' : 'button';
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
