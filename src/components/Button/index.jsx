import React from 'react';
import { Button as Btn } from '@chakra-ui/button';

const Button = ({ content, loading, bg, border, color, disabled, width, height }) => {
  return (
    <Btn
      loading={loading}
      _hover={{
        opacity: '0.8',
      }}
      borderColor={border === 'none' ? '' : border}
      borderRadius="9999px"
      bg={bg}
      border={border === 'none' ? 'none' : '1px solid'}
      h={height || '34px'}
      minW="32px"
      width={width || 'auto'}
      cursor="pointer"
      fontFamily="Noto Sans, Arial, sans-serif"
      fontWeight="700"
      lineHeight="17px"
      padding="4px 16px"
      fontSize="14px"
      color={color}
      disabled={disabled}
    >
      {content}
    </Btn>
  );
};

export default Button;
