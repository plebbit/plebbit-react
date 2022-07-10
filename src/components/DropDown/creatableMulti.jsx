import React from 'react';

import CreatableSelect from 'react-select/creatable';

const options = [{ value: 'crypto', label: 'Crypto' }];

const CreatableMulti = () => {
  const handleChange = (newValue, actionMeta) => {
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
  };

  return <CreatableSelect isMulti onChange={handleChange} options={options} />;
};

export default CreatableMulti;
