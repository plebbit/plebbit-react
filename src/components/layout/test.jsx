import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import NavBar from './Nav';
import { PlebLogo } from '../svgs';
import useStore from '../../store/useStore';

const Layout = ({ children, name }) => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const layoutBg = useColorModeValue('lightBg', 'darkBg');

  const { showSplashcreen, device } = useStore(state => state);

  if (showSplashcreen) {
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box
          width="200px"
          borderRadius="full"
          sx={ {
            transform: 'scale(1)',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(0.95)',
                boxShadow: '0 0 0 0 rgba(181,183,183, 0.4)',
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
          } }
          height="200xp"
        >
          <PlebLogo />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box bg={ bg } minH="calc(100vh - 48px)">
        <Box tabIndex="-1" />
        <Box outline="none" />
        <NavBar location={ name } />
        { device !== 'mobile' ? (
          <Box transition="margin-top .3s ease" paddingTop="48px">
            <Box>
              <Flex flexDir="column" minH="calc(100vh - 48px)">
                <Box
                  minH="100%"
                  overflow="hidden"
                  position="relative"
                  flex="none"
                  _before={ {
                    content: `""`,
                    position: 'fixed',
                    width: '100%',
                    top: '0',
                    left: '0',
                    willChange: 'transform',
                    height: '100%',
                    background: layoutBg,
                  } }
                />
                <Box zIndex="3">{ children }</Box>
              </Flex>
            </Box>
          </Box>
        ) : (
          <Box>
            <Flex minH="100vh" flexDir="column" justifyContent="space-between" paddingTop="48px">
              <Box>{ children }</Box>
            </Flex>
          </Box>
        ) }
      </Box>
    </>
  );
};

export default Layout;
