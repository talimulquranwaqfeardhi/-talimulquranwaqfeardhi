import { createElement, Fragment } from 'react';

export const HelmetProvider = ({ children }) => {
  return createElement(Fragment, null, children);
};

export const Helmet = () => null;

export default Helmet;
