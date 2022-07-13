import React from 'react';

import CreatableSelect from 'react-select/creatable';

const options = [{ value: 'crypto', label: 'Crypto' }];

const CreatableMulti = ({ disabled, placeholder }) => {
  const handleChange = (newValue, actionMeta) => {
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
  };

  return (
    <CreatableSelect
      placeholder={placeholder}
      isDisabled={disabled}
      isMulti
      onChange={handleChange}
      options={options}
    />
  );
};

export default CreatableMulti;
