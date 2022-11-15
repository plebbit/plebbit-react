import React, { useState } from 'react';
import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const DropDown = ({
  inputBg,
  caret,
  dropDownTitle,
  content,
  options,
  wrapSx,
  stopAutoHide,
  topOffset,
  rightOffset,
  leftOffset,
  render,
  width,
  onChange,
}) => {
  const shadow = useColorModeValue('rgba(28,28,28,0.2)', 'rgba(215,218,220,0.2)');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const [show, hide] = useState(false);
  return (
    <Flex ml="auto" sx={wrapSx} alignItems="center" flexFlow="row nowrap" position="relative">
      <Flex
        alignItems="center"
        borderRadius="20px"
        cursor="pointer"
        display="flex"
        height="32px"
        padding="0 8px"
        _hover={{
          bg: inputBg,
        }}
        onClick={() => hide(!show)}
      >
        <Box>{dropDownTitle}</Box>
        {caret ? (
          <Flex color={iconColor} alignItems="center">
            <Icon as={MdOutlineKeyboardArrowDown} />
          </Flex>
        ) : (
          ''
        )}
      </Flex>
      {show ? (
        <Box
          onMouseLeave={() => (stopAutoHide ? {} : hide(false))}
          ml="-9px"
          minW="99px"
          border={`1px solid ${border2}`}
          borderRadius="4px"
          boxShadow={`0 2px 4px 0 ${shadow}`}
          bg={mainBg}
          position="absolute"
          zIndex="10"
          color={iconColor}
          fill={iconColor}
          sx={{
            top: topOffset || '24px',
            left: leftOffset || '10px',
            right: rightOffset,
          }}
          width={width}
        >
          {options
            ? options?.map((option) =>
                render && option.disabled !== true ? (
                  render(option)
                ) : option.disabled !== true ? (
                  <Flex
                    key={option?.id}
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                      color: 'blue',
                    }}
                    onClick={() => onChange(option)}
                    borderTop={`1px solid ${border2}`}
                  >
                    <Icon mr="4px" as={option?.icon} width={6} height={6} />
                    <Box>{option?.label}</Box>
                  </Flex>
                ) : (
                  ''
                )
              )
            : content}
        </Box>
      ) : (
        ''
      )}
    </Flex>
  );
};

export default DropDown;
