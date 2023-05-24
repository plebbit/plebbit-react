import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../../store/profileContext';
import { Box, Flex } from '@chakra-ui/layout';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import NavBar from './Nav';
import { PlebLogo } from '../svgs';
import { BiAddToQueue } from 'react-icons/bi';
import { MdAdd, MdClose, Md, MdOutlineMail, MdHome } from 'react-icons/md';
import Avatar from '../Avatar';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { HiOutlineChartSquareBar, HiOutlineChat } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, name, stateString }) => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const { showSplashcreen, device, showSide, setShowSide, notifications } = useContext(ProfileContext);
  const location = useLocation();
  const showStyleBar = location?.search === '?styling=true';

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

  const label = () => {
    const count = notifications?.notifications?.filter((x) => !x?.markedAsRead).length ? `(${notifications?.notifications?.filter((x) => !x?.markedAsRead).length})` : ''
    if (name?.label) {
      return `${count} plebbit`
    } else {
      return `${count} ${name?.label}`
    }
  }

  document.title = label()
  useEffect(() => {
    document.title = label()

  }, [name?.label])


  return (
    <>
      <Box bg={ bg } minH="calc(100vh - 48px)" >
        <Box tabIndex="-1" />
        <Box outline="none" />

        <NavBar showStyleBar={ showStyleBar } location={ name } />
        { device !== 'mobile' ? (
          <Box

            paddingTop="48px"
            paddingLeft={ showSide && name.label === 'Home' && '270px' }
          >
            { showSide && name.label === 'Home' && (
              <Flex
                flexDir="column"
                width="270px"
                top="48px"
                left="0"
                position="fixed"
                overflowX="hidden"
                overflowY="scroll"
                bottom="0"
                bg={ bg }
                zIndex="4"
              >
                <Flex
                  justifyContent="flex-end"
                  alignItems="center"
                  padding="20px"
                  overflowY="scroll"
                >
                  <Box cursor="pointer" px="10px" pas onClick={ () => setShowSide(false) }>
                    <MdClose />
                  </Box>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    MODERATING
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ BiAddToQueue } boxSize={ 5 } />

                    <Box ml="8px">Mod Queue</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ MdOutlineMail } boxSize={ 5 } />

                    <Box ml="8px">Modmail</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ BiAddToQueue } boxSize={ 5 } />

                    <Box ml="8px">p/Mod</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    YOUR COMMUNITIES
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ MdAdd } boxSize={ 5 } />

                    <Box ml="8px">Create Community</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={ 20 } height={ 20 } badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    FEEDS
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ MdHome } boxSize={ 5 } />
                    <Box ml="8px">Home</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ BsArrowUpRightCircle } boxSize={ 5 } />

                    <Box ml="8px">Popular</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ HiOutlineChartSquareBar } boxSize={ 5 } />

                    <Box ml="8px">All</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    OTHER
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ AiFillSetting } boxSize={ 5 } />
                    <Box ml="8px">User Settings</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ HiOutlineChat } boxSize={ 5 } />

                    <Box ml="8px">Messages</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={ {
                      bg: '#DEEBFF',
                    } }
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={ MdAdd } boxSize={ 5 } />

                    <Box ml="8px">Create Post</Box>
                  </Flex>
                </Flex>
              </Flex>
            ) }
            {/* content */ }
            <Box position="relative" marginLeft={ showStyleBar && '284px' }>
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


        { device === 'mobile' && stateString && stateString !== 'Succeeded' && <Box width="100%" zIndex="2001" fontWeight="500" pos="fixed" top="48px" p='5px 20px' fontSize="12px" color="white" bg="#212a3b" >
          { stateString }
        </Box>
        }
      </Box>
    </>
  );
};

export default Layout;
