import React from 'react';
import Label from '.';

const FlairLabel = (props) => {
  const { flair, text, bg, color, style, className } = props;
  return (
    <Label
      {...props}
      style={{
        borderRadius: '20px',
        padding: '2px 8px',
        overflow: 'hidden',
        verticalAlign: 'top',
        backgroundColor: flair?.backgroundColor || bg,
        color: flair?.textColor || color,
        ...style,
      }}
      className={className}
    >
      {flair?.text || text}
    </Label>
  );
};

export default FlairLabel;
