import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  useColorMode,
  Switch,
  Divider,
  Image,
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { GiTwoCoins } from 'react-icons/gi';
import {
  AiOutlineThunderbolt,
  AiOutlineSetting,
  AiOutlineInfoCircle,
  AiOutlineAlignCenter,
  AiOutlineFileText,
} from 'react-icons/ai';
import { CgEnter } from 'react-icons/cg';
import { MdWhereToVote, MdAccessTime } from 'react-icons/md';
import { BiUser, BiHelpCircle } from 'react-icons/bi';
import { RiShieldCheckLine } from 'react-icons/ri';
import { VscCompass } from 'react-icons/vsc';

import { ProfileContext } from '../../store/profileContext';
import useVisible from '../../hooks/useVisible';

const NavDropDownWide = () => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const { setIsLoggedIn, isLoggedIn } = useContext(ProfileContext);
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const { colorMode, toggleColorMode } = useColorMode();
  const [showMenu, setShowMenu] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);

  return (
    <Box
      my="auto"
      tabIndex="0"
      sx={{
        '@media (max-width: 768px)': {
          display: 'none',
        },
      }}
      cursor="pointer"
    >
      {!isLoggedIn ? (
        <Flex
          alignItems="center"
          borderRadius="4px"
          padding="2px 0"
          minH="32px"
          ml="8px"
          textAlign="left"
          width="70px"
          justifyContent="center"
          _hover={{
            border: `1px solid #EDF2F7`,
          }}
          onClick={() => {
            setShowMenu(!showMenu);
            setShowComponent(!showMenu);
          }}
        >
          <Icon
            as={BiUser}
            color={iconColor}
            w="20px"
            h="20px"
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          />
          <Icon
            as={BsChevronDown}
            w="16px"
            h="16px"
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          />
        </Flex>
      ) : (
        <Flex
          alignItems="center"
          onClick={() => {
            setShowMenu(!showMenu);
            setShowComponent(!showMenu);
          }}
          width="150px"
        >
          <Image
            width="24px"
            height="24px"
            src="https://styles.redditmedia.com/t5_4oocjn/styles/profileIcon_snooe4ba26fa-42e3-40e3-9041-c16e6bb3bbe6-headshot.png?width=256&height=256&crop=256:256,smart&s=84d5bed290c0ec6ffcce4cbd5931736282f306bf"
            alt="user avatar"
            mr="4px"
            cursor="pointer"
            transformOrigin="bottom center"
            display="block"
            transform="scale(1.3)"
          />
          <Flex
            flexDirection="column"
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
            alignItems="center"
          >
            <Box fontSize="12px" fontWeight="500" lineHeight="16px">
              Abydin
            </Box>
            <Box fontSize="12px" fontWeight="500" lineHeight="16px" color={iconColor}>
              2.5m pleb
            </Box>
          </Flex>
          <Icon as={BsChevronDown} color={iconColor} w="20px" h="20px" ml="auto" />
        </Flex>
      )}
      {showComponent && showMenu ? (
        <Flex
          ref={ref}
          bg={bg}
          position="fixed"
          right="0"
          top="39.5px"
          borderRadius="0 0 4px 4px"
          border="1px solid #EDEFF1"
          borderTop="none"
          marginTop="-2px"
          maxHeight="80%"
          overflowY="auto"
          overflowX="hidden"
          paddingTop="6px"
          width="211px"
          zIndex="80"
          flexDir="column"
        >
          <Box
            fontSize="10px"
            fontWeight="700"
            letterSpacing=".5px"
            lineHeight="12px"
            textTransform="uppercase"
            color={iconColor}
            margin="8px 0 4px 12px"
          >
            View Options
          </Box>
          <Flex width="100%" alignItems="center" direction="row" padding="10px 16px">
            {colorMode === 'light' ? <SunIcon mr="8px" /> : <MoonIcon mr="8px" />}
            <Box>Dark Mode</Box>
            <Switch
              size="md"
              onChange={toggleColorMode}
              isChecked={colorMode === 'dark'}
              ml="auto"
            />
          </Flex>
          <Box
            fontSize="10px"
            fontWeight="700"
            letterSpacing=".5px"
            lineHeight="12px"
            textTransform="uppercase"
            color={iconColor}
            margin="8px 0 4px 12px"
          >
            More Stuff
          </Box>
          <Flex alignItems="center" padding="10px 16px">
            <Icon as={GiTwoCoins} w="20px" h="20px" mr="8px" />
            <Flex flexDir="column">
              <Box>Coins</Box>
              <Box fontSize="12px" fontWeight="400" lineHeight="16px" color={iconColor}>
                {' '}
                0 Coins
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" padding="10px 16px">
            <Icon as={AiOutlineThunderbolt} w="20px" h="20px" mr="8px" />
            <Box>Powerups</Box>
          </Flex>
          <Flex alignItems="center" padding="10px 16px">
            <Icon as={MdWhereToVote} w="20px" h="20px" mr="8px" />
            <Box>Predictions</Box>
          </Flex>
          <Flex alignItems="center" padding="10px 16px">
            <Icon as={BiHelpCircle} w="20px" h="20px" mr="8px" />
            <Box>Help Center</Box>
          </Flex>
          <Divider />
          <Flex alignItems="center" padding="10px 16px">
            <Icon as={CgEnter} w="20px" h="20px" mr="8px" />
            {!isLoggedIn ? (
              <Box onClick={() => setIsLoggedIn(true)}>Log In / Sign Up</Box>
            ) : (
              <Box onClick={() => setIsLoggedIn(false)}>Log Out</Box>
            )}
          </Flex>
        </Flex>
      ) : (
        ''
      )}
    </Box>
  );
};

