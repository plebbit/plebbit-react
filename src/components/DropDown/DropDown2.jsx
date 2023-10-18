import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Select, { components } from 'react-select';
import Avatar from '../Avatar';
import getIsOnline from '../../utils/getIsOnline';
import styles from './dropdown.module.css';

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
          <div style={style} className={styles.control}>
            <Avatar
              width={20}
              height={20}
              style={{
                marginRight: '8px',
              }}
              avatar={props?.selectProps?.value?.suggested?.avatarUrl}
              badge
              isOnline={getIsOnline(props?.selectProps?.value?.updatedAt)}
            />
          </div>
        )}
        {children}
        {suffix && suffix(props?.selectProps)}
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
    <div width="100%" alignItems="center" borderRadius="4px" style={sx}>
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
    </div>
  );
};

export default DropDown2;
