import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

const NavItem = ({ head, otherAction, body }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setShow(!show);
          otherAction ? otherAction() : '';
        }}
      >
        {head}
      </Box>
      {show ? body : ''}
    </>
  );
};

export default NavItem;
