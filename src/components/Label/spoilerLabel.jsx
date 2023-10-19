import React from 'react';
import Label from '.';

const SpoilerLabel = (props) => {
  const { className } = props;
  return (
    <Label
      style={{
        color: 'rgb(164, 167, 168)',
        border: '1px solid currentColor',
      }}
      text="spoiler"
      className={className}
      {...props}
    />
  );
};

export default SpoilerLabel;
