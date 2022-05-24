import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Settings = () => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  return (
    <Box paddingBottom="40px" minH="calc(100vh - 88px)" marginLeft="calc(100vw - 100%)">
      <Box boxSizing="border-box" background={mainBg} position="relative"></Box>
      Settings
    </Box>
  );
};

export default Settings;
