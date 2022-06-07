import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Select, { components } from 'react-select';

const DropDown2 = ({
  prefix,
  placeholder,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  value,
  defaultValue,
  sx,
  isClearable,
  placeholderStyles,
  suffix,
  topMenu,
  bottomMenu,
}) => {
  const mainColor = useColorModeValue('lightText2', 'darkText1');

  const Control = ({ children, ...props }) => {
    const style = { cursor: 'pointer' };

    return (
      <components.Control {...props}>
        {prefix(props?.selectProps?.value) || (
          <Box
            style={style}
            borderRadius="22px"
            border="1px dashed #a4a4a4"
            height="22px"
            margin="0"
            width="22px"
            fontSize="22px"
            lineHeight="22px"
            ml="8px"
          />
        )}
        {children}
        {suffix}
      </components.Control>
    );
  };

  const MenuList = ({ children, ...props }) => {
    return (
      <components.MenuList {...props}>
        {topMenu}
        {children}
        {bottomMenu}
      </components.MenuList>
    );
  };

  return (
    <Flex width="100%" alignItems="center" borderRadius="4px" sx={sx}>
      <Select
        styles={{
          container: (styles) => ({ ...styles, width: '100%' }),
          control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            border: 'none',
            ':hover': {
              ...styles,
              border: 'none',
              boxShadow: 'none',
              borderColor: 'none',
            },
          }),
          option: (styles) => {
            return {
              ...styles,

              ':active': {
                ...styles[':active'],
              },
            };
          },
          input: (styles) => ({ ...styles }),
          placeholder: (styles) => ({
            ...styles,
            fontWeight: '500',
            color: mainColor,
            ...placeholderStyles,
          }),
          singleValue: (styles) => ({ ...styles, fontWeight: '500', color: mainColor }),
          indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: mainColor,
            fontWeight: '400',
          }),
        }}
        placeholder={placeholder || 'Choose a community'}
        options={options}
        components={{ Control, MenuList }}
        isSearchable
        onChange={onChange}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        value={value}
        defaultValue={defaultValue}
        isClearable={isClearable}
      />
    </Flex>
  );
};

export default DropDown2;
