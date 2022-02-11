import React from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const location = useLocation();
  const bg = useColorModeValue('lightLayoutBg', 'darkLayoutBg');
  const postDetailBg = useColorModeValue('postDetailLightBg', 'postDetailDarkBg');

  return (
    <Stack
      align="center"
      minWidth="675px"
      maxWidth="100%"
      minH="calc(100vh)"
      bg={location?.pathname === '/postId' ? postDetailBg : bg}
    >
      <NavBar />

      {children}
    </Stack>
  );
}
