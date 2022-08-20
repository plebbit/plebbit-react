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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { MdHome } from 'react-icons/md';
import PlebLogo from '../../../assets/images/plebbit-logo.png';
import plebbitDarkLogo from '../../../assets/svgs/plebbitDarkLogo.svg';
import DropDown2 from '../../DropDown/DropDown2';
import { RiCreativeCommonsByLine, RiSearchLine } from 'react-icons/ri';
import {
  BsArrowUpRightCircle,
  BsBarChartFill,
  BsChevronDown,
  BsEye,
  BsPlusLg,
} from 'react-icons/bs';
import { HiOutlineChartSquareBar, HiOutlineChat, HiOutlineUserGroup } from 'react-icons/hi';
import { BiBell, BiBookmarks, BiHelpCircle, BiPencil, BiTrendingUp } from 'react-icons/bi';
import {
  AiFillSetting,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineThunderbolt,
} from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import NDDown from './nDDown';
import { GiHamburgerMenu, GiTwoCoins } from 'react-icons/gi';
import { CgNotes, CgProfile } from 'react-icons/cg';
import { ProfileContext } from '../../../store/profileContext';
import useVisible from '../../../hooks/useVisible';
import { VscMail } from 'react-icons/vsc';
import ImportAccount from './modal/importAccount';
import CreateSubPlebbit from './modal/CreateSubPlebbit';
import getUserName from '../../../utils/getUserName';
import NavItem from './navItem';
import truncateString from '../../../utils/truncateString';
import { PlebbitTextLogo } from '../../../assets/svgs/svg';
import getIsOnline from '../../../utils/getIsOnline';

