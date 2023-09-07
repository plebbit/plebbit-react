import React, { useEffect, useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Icon, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import NavBar from './Nav/nav2';
import { PlebLogo } from '../svgs';
import { BiAddToQueue } from 'react-icons/bi';
import { MdAdd, MdClose, MdOutlineMail, MdHome } from 'react-icons/md';
import Avatar from '../Avatar';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { HiOutlineChartSquareBar, HiOutlineChat } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useAccount, useNotifications } from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import styles from './layout.module.css';
import { SideMenu } from './Nav/DropDown/homeDropdown';
import CreateSubPlebbit from './Nav/modal/CreateSubPlebbit';

const Layout = ({ children, name, stateString, background }) => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });

  const { showSplashcreen, device, showSide, setShowSide } = useStore((state) => state);
  const location = useLocation();
  const showStyleBar = location?.search === '?styling=true';

  if (showSplashcreen) {
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box
          width="200px"
          borderRadius="full"
          sx={{
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
          }}
          height="200xp"
        >
          <PlebLogo />
        </Box>
      </Box>
    );
  }

  const unreadNotificationsCount =
    notifications?.notifications?.filter((x) => !x?.markedAsRead).length || 0;

  document.title = `${unreadNotificationsCount ? `(${unreadNotificationsCount}) ` : ''}${
    name?.label || 'plebbit'
  }`;

  return (
    <>
      <Box bg={bg} minH="calc(100vh - 48px)">
        <Box tabIndex="-1" />
        <Box outline="none" />

        <NavBar showStyleBar={showStyleBar} location={name} />
        {device !== 'mobile' ? (
          <Box paddingTop="48px" paddingLeft={showSide && name.label === 'Home' && '270px'}>
            {showSide && name.label === 'Home' && (
              <Flex
                flexDir="column"
                width="270px"
                top="48px"
                left="0"
                position="fixed"
                overflowX="hidden"
                overflowY="scroll"
                bottom="0"
                bg={bg}
                zIndex="4"
              >
                <Flex
                  justifyContent="flex-end"
                  alignItems="center"
                  padding="20px"
                  overflowY="scroll"
                >
                  <Box cursor="pointer" px="10px" onClick={() => setShowSide(false)}>
                    <MdClose />
                  </Box>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    MODERATING
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={BiAddToQueue} boxSize={5} />

                    <Box ml="8px">Mod Queue</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={MdOutlineMail} boxSize={5} />

                    <Box ml="8px">Modmail</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={BiAddToQueue} boxSize={5} />

                    <Box ml="8px">p/Mod</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    YOUR COMMUNITIES
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={MdAdd} boxSize={5} />

                    <Box ml="8px">Create Community</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Avatar width={20} height={20} badge />
                    <Box ml="8px">Test 2</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    FEEDS
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={MdHome} boxSize={5} />
                    <Box ml="8px">Home</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={BsArrowUpRightCircle} boxSize={5} />

                    <Box ml="8px">Popular</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={HiOutlineChartSquareBar} boxSize={5} />

                    <Box ml="8px">All</Box>
                  </Flex>
                </Flex>
                <Flex flexDir="column">
                  <Box padding="8px 24px" fontSize="10px">
                    OTHER
                  </Box>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={AiFillSetting} boxSize={5} />
                    <Box ml="8px">User Settings</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={HiOutlineChat} boxSize={5} />

                    <Box ml="8px">Messages</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    _hover={{
                      bg: '#DEEBFF',
                    }}
                    padding="8px 24px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Icon as={MdAdd} boxSize={5} />

                    <Box ml="8px">Create Post</Box>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {/* content */}
            <Box position="relative" marginLeft={showStyleBar && '284px'}>
              <Flex flexDir="column" minH="calc(100vh - 48px)">
                <Box
                  minH="100%"
                  overflow="hidden"
                  position="relative"
                  flex="none"
                  _before={{
                    content: `""`,
                    position: 'fixed',
                    width: '100%',
                    top: '0',
                    left: '0',
                    willChange: 'transform',
                    height: '100%',
                    background: background || layoutBg,
                  }}
                />
                <Box zIndex="3">{children}</Box>
              </Flex>
            </Box>
          </Box>
        ) : (
          <Box>
            <Flex minH="100vh" flexDir="column" justifyContent="space-between" paddingTop="48px">
              <Box>{children}</Box>
            </Flex>
          </Box>
        )}

        {device === 'mobile' && stateString && stateString !== 'Succeeded' && (
          <Box
            width="100%"
            zIndex="2001"
            fontWeight="500"
            pos="fixed"
            top="48px"
            p="5px 20px"
            fontSize="12px"
            color="white"
            bg="#212a3b"
            className="loading-ellipsis"
          >
            {stateString}
          </Box>
        )}
      </Box>
    </>
  );
};

const Layout2 = ({ children, name, stateString, background }) => {
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });
  const { showSplashcreen, device, showSide, setShowSide } = useStore((state) => state);
  const location = useLocation();
  const showStyleBar = location?.search === '?styling=true';
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();

  if (showSplashcreen) {
    return (
      <div className={styles.splash_wrapper}>
        <div className={styles.splash}>
          <PlebLogo />
        </div>
      </div>
    );
  }

  const unreadNotificationsCount =
    notifications?.notifications?.filter((x) => !x?.markedAsRead).length || 0;

  document.title = `${unreadNotificationsCount ? `(${unreadNotificationsCount}) ` : ''}${
    name?.label || 'plebbit'
  }`;

  return (
    <>
      <div className={styles.wrapper}>
        <div tabIndex="-1" />
        <div className={styles.wrapper2}>
          <NavBar showStyleBar={showStyleBar} location={name} />
          {device !== 'mobile' ? (
            <div>
              <div className={styles.wrapper3} showSide={String(showSide)}>
                {showSide && (
                  <div className={styles.sidemenu_wrap}>
                    <div className={styles.sidemenu_top}>
                      <div className={styles.sidemenu_close} onClick={() => setShowSide(false)}>
                        <MdClose color="#878A8C" lassName={styles.sidemenu_close_icon} />
                      </div>
                    </div>
                    <div className={styles.sidemenu_content} role="menu">
                      <SideMenu location={name} onOpenCreate={onOpenCreate} />
                    </div>
                  </div>
                )}
                <div>
                  <div className={styles.wrapper4}>
                    <div className={styles.wrapper_background} />
                    <div className={styles.content_wrapper}>
                      <div className={styles.content}>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.mobile_wrapper3}>{children}</div>
            </div>
          )}

          {device === 'mobile' && stateString && stateString !== 'Succeeded' && (
            <div className={`loading-ellipsis ${styles.stateString}`}>{stateString}</div>
          )}
        </div>
      </div>

      {isOpenCreate ? <CreateSubPlebbit isOpen={isOpenCreate} onClose={onCloseCreate} /> : ''}
    </>
  );
};
export default Layout2;
