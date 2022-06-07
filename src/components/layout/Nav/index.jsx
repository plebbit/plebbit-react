import {
  Box,
  Flex,
  Image,
  useColorModeValue,
  useColorMode,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Switch,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { MdHome } from 'react-icons/md';
import PlebLogo from '../../../assets/images/plebbit-logo.png';
import plebbitDarkLogo from '../../../assets/svgs/plebbitDarkLogo.svg';
import plebbitlightText2 from '../../../assets/svgs/letters-black-grey-dot.svg';
import plebbitLightText from '../../../assets/svgs/letters-white-grey-dot.svg';
import DropDown2 from '../../DropDown/DropDown2';
import { RiCreativeCommonsByLine, RiSearchLine } from 'react-icons/ri';
import { BsArrowUpRightCircle, BsBarChartFill, BsChevronDown, BsEye } from 'react-icons/bs';
import { HiOutlineChartSquareBar, HiOutlineChat, HiOutlineUserGroup } from 'react-icons/hi';
import { BiBell, BiBookmarks, BiHelpCircle, BiPencil, BiTrendingUp } from 'react-icons/bi';
import {
  AiFillSetting,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineThunderbolt,
} from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import subPlebbitsData from '../../data/subPlebbits';
import NDDown from './nDDown';
import { GiHamburgerMenu, GiTwoCoins } from 'react-icons/gi';
import { CgEnter, CgNotes, CgProfile } from 'react-icons/cg';
import { ProfileContext } from '../../../store/profileContext';
import useVisible from '../../../hooks/useVisible';
import { VscMail } from 'react-icons/vsc';

const NavBar = () => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const [device] = useState('pc');
  const { setIsLoggedIn, isLoggedIn, profile } = useContext(ProfileContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);

  return (
    <Box>
      {device === 'pc' ? (
        <Flex
          flex="0"
          left="0"
          position="fixed"
          right="0"
          top="0"
          zIndex="80"
          marginTop="0"
          color={mainColor}
          height="48px"
          alignItems="center"
        >
          <Flex
            alignItems="center"
            bg={bg}
            borderBottom={`1px solid ${navBorder}`}
            boxSizing="border-box"
            flexGrow={1}
            padding="0 20px"
            height="100%"
          >
            <Flex alignItems="center" flexGrow="1">
              <Flex display="flex" alignItems="center">
                <Image
                  borderRadius="full"
                  width="32px"
                  height="32px"
                  maxWidth="32px"
                  src={colorMode === 'light' ? plebbitDarkLogo : PlebLogo}
                  alt="Plebbit Logo"
                  border="1px"
                  borderColor="#ccc"
                  mr="8px"
                  cursor="pointer"
                />
                <Image
                  height="18px"
                  width="auto"
                  src={colorMode === 'light' ? plebbitlightText2 : plebbitLightText}
                  alt="Plebbit Logo"
                  border="none"
                  mr="20px"
                  cursor="pointer"
                />
              </Flex>
              <Box>
                <DropDown2
                  prefix={() => <Icon as={MdHome} h={6} w={8} />}
                  options={subPlebbitsData}
                  placeholder="Home"
                  sx={{
                    width: '270px',
                    height: '36px',
                    background: 'transparent',
                  }}
                  isSearchable={false}
                />
              </Box>
              <Flex
                flexGrow={1}
                marginX="16px"
                width="auto"
                height="auto"
                border="1px solid transparent"
                borderRadius="4px"
                alignItems="center"
              >
                <InputGroup
                  boxShadow="none"
                  height="36px"
                  bg={inputBg}
                  borderWidth="1px"
                  borderColor={navBorder}
                  alignItems="center"
                  boxSizing="border-box"
                >
                  <InputLeftElement>
                    <Icon as={RiSearchLine} color={iconColor} w="20px" h="20px" />
                  </InputLeftElement>
                  <Input placeholder="Enter amount" />
                </InputGroup>
              </Flex>
            </Flex>
            <Flex alignItems="center" flexGrow="0">
              <Flex
                marginRight="8px"
                paddingRight="8px"
                borderRight={`1px solid ${navBorder}`}
                alignItems="center"
              >
                <Icon
                  borderRadius="2px"
                  color={iconColor2}
                  width={5}
                  height={5}
                  as={BsArrowUpRightCircle}
                />
                <Icon
                  marginLeft="8px"
                  borderRadius="2px"
                  width={6}
                  height={6}
                  as={HiOutlineChartSquareBar}
                  color={iconColor2}
                />
              </Flex>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Flex alignItems="center">
                    <Icon
                      borderRadius="2px"
                      color={iconColor2}
                      width={6}
                      height={6}
                      as={HiOutlineChat}
                    />
                    <Icon ml="8px" color={iconColor2} width={6} height={6} as={BiBell} />
                    <Icon
                      ml="8px"
                      color={iconColor2}
                      width={6}
                      height={6}
                      as={AiOutlinePlus}
                      onClick={() => history.push('/submit')}
                    />
                  </Flex>

                  <NDDown
                    onClick={() => {
                      setShowDropDown(!showDropDown);
                      setShowComponent(!showDropDown);
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex bg="#1d2535" height="48px" position="fixed" width="100%" zIndex="30" top="0">
          <Flex
            width="100%"
            alignItems="center"
            height="100%"
            margin="0"
            paddingLeft="16px"
            paddingRight="8px"
          >
            <Flex flexBasis="144px" flex="1 0 130px" mr="auto" alignItems="center">
              <Image
                borderRadius="full"
                width="30px"
                height="30px"
                src={PlebLogo}
                alt="Plebbit Logo"
                border="1px"
                borderColor="#ccc"
                mr="4px"
                cursor="pointer"
              />
              <Image
                height="18px"
                width="auto"
                src={plebbitLightText}
                alt="Plebbit Logo"
                border="none"
                mr="20px"
                cursor="pointer"
              />
            </Flex>
            <Flex
              mr="8px"
              padding={0}
              height="36px"
              width="36px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={BiPencil} width={6} height={6} color="#fff" />
            </Flex>
            <Flex
              onClick={() => {
                setShowDropDown(!showDropDown);
                setShowComponent(!showDropDown);
              }}
              height="36px"
              width="36px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={GiHamburgerMenu} width={6} height={6} color="#fff" />
            </Flex>
          </Flex>
        </Flex>
      )}
      {showDropDown && showComponent && (
        <Box ref={ref}>
          {device === 'pc' ? (
            <Box
              position="fixed"
              right="16px"
              top="45.3125px"
              borderRadius="4px"
              justifyContent="flex-end"
              marginTop="4px"
              paddingY="8px"
              width="252px"
              border={`1px solid ${navBorder}`}
              boxShadow="none"
              maxHeight="80%"
              overflowY="auto"
              overflowX="hidden"
              zIndex="80"
              bg={bg}
            >
              <Box width="100%" height="40px" color="#787c7e">
                <Flex alignItems="center" height="100%" padding="0 20px">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flex="0 0"
                    fontSize="20px"
                    mr="12px"
                    minW="20px"
                    w="20px"
                  >
                    <Icon as={CgProfile} width={5} height={5} />
                  </Flex>
                  <Box
                    flex="1 1 100%"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    textAlign="left"
                    width="100%"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    My Stuff
                  </Box>
                </Flex>
              </Box>
              <Box borderBottom={`1px solid ${navBorder}`} marginBottom="12px" paddingBottom="12px">
                <Flex
                  boxSizing="border-box"
                  height="40px"
                  width="100%"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  alignItems="center"
                  color={mainColor}
                  paddingRight="16px"
                  paddingLeft="52px"
                  justifyContent="space-between"
                  _hover={{
                    bg: inputBg,
                  }}
                >
                  <Box>Online Status</Box>
                  <Switch size="md" />
                </Flex>
                <Flex
                  boxSizing="border-box"
                  height="40px"
                  width="100%"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  alignItems="center"
                  color={mainColor}
                  paddingRight="16px"
                  _hover={{
                    bg: inputBg,
                  }}
                  paddingLeft="52px"
                  justifyContent="space-between"
                  onClick={() => history.push(`/profile`, [])}
                >
                  <Box>Profile</Box>
                </Flex>
                <Flex
                  boxSizing="border-box"
                  height="40px"
                  width="100%"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  alignItems="center"
                  color={mainColor}
                  paddingRight="16px"
                  paddingLeft="52px"
                  justifyContent="space-between"
                  _hover={{
                    bg: inputBg,
                  }}
                >
                  <Box>Style Avatar</Box>
                </Flex>
                <Flex
                  _hover={{
                    bg: inputBg,
                  }}
                  boxSizing="border-box"
                  height="40px"
                  width="100%"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  alignItems="center"
                  color={mainColor}
                  paddingRight="16px"
                  paddingLeft="52px"
                  justifyContent="space-between"
                  onClick={() => history.push(`/settings`, [])}
                >
                  <Box>User Settings</Box>
                </Flex>
              </Box>
              <Box width="100%" height="40px" color="#787c7e">
                <Flex alignItems="center" height="100%" padding="0 20px">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flex="0 0"
                    fontSize="20px"
                    mr="12px"
                    minW="20px"
                    w="20px"
                  >
                    <Icon as={BsEye} width={5} height={5} />
                  </Flex>
                  <Box
                    flex="1 1 100%"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    textAlign="left"
                    width="100%"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    View Options
                  </Box>
                </Flex>
              </Box>
              <Box
                _hover={{
                  bg: inputBg,
                }}
                borderBottom={`1px solid ${navBorder}`}
                marginBottom="12px"
                paddingBottom="12px"
              >
                <Flex
                  boxSizing="border-box"
                  height="40px"
                  width="100%"
                  cursor="pointer"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  alignItems="center"
                  color={mainColor}
                  paddingRight="16px"
                  paddingLeft="52px"
                  justifyContent="space-between"
                >
                  <Box>Dark Mode</Box>
                  <Switch
                    size="md"
                    onChange={toggleColorMode}
                    isChecked={colorMode === 'dark'}
                    ml="auto"
                  />
                </Flex>
              </Box>
              <Box borderBottom={`1px solid ${navBorder}`} marginBottom="12px" paddingBottom="12px">
                <Box
                  width="100%"
                  height="40px"
                  color={mainColor}
                  cursor="pointer"
                  _hover={{
                    bg: inputBg,
                  }}
                >
                  <Flex alignItems="center" height="100%" padding="0 20px">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flex="0 0"
                      fontSize="20px"
                      mr="12px"
                      minW="20px"
                      w="20px"
                    >
                      <Icon as={RiCreativeCommonsByLine} width={5} height={5} />
                    </Flex>
                    <Box
                      flex="1 1 100%"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      textAlign="left"
                      width="100%"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                    >
                      Create Community
                    </Box>
                  </Flex>
                </Box>
                <Box
                  width="100%"
                  height="40px"
                  color={mainColor}
                  cursor="pointer"
                  _hover={{
                    bg: inputBg,
                  }}
                >
                  <Flex alignItems="center" height="100%" padding="0 20px">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flex="0 0"
                      fontSize="20px"
                      mr="12px"
                      minW="20px"
                      w="20px"
                    >
                      <Icon as={BiHelpCircle} width={5} height={5} />
                    </Flex>
                    <Box
                      flex="1 1 100%"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      textAlign="left"
                      width="100%"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                    >
                      Help Center
                    </Box>
                  </Flex>
                </Box>
                <Box
                  width="100%"
                  height="40px"
                  color={mainColor}
                  cursor="pointer"
                  _hover={{
                    bg: inputBg,
                  }}
                >
                  <Flex alignItems="center" height="100%" padding="0 20px">
                    <Icon as={GiTwoCoins} w="20px" h="20px" mr="8px" />
                    <Flex flexDir="column">
                      <Box>Coins</Box>
                      <Box fontSize="12px" fontWeight="400" lineHeight="16px" color={iconColor}>
                        0 Coins
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </Box>

              <Box
                width="100%"
                height="40px"
                color={mainColor}
                cursor="pointer"
                _hover={{
                  bg: inputBg,
                }}
              >
                <Flex alignItems="center" height="100%" padding="0 20px">
                  <Icon as={CgEnter} w="20px" h="20px" mr="8px" />
                  {!isLoggedIn ? (
                    <Box onClick={() => setIsLoggedIn(true)}>Log In / Sign Up</Box>
                  ) : (
                    <Box onClick={() => setIsLoggedIn(false)}>Log Out</Box>
                  )}
                </Flex>
              </Box>
              <Box
                color={iconColor}
                width="100%"
                fontSize="12px"
                lineHeight="16px"
                fontWeight="400"
                minHeight="40px"
                padding="12px 20px"
                minH="40px"
                height="unset"
              >
                © 2022 Reddit, Inc. All rights reserved{' '}
              </Box>
            </Box>
          ) : (
            <Box
              top="48px"
              bg="linear-gradient(180deg,#1d2535 0,#1d2535 50%,rgba(0,0,0,.3) 51%,rgba(0,0,0,.3))"
              paddingBottom="96px"
              zIndex="30"
              position="fixed"
              left="0"
              right="0"
              bottom="0"
              fontSize="16px"
              overflowY="scroll"
            >
              <Flex
                bg="#1d2535"
                padding="10px 16px 4px"
                marginBottom="0"
                zIndex="30"
                flexDirection="column"
              >
                <Box marginBottom="20px">
                  <Flex
                    height="32px"
                    bg="rgba(246,247,248,.1)"
                    flexFlow="row nowrap"
                    alignItems="center"
                    borderRadius="32px"
                    display="flex"
                    border="1px solid transparent"
                    padding="0 12px"
                  >
                    <Icon as={RiSearchLine} color="#d7dadc" fill="#d7dadc" w={5} h={5} mr="8px" />
                    <Box flex="1">
                      <Input
                        color="#fff"
                        placeholder="Search plebbit"
                        bg="none"
                        boxSizing="content-box"
                        fontSize="16px"
                        textOverflow="ellipsis"
                        border="none"
                        outline="none"
                        padding="0"
                        height="100%"
                      />
                    </Box>
                  </Flex>
                </Box>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex
                    alignItems="center"
                    flexFlow="row nowrap"
                    onClick={() => history.push('/profile', [])}
                  >
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Box
                        bg="#24a0ed"
                        backgroundRepeat="no-repeat"
                        borderRadius="50%"
                        height="100%"
                        position="relative"
                        width="100%"
                      >
                        <Image
                          src="https://raw.githubusercontent.com/plebbit/assets/master/logo-square.svg"
                          bg="#fff"
                          borderRadius="50%"
                          height="100%"
                          objectPosition="0 0"
                          width="100%"
                        />
                      </Box>
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      {profile?.author?.displayName}
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={VscMail} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Inbox
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={GiTwoCoins} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Flex flexDir="column" justifyContent="center">
                      <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                        Coins
                      </Box>
                      <Box fontSize="11px" lineHeight="1.2">
                        0 Coins
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={AiOutlineThunderbolt} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Powerups
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer" width="100%">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={BiHelpCircle} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Recent Communities
                    </Box>

                    <Icon as={BsChevronDown} color="#787c7e" ml="auto" w={6} h={5} />
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer" width="100%">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={HiOutlineUserGroup} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      My Communities
                    </Box>

                    <Icon as={BsChevronDown} color="#787c7e" ml="auto" w={6} h={5} />
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={HiOutlineChat} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Chat
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={BiBookmarks} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Saved
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer" width="100%">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={AiFillSetting} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Settings
                    </Box>

                    <Icon as={BsChevronDown} color="#787c7e" ml="auto" w={6} h={5} />
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={BiTrendingUp} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      p/popular
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={BsBarChartFill} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      p/all
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={BiHelpCircle} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Help Center
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer" width="100%">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={AiOutlineInfoCircle} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      More
                    </Box>

                    <Icon as={BsChevronDown} color="#787c7e" ml="auto" w={6} h={5} />
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  color="#fff"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                >
                  <Flex alignItems="center" flexFlow="row nowrap" cursor="pointer" width="100%">
                    <Flex
                      alignItems="center"
                      flex="0 0 24px"
                      height="24px"
                      justifyContent="center"
                      mr="8px"
                      position="8px"
                      width="24px"
                    >
                      <Icon as={CgNotes} w={5} h={5} opacity=".5" />
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      Terms and Conditions
                    </Box>

                    <Icon as={BsChevronDown} color="#787c7e" ml="auto" w={6} h={5} />
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                  justifyContent="center"
                >
                  <Button
                    borderRadius="32px"
                    fontSize="14px"
                    fontWeight="700"
                    height="32px"
                    width="100%"
                    lineHeight="17px"
                    marginBottom="20px"
                    padding="0 8px"
                  >
                    Log out
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