const NavBar = ({ location }) => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const {
    profile,
    device,
    accountLists,
    createAccount,
    setActiveAccount,
    subscriptions,
    version,
    accountSubplebbits,
    setPostView,
    postView,
    authorAvatarImageUrl,
    homeAdd,
    subPlebbitDefData: subPlebbitData,
  } = useContext(ProfileContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();

  const toast = useToast();

  const handleCreateAccount = async () => {
    await createAccount();
    toast({
      title: 'Create Account.',
      description: 'Account Created Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {device !== 'mobile' ? (
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
              <Flex display="flex" alignItems="center" onClick={() => history.push('/', [])}>
                <Image
                  fallbackSrc={require('../../../assets/images/fallback.png')}
                  borderRadius="full"
                  width="32px"
                  height="32px"
                  maxWidth="32px"
                  src={plebbitDarkLogo}
                  alt="Plebbit Logo"
                  mr="8px"
                  cursor="pointer"
                />
                <PlebbitTextLogo
                  style={{
                    height: '20px',
                    border: 'none',
                    marginRight: '10px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  color={colorMode === 'light' ? '#000' : '#fff'}
                />
              </Flex>
              <Box>
                <DropDown2
                  onChange={(x) => {
                    if (location.label === 'Home') {
                      setPostView(x.value);
                    } else {
                      if (typeof x?.value === 'object') {
                        history.push('/');
                      } else {
                        history.push(x?.value);
                      }
                    }
                  }}
                  prefix={() => <Icon as={MdHome} h={6} w={8} />}
                  options={[
                    location || {},
                    {
                      label: location?.label !== 'Home' ? 'Home' : 'p/All',
                      value: subPlebbitData?.map((x) => x?.address),
                    },
                  ]}
                  placeholder="Home"
                  getOptionValue={(item) => item?.value}
                  sx={{
                    width: '270px',
                    height: '36px',
                    background: 'transparent',
                  }}
                  value={
                    location?.label !== 'Home'
                      ? location
                      : [
                          { label: 'Home', value: homeAdd },
                          {
                            label: location?.label !== 'Home' ? 'Home' : 'p/All',
                            value: subPlebbitData?.map((x) => x?.address),
                          },
                        ].find((x) => x?.value === postView)
                  }
                  isSearchable={false}
                  topMenu={
                    <Box>
                      <Box paddingX="12px" paddingTop="10px" fontSize="10px">
                        Moderating
                      </Box>
                      {Object.keys(accountSubplebbits)?.length
                        ? Object.keys(accountSubplebbits)?.map((pages, index) => (
                            <Link key={index} to={`/p/${pages}/`}>
                              <Flex
                                alignItems="center"
                                _hover={{
                                  bg: '#DEEBFF',
                                }}
                                padding="8px 12px"
                                textTransform="capitalize"
                                fontWeight="400"
                                fontSize="14px"
                                borderBottom={`1px solid ${navBorder}`}
                              >
                                <Box
                                  borderRadius="50%"
                                  width="20px"
                                  height="20px"
                                  position="relative"
                                  mr="8px"
                                >
                                  <Box width="100%" position="absolute" bottom="0">
                                    <Image
                                      fallbackSrc={require('../../../assets/images/fallback.png')}
                                      src={pages?.avatar}
                                      width="100%"
                                      transformOrigin="bottom center"
                                      display="block"
                                      transform="scale(1.3)"
                                      rounded="full"
                                    />
                                  </Box>
                                  <Box
                                    width="12.5px"
                                    height="12.5px"
                                    rounded="full"
                                    bg={
                                      getIsOnline(accountSubplebbits[pages]?.updatedAt)
                                        ? '#46d160'
                                        : 'red'
                                    }
                                    position="absolute"
                                    borderWidth="2px"
                                    borderColor="#fff"
                                    borderStyle="solid"
                                    right="-0.5"
                                    bottom="0"
                                  />
                                </Box>
                                <Box>
                                  {accountSubplebbits[pages]?.title
                                    ? accountSubplebbits[pages]?.title
                                    : truncateString(accountSubplebbits[pages]?.title, 20)}
                                </Box>
                              </Flex>
                            </Link>
                          ))
                        : ''}
                    </Box>
                  }
                  bottomMenu={
                    <>
                      <Box paddingX="12px" paddingTop="10px" fontSize="10px">
                        Your Communities
                      </Box>
                      <Flex
                        fontWeight="500"
                        fontSize="12px"
                        padding="12px"
                        cursor="pointer"
                        color="blue.400"
                        borderBottomColor={navBorder}
                        borderBottomWidth="3px"
                        borderBottomStyle="solid"
                        _hover={{
                          bg: inputBg,
                        }}
                        onClick={onOpenCreate}
                        alignItems="center"
                      >
                        <Icon onClick={() => onOpenCreate()} as={BsPlusLg} mr="8px" />
                        <Box onClick={() => onOpenCreate()}>Create Community</Box>
                      </Flex>
                      {[
                        subPlebbitData?.map((x) => ({
                          ...x,
                          label: x?.title ? x?.title : truncateString(x?.address, 20),
                          value: x?.address,
                        })),
                        subscriptions?.map((x) => ({
                          ...x,
                          label: x?.title ? x?.title : truncateString(x?.address, 20),
                          value: x?.address,
                        })),
                      ]
                        .flat()
                        ?.map((pages, index) => (
                          <Link key={index} to={`/p/${pages?.value}/`}>
                            <Flex
                              _hover={{
                                bg: '#DEEBFF',
                              }}
                              padding="8px 12px"
                              textTransform="capitalize"
                              fontWeight="400"
                              fontSize="14px"
                              borderBottom={`1px solid ${navBorder}`}
                              alignItems="center"
                            >
                              <Box
                                borderRadius="50%"
                                width="20px"
                                height="20px"
                                position="relative"
                                mr="8px"
                              >
                                <Box width="100%" position="absolute" bottom="0">
                                  <Image
                                    fallbackSrc={require('../../../assets/images/fallback.png')}
                                    src={pages?.avatar}
                                    width="100%"
                                    transformOrigin="bottom center"
                                    display="block"
                                    transform="scale(1.3)"
                                    rounded="full"
                                  />
                                </Box>
                                <Box
                                  width="12.5px"
                                  height="12.5px"
                                  rounded="full"
                                  bg={getIsOnline(pages?.updatedAt) ? '#46d160' : 'red'}
                                  position="absolute"
                                  borderWidth="2px"
                                  borderColor="#fff"
                                  borderStyle="solid"
                                  right="-0.5"
                                  bottom="0"
                                />
                              </Box>
                              <Box>{pages?.label || pages?.address}</Box>
                            </Flex>
                          </Link>
                        ))}
                    </>
                  }
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
                flexDirection="column"
                position="relative"
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
                  <Input placeholder="Search plebbit " />
                </InputGroup>
                {1 === 2 && (
                  <Flex
                    padding="20px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderRadius="5px"
                    borderColor={navBorder}
                    top="45px"
                    width="100%"
                    position="absolute"
                    background={bg}
                  >
                    <Flex flexDirection="row" alignItems="center">
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        alt="not-found"
                        fallbackSrc={require('../../../assets/images/fallback.png')}
                        rounded="full"
                        mr="8px"
                      />
                      <Flex flexDir="column">
                        <Box fontSize="14px" fontWeight="500" lineHeight="18px">
                          Title
                        </Box>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          Subplebbit address
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
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
            <Flex
              flexBasis="144px"
              flex="1 0 130px"
              mr="auto"
              alignItems="center"
              onClick={() => {
                history.push('/', []);
              }}
            >
              <Image
                fallbackSrc={require('../../../assets/images/fallback.png')}
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
              <PlebbitTextLogo
                style={{
                  height: '20px',
                  border: 'none',
                  marginRight: '10px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                color="#fff"
              />
            </Flex>
            <Flex
              mr="8px"
              padding={0}
              height="36px"
              width="36px"
              alignItems="center"
              justifyContent="center"
              onClick={() => history.push('/submit', [])}
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
          {device !== 'mobile' ? (
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
              <Flex alignItems="center" height="100%" padding="0 10px">
                <DropDown2
                  placeholder=" "
                  topMenu={
                    <Flex flexDir="column">
                      <Box
                        cursor="pointer"
                        fontSize="14px"
                        mb="10px"
                        color="blue.600"
                        _hover={{
                          bg: inputBg,
                        }}
                        fontWeight="500"
                        fontStyle="italic"
                        padding="10px 20px"
                        onClick={handleCreateAccount}
                      >
                        Create Account
                      </Box>
                      <Box
                        cursor="pointer"
                        fontSize="14px"
                        mb="10px"
                        color="blue.600"
                        padding="5px 20px"
                        _hover={{
                          bg: inputBg,
                        }}
                        fontWeight="500"
                        fontStyle="italic"
                        onClick={onOpen}
                      >
                        Import Account
                      </Box>
                    </Flex>
                  }
                  options={accountLists}
                  getOptionLabel={(item) =>
                    item?.author?.displayName ? item?.author?.displayName : item?.name
                  }
                  getOptionValue={(item) => item?.name}
                  onChange={async (val) => {
                    await setActiveAccount(val?.name);
                    toast({
                      title: 'Account Changed.',
                      description: `${val?.name} selected`,
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
                  }}
                  value={profile}
                  sx={{
                    background: 'transparent',
                  }}
                />
              </Flex>
              <Box width="100%" height="40px" color="#787c7e">
                <Flex alignItems="center" height="100%" padding="10px 20px" color="">
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
                  onClick={onOpenCreate}
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

              {/* <Box
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
              </Box> */}
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
                Plebbit v{version} GPL-2.0
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
                    onClick={() => {
                      history.push('/profile', []);
                      setShowDropDown(!showDropDown);
                      setShowComponent(!showDropDown);
                    }}
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
                          fallbackSrc={require('../../../assets/images/fallback.png')}
                          src={authorAvatarImageUrl}
                          bg="#fff"
                          borderRadius="50%"
                          height="100%"
                          objectPosition="0 0"
                          width="100%"
                        />
                      </Box>
                    </Flex>
                    <Box fontSize="16px" fontWeight="600" lineHeight="19px" textAlign="left">
                      {getUserName(profile?.author)}
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  flexFlow="row nowrap"
                  marginBottom="20px"
                  marginLeft="-4px"
                  paddingLeft="2px"
                  color="#fff"
                >
                  <DropDown2
                    selectStyles={{
                      background: '#1d2535',
                    }}
                    placeholder=" "
                    topMenu={
                      <Flex flexDir="column">
                        <Box
                          cursor="pointer"
                          fontSize="14px"
                          mb="10px"
                          color="blue.600"
                          _hover={{
                            bg: inputBg,
                          }}
                          fontWeight="500"
                          fontStyle="italic"
                          padding="10px 20px"
                          onClick={handleCreateAccount}
                        >
                          Create Account
                        </Box>
                        <Box
                          cursor="pointer"
                          fontSize="14px"
                          mb="10px"
                          color="blue.600"
                          padding="5px 20px"
                          _hover={{
                            bg: inputBg,
                          }}
                          fontWeight="500"
                          fontStyle="italic"
                          onClick={onOpen}
                        >
                          Import Account
                        </Box>
                      </Flex>
                    }
                    options={accountLists}
                    getOptionLabel={(item) =>
                      item?.author?.displayName ? item?.author?.displayName : item?.name
                    }
                    getOptionValue={(item) => item?.id}
                    onChange={async (val) => {
                      await setActiveAccount(val?.name);
                      toast({
                        title: 'Account Changed.',
                        description: `${val?.name} selected`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                    value={profile}
                    sx={{
                      background: 'transparent',
                    }}
                  />
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
                <NavItem
                  head={
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
                  }
                  body={
                    <Flex
                      flexDirection="column"
                      color="#fff"
                      marginBottom="20px"
                      marginLeft="-4px"
                      paddingLeft="20px"
                    >
                      {[
                        { label: 'Home', value: homeAdd },
                        { label: 'p/All', value: subPlebbitData?.map((x) => x?.address) },
                      ]?.map((pages, index) => (
                        <Flex
                          key={index}
                          alignItems="center"
                          flexFlow="row nowrap"
                          cursor="pointer"
                          onClick={() => {
                            setShowDropDown(!showDropDown);
                            setShowComponent(!showDropDown);
                            setPostView(pages.value);
                          }}
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
                            {/* <Icon as={VscMail} w={5} h={5} opacity=".5" /> */}
                          </Flex>
                          <Box fontSize="14px" fontWeight="400" textAlign="left" padding="5px">
                            {pages.label}
                          </Box>
                        </Flex>
                      ))}
                      {[subPlebbitData.map((x) => ({ ...x, label: x?.title, value: x?.address }))]
                        .flat()
                        ?.map((pages, index) => (
                          <Flex
                            key={index}
                            alignItems="center"
                            flexFlow="row nowrap"
                            cursor="pointer"
                            onClick={() => {
                              setShowDropDown(!showDropDown);
                              setShowComponent(!showDropDown);
                              setPostView(pages.value);
                            }}
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
                                borderRadius="50%"
                                width="20px"
                                height="20px"
                                position="relative"
                                mr="8px"
                              >
                                <Box width="100%" position="absolute" bottom="0">
                                  <Image
                                    fallbackSrc={require('../../../assets/images/fallback.png')}
                                    src={pages?.avatar}
                                    width="100%"
                                    transformOrigin="bottom center"
                                    display="block"
                                    transform="scale(1.3)"
                                    rounded="full"
                                  />
                                </Box>
                                <Box
                                  width="12.5px"
                                  height="12.5px"
                                  rounded="full"
                                  bg={getIsOnline(pages?.updatedAt) ? '#46d160' : 'red'}
                                  position="absolute"
                                  borderWidth="2px"
                                  borderColor="#fff"
                                  borderStyle="solid"
                                  right="-0.5"
                                  bottom="0"
                                />
                              </Box>
                            </Flex>
                            <Box fontSize="14px" fontWeight="400" textAlign="left" padding="5px">
                              {pages.label}
                            </Box>
                          </Flex>
                        ))}
                    </Flex>
                  }
                />

                <NavItem
                  head={
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
                  }
                  body={
                    <Flex
                      flexDirection="column"
                      color="#fff"
                      marginBottom="20px"
                      marginLeft="-4px"
                      paddingLeft="20px"
                    >
                      <Box
                        width="100%"
                        height="40px"
                        color={mainColor}
                        cursor="pointer"
                        _hover={{
                          bg: inputBg,
                        }}
                        onClick={() => {
                          setShowDropDown(!showDropDown);
                          setShowComponent(!showDropDown);
                          onOpenCreate();
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
                      {Object.keys(accountSubplebbits)?.map((pages, index) => (
                        <Link key={index} to={`/p/${pages}/`}>
                          <Flex
                            alignItems="center"
                            flexFlow="row nowrap"
                            cursor="pointer"
                            onClick={() => {
                              setShowDropDown(!showDropDown);
                              setShowComponent(!showDropDown);
                            }}
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
                                borderRadius="50%"
                                width="20px"
                                height="20px"
                                position="relative"
                                mr="8px"
                              >
                                <Box width="100%" position="absolute" bottom="0">
                                  <Image
                                    fallbackSrc={require('../../../assets/images/fallback.png')}
                                    src={pages?.avatar}
                                    width="100%"
                                    transformOrigin="bottom center"
                                    display="block"
                                    transform="scale(1.3)"
                                    rounded="full"
                                  />
                                </Box>
                                <Box
                                  width="12.5px"
                                  height="12.5px"
                                  rounded="full"
                                  bg={
                                    getIsOnline(accountSubplebbits[pages]?.updatedAt)
                                      ? '#46d160'
                                      : 'red'
                                  }
                                  position="absolute"
                                  borderWidth="2px"
                                  borderColor="#fff"
                                  borderStyle="solid"
                                  right="-0.5"
                                  bottom="0"
                                />
                              </Box>
                            </Flex>
                            <Box fontSize="14px" fontWeight="400" textAlign="left" padding="5px">
                              {accountSubplebbits[pages]?.title}
                            </Box>
                          </Flex>
                        </Link>
                      ))}
                    </Flex>
                  }
                />

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
                  onClick={() => {
                    history.push('/settings', []);
                    setShowDropDown(!showDropDown);
                    setShowComponent(!showDropDown);
                  }}
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
                  <Flex
                    alignItems="center"
                    flexFlow="row nowrap"
                    cursor="pointer"
                    onClick={() => setPostView(subPlebbitData?.map((x) => x?.address))}
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

      {isOpen ? <ImportAccount isOpen={isOpen} onClose={onClose} /> : ''}
      {isOpenCreate ? <CreateSubPlebbit isOpen={isOpenCreate} onClose={onCloseCreate} /> : ''}
    </Box>
  );
};

export default NavBar;
