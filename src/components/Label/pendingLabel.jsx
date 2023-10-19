import React from 'react';
import Label from '.';

const PendingLabel = (props) => {
  const { className } = props;

  return (
    <Label
      text="pending "
      style={{
        color: '#ffd635',
        border: '1px solid currentColor',
      }}
      className={className}
      {...props}
    />
  );
};

export default PendingLabel;
