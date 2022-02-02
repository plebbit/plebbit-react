import React from 'react';
import { Button as Btn } from '@chakra-ui/button';

const Button = ({
  onClick,
  content,
  loading,
  padding,
  lineHeight,
  fontSize,
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
  ml,
  mb,
  mr,
  mt,
  sx,
  _hover,
}) => {
  return (
    <Btn
      onClick={onClick}
      loading={loading}
      _hover={
        _hover || {
          opacity: '0.8',
        }
      }
      borderColor={border === 'none' ? '' : border}
      borderRadius={borderRadius || '9999px'}
      bg={bg}
      border={border === 'none' ? 'none' : '1px solid'}
      h={height || '34px'}
      minH={minH}
      minW={minW || '32px'}
      width={width || 'auto'}
      cursor="pointer"
      fontFamily="Noto Sans, Arial, sans-serif"
      fontWeight={fontWeight || '700'}
      lineHeight={lineHeight || '17px'}
      padding={padding || '4px 16px'}
      fontSize={fontSize || '14px'}
      color={color}
      disabled={disabled}
      margin={margin}
      position={position}
      mr={mr}
      mb={mb}
      ml={ml}
      mt={mt}
      sx={sx}
    >
      {content}
    </Btn>
  );
};

export default Button;
