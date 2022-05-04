import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import Select, { components } from 'react-select';

const DropDown2 = ({
  prefix,
  placeholder,
  options,
  onChange,
  value,
  getOptionLabel,
  getOptionValue,
}) => {
  const Control = ({ children, ...props }) => {
    const style = { cursor: 'pointer' };

    return (
      <components.Control {...props}>
        {prefix || (
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
      </components.Control>
    );
  };

  return (
    <Flex width="100%" alignItems="center">
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
          placeholder: (styles) => ({ ...styles, fontSize: '14px', fontWeight: '400' }),
          singleValue: (styles) => ({ ...styles }),
        }}
        placeholder={placeholder || 'Choose a community'}
        options={options}
        components={{ Control }}
        isSearchable
        onChange={onChange}
        value={value}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </Flex>
  );
};

export default DropDown2;
