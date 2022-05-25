import React from 'react';
import { Box, Flex, useColorModeValue, useColorMode } from '@chakra-ui/react';

const NavBar = () => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Flex
        flex="0"
        left="0"
        position="fixed"
        right="0"
        top="0"
        zIndex="80"
        marginTop="0"
        color={mainColor}
        bg={mainBg}
        height="48px"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          bg={mainBg}
          borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343536'}`}
          boxSizing="border-box"
          flexGrow={1}
          padding="0 20px"
        >
          ggg
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
