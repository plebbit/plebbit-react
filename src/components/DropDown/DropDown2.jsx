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
  isSearchable,
  suffix,
  topMenu,
  bottomMenu,
  selectStyles,
  selectedBg,
  unselectedBg,
  render,
}) => {
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const mainBg = useColorModeValue('#fff', '#1A1A1B');

  const Option = ({ children, ...props }) => {
    return render ? (
      <components.Option {...props}>{render(props?.data)}</components.Option>
    ) : (
      <components.Option {...props}>{children}</components.Option>
    );
  };

  const Control = ({ children, ...props }) => {
    const style = { cursor: 'pointer' };

    return (
      <components.Control {...props}>
        {(prefix && prefix(props?.selectProps?.value)) || (
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
          container: (styles) => ({
            ...styles,
            width: '100%',
            backgroundColor: mainBg,
            ...selectStyles,
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            ':hover': {
              ...styles,
              border: `1px solid ${navBorder}`,
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
          }),
          option: (styles, { isDisabled, isSelected }) => {
            return {
              ...styles,

              ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? (isSelected ? selectedBg : unselectedBg) : undefined,
              },
              ':hover': {
                ...styles,
                color: '#222222',
              },
            };
          },
          input: (styles) => ({ ...styles }),
          menu: (styles) => ({ ...styles, border: `1px solid ${navBorder}` }),
          menuList: (styles) => ({ ...styles, backgroundColor: mainBg }),
          placeholder: (styles) => ({
            ...styles,
            fontWeight: '500',
            color: mainColor,
            ...placeholderStyles,
          }),
          singleValue: (styles) => ({
            ...styles,
            fontWeight: '500',
            color: mainColor,
          }),
          indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: mainColor,
            fontWeight: '400',
          }),
        }}
        placeholder={placeholder || 'Choose a community'}
        options={options}
        components={{
          Control,
          MenuList,
          Option: Option,
        }}
        isSearchable={isSearchable || true}
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
