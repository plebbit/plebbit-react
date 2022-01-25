import React from 'react';
import { Stack, Container } from '@chakra-ui/layout';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <Stack as="main" align="center" width="100%" minH="calc(100vh)">
      <NavBar />
      <Container>{children}</Container>
    </Stack>
  );
}
