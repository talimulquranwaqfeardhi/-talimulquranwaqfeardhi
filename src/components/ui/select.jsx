import React from 'react';

export const Select = ({ children, ...props }) => (
  <select {...props}>{children}</select>
);

export const SelectContent = ({ children }) => <div>{children}</div>;
export const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
export const SelectTrigger = ({ children }) => <div>{children}</div>;
export const SelectValue = ({ children }) => <div>{children}</div>;

export default Select;
