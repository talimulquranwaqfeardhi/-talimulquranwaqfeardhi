import React from 'react';

export const Table = ({ children }) => <table>{children}</table>;
export const TableHeader = ({ children }) => <thead>{children}</thead>;
export const TableBody = ({ children }) => <tbody>{children}</tbody>;
export const TableRow = ({ children }) => <tr>{children}</tr>;
export const TableCell = ({ children }) => <td>{children}</td>;
export const TableHead = ({ children }) => <th>{children}</th>;

export default Table;
