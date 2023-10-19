import React from 'react';

const Image = (props) => {
  const { noPlaceholder, ...rest } = props;
  return <img {...rest} fallbackSrc={!noPlaceholder ? undefined : undefined} />;
};

export default Image;
