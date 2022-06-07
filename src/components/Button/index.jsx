import React from 'react';
import { Button as Btn } from '@chakra-ui/button';

const Button = ({ children, ...props }) => {
  const {
    onClick,
    content,
    loading,
    padding,
    lineHeight,
    fontSize,
    display,
    bg,
    border,
    color,
    disabled,
    width,
    height,
    margin,
    position,
    fontWeight,
    minH,
    minW,
    borderRadius,
    sx,
    _hover,
    fill,
    backgroundColor,
    cursor,
  } = props;
  return (
    <Btn
      onClick={onClick}
      loading={loading}
      _hover={
        _hover || {
          opacity: '0.8',
        }
      }
      backgroundColor={backgroundColor}
      display={display}
      borderColor={border === 'none' ? '' : border}
      borderRadius={borderRadius || '9999px'}
      bg={bg}
      border={border === 'none' ? 'none' : '1px solid'}
      h={height}
      minH={minH}
      minW={minW || '32px'}
      width={width || 'auto'}
      cursor={cursor || 'pointer'}
      fontFamily="Noto Sans, Arial, sans-serif"
      fontWeight={fontWeight || '700'}
      lineHeight={lineHeight || '17px'}
      padding={padding || '4px 16px'}
      fontSize={fontSize || '14px'}
      color={color}
      disabled={disabled}
      margin={margin}
      position={position}
      sx={sx}
      fill={fill}
      {...props}
    >
      {content || children}
    </Btn>
  );
};

export default Button;
