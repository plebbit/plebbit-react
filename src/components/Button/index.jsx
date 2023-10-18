import React from 'react';
import { Button as Btn } from '@chakra-ui/button';
import styles from './button.module.css';

export const Button2 = ({ children, className, disabled, onClick, ...rest }) => {
  return (
    <button
      disabled={disabled}
      role="button"
      className={[styles.button, className].join(' ')}
      onClick={(e) => !disabled && typeof onClick === 'function' && onClick(e)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button2;
