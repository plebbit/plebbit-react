import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NavBar from './Nav';

const Layout = () => {
  const bg = useColorModeValue('lightBody', 'darkBody');

  return (
    <Box bg={bg} minH="calc(100vh - 48px)">
      <Box tabIndex="-1" />
      <Box outline="none" />
      <NavBar />
      Layout
    </Box>
  );
};

export default Layout;
