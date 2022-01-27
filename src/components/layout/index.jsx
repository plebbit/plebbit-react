import React from 'react';
import { Stack, Flex } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const bg = useColorModeValue('lightLayoutBg', 'darkLayoutBg');

  return (
    <Stack as="main" align="center" width="100%" minH="calc(100vh)" bg={bg}>
      <NavBar />
      <Flex
        flexDirection="row"
        justifyContent="center"
        margin="0 auto !important"
        maxWidth="100%"
        sx={{
          '@media (min-width: 640px)': {
            padding: '20px 24px',
          },
        }}
      >
        {children}
      </Flex>
    </Stack>
  );
}