export default NavDropDownWide;

export const NavDropDownSmall = () => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const { setIsLoggedIn, isLoggedIn } = useContext(ProfileContext);
  const [showMenu, setShowMenu] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);

  return (
    <Box
      my="auto"
      tabIndex="0"
      cursor="pointer"
      sx={{
        '@media (min-width: 768px)': {
          display: 'none',
        },
      }}
    >
      <Flex
        alignItems="center"
        borderRadius="4px"
        padding="2px 0"
        minH="32px"
        width="36px"
        textAlign="left"
        justifyContent="center"
        onClick={() => {
          setShowMenu(!showMenu);
          setShowComponent(!showMenu);
        }}
      >
        <Icon
          as={AiOutlineAlignCenter}
          color={iconColor}
          w="20px"
          h="20px"
          sx={{
            '@media (min-width: 768px)': {
              display: 'none',
            },
          }}
        />
      </Flex>
      {showComponent && showMenu ? (
        <Box
          zIndex="30"
          position="fixed"
          left="0"
          right="0"
          bottom="0"
          fontSize="16px"
          overflowY="scroll"
          top="48px"
          paddingBottom="96px"
          background="linear-gradient(180deg,#1d2535 0,#1d2535 50%,rgba(0,0,0,.3) 51%,rgba(0,0,0,.3))"
        >
          <Flex
            ref={ref}
            bg="#1d2535"
            marginBottom="0"
            padding="10px 16px 4px"
            zIndex="30"
            flexDir="column"
            color="#fff"
            marginBlockStart="1em"
            marginBlockEnd="1em"
            marginInlineStart="0px"
            marginInlineEnd="0px"
          >
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={GiTwoCoins} w="20px" h="20px" color={iconColor} mr="8px" />
              <Flex flexDir="column">
                <Box>Coins</Box>
                <Box fontSize="12px" fontWeight="400" lineHeight="16px" color={iconColor}>
                  0 Coins
                </Box>
              </Flex>
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={RiShieldCheckLine} color={iconColor} w="20px" h="20px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Premium
              </Box>
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={AiOutlineThunderbolt} color={iconColor} w="20px" h="20px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Powerups
              </Box>
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={MdAccessTime} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Recent Communities
              </Box>
              <Icon as={BsChevronDown} color={iconColor} w="16px" h="16px" ml="auto" sx={{}} />
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={VscCompass} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Explore
              </Box>
              <Icon as={BsChevronDown} color={iconColor} w="16px" h="16px" ml="auto" sx={{}} />
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={BiHelpCircle} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Popular Posts
              </Box>
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={AiOutlineSetting} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Settings
              </Box>
              <Icon as={BsChevronDown} color={iconColor} w="16px" h="16px" ml="auto" sx={{}} />
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={BiHelpCircle} color={iconColor} w="18px" h="18px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Help Center
              </Box>
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={AiOutlineInfoCircle} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                More
              </Box>
              <Icon as={BsChevronDown} color={iconColor} w="16px" h="16px" ml="auto" sx={{}} />
            </Flex>
            <Flex alignItems="center" mb="20px" ml="-4px">
              <Icon as={AiOutlineFileText} color={iconColor} w="16px" h="16px" mr="8px" />
              <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                Terms & Policies
              </Box>
              <Icon as={BsChevronDown} color={iconColor} w="16px" h="16px" ml="auto" sx={{}} />
            </Flex>
            <Flex alignItems="center">
              {!isLoggedIn ? (
                <Box
                  display="flex"
                  borderRadius="32px"
                  fontWeight="700"
                  fontSize="14px"
                  height="32px"
                  onClick={() => setIsLoggedIn(true)}
                  alignItems="center"
                  justifyContent="center"
                  padding="0 8px"
                  bg="#a4a4a4"
                  width="100%"
                  marginBottom="20px"
                >
                  Log In / Sign Up
                </Box>
              ) : (
                <Box
                  alignItems="center"
                  justifyContent="center"
                  padding="0 8px"
                  bg="#a4a4a4"
                  width="100%"
                  marginBottom="20px"
                  onClick={() => setIsLoggedIn(false)}
                  display="flex"
                  borderRadius="32px"
                  fontWeight="700"
                  fontSize="14px"
                  height="32px"
                >
                  Log Out
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
