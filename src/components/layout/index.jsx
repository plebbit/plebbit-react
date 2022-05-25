import React, { useContext } from 'react';
import { ProfileContext } from '../../store/profileContext';
import { Box, Flex } from '@chakra-ui/layout';
import { useColorModeValue, Image } from '@chakra-ui/react';
import plebbitDarkLogo from '../../assets/svgs/plebbitDarkLogo.svg';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const { showSplashcreen } = useContext(ProfileContext);
  const bg = useColorModeValue('lightBg', 'darkLayoutBg');

  if (showSplashcreen) {
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Image
          width="200px"
          rounded="full"
          sx={{
            transform: 'scale(1)',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(0.95)',
                boxShadow: '0 0 0 0 rgba(204,169,44, 0.4)',
              },
              '50%': {
                transform: 'scale(1.2)',
                boxShadow: '0 0 0 30px rgba(204,169,44, 0)',
              },
              '100%': {
                transform: 'scale(0.95)',
                boxShadow: '0 0 0 0 rgba(204,169,44, 0)',
              },
            },
          }}
          height="200xp"
          src={plebbitDarkLogo}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box minH="calc(100vh - 48px)" bg={bg}>
        <Box tabIndex={-1} />
        <Box outline="none">
          <NavBar />
          <Box transition="margin-top .3s ease">
            <Flex flexDirection="column" minH="calc(100vh - 48px)">
              {children}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
