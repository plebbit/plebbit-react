import React, { useContext } from 'react';
import {
  Flex,
  Box,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  ButtonGroup,
  Icon,
  MenuList,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  useColorModeValue,
  useColorMode,
  Button as Btn,
  Switch,
  Divider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ProfileContext } from '../../store/profileContext';
import PlebLogo from '../../assets/images/plebbit-logo.png';
import plebbitDarkLogo from '../../assets/svgs/plebbitDarkLogo.svg';
import { RiSearchLine, RiShieldCheckLine } from 'react-icons/ri';
import { BiUser, BiHelpCircle } from 'react-icons/bi';
import { BsChevronDown, BsArrowUpRightCircle } from 'react-icons/bs';
import { GiTwoCoins } from 'react-icons/gi';
import { AiOutlinePlus, AiOutlineStar, AiOutlineThunderbolt } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { HiOutlineChartSquareBar, HiOutlineChat } from 'react-icons/hi';
import { CgMediaLive, CgEnter } from 'react-icons/cg';
import { MdWhereToVote, MdHome } from 'react-icons/md';
import Button from '../Button';

const NavBar = () => {
  const { setIsLoggedIn, isLoggedIn } = useContext(ProfileContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const navBtnBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const contBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputBorder = useColorModeValue('#a4a4a4', '#343536');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const buttonHoverBorder = useColorModeValue('#edeff1', '#343536');
  return (
    <>
      <Box w="100%" minH="48px" />

      <Box
        position="fixed"
        flex="0"
        left="0"
        right="0"
        top="0"
        zIndex="80"
        color={color}
        marginTop="0px !important"
      >
        <Flex
          as="header"
          minH="48px"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          padding="0 20px"
          flexGrow="1"
          borderBottom={`1px solid ${navBorder}`}
          bg={contBg}
          color={color}
        >
          <Flex alignItems="center" flexGrow="1">
            <Flex alignItems="center">
              <Image
                borderRadius="full"
                width="32px"
                height="32px"
                src={colorMode === 'light' ? plebbitDarkLogo : PlebLogo}
                alt="Plebbit Logo"
                border="1px"
                borderColor="#ccc"
                mr="8px"
                cursor="pointer"
              />
              <Box
                fontSize="23px"
                lineHeight="16px"
                fontWeight="bold"
                fontFamily="cursive"
                height="18px"
                width="auto"
                sx={{
                  '@media (max-width: 768px)': {
                    display: 'none',
                  },
                }}
                cursor="pointer"
                color={colorMode === 'light' ? 'black' : 'white'}
              >
                <i>Plebbit</i>
              </Box>
            </Flex>
            <Menu preventOverflow>
              <MenuButton>
                <Flex
                  padding="6px 8px"
                  borderRadius="4px"
                  bg="transperant"
                  border="none"
                  ml="8px"
                  _hover={{
                    border: `1px solid ${navBtnBg}`,
                  }}
                  justifyContent="space-between"
                  cursor="default"
                  alignItems="center"
                  sx={{
                    '@media (min-width: 955px)': {
                      width: '270px',
                    },
                  }}
                >
                  <Flex ml="8px" alignItems="center">
                    <Icon as={MdHome} h={6} w={8} />
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      lineHeight="18px"
                      fontSize="14px"
                      fontWeight="500"
                      flexGrow="1"
                      sx={{
                        '@media (max-width: 768px)': {
                          display: 'none',
                        },
                      }}
                    >
                      Home
                    </Box>
                  </Flex>
                  <ChevronDownIcon
                    h={6}
                    w={8}
                    fontSize="20px"
                    fontWeight="400"
                    verticalAlign="middle"
                    lineHeight="20px"
                    ml="2px"
                    mr="-4px"
                    sx={{
                      '@media (max-width: 600px)': {
                        display: 'none',
                      },
                    }}
                  />
                </Flex>
              </MenuButton>
              <MenuList
                backgroundColor={bg}
                color={color}
                borderRadius="10px"
                boxShadow="0 2px 4px 0 rgba(28 28 28 0.2)"
              >
                <MenuItem>
                  <Input
                    placeholder="filter"
                    borderColor={color}
                    backgroundColor={inputBg}
                    size="sm"
                  />
                </MenuItem>
                <MenuGroup
                  fontSize="10px"
                  fontWeight="500"
                  lineHeight="16px"
                  textTransform="uppercase"
                  title="MY COMMUNITIES"
                >
                  <MenuItem>
                    <Flex alignItems="center" fontSize="14px" lineHeight="18px">
                      <Icon
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlinePlus}
                        color={color}
                      />
                      <Box>Create Community</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                  <MenuItem>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="14px"
                      lineHeight="18px"
                      width="100%"
                    >
                      <Flex alignItems="center">
                        <Image
                          src="https://styles.redditmedia.com/t5_ymekd/styles/communityIcon_3xhx24g2vh831.png"
                          marginRight="8px"
                          width={5}
                          height={5}
                        />
                        <Box>p/TomatoeTeam</Box>
                      </Flex>
                      <Icon
                        mr="auto"
                        marginRight="8px"
                        width={5}
                        height={5}
                        as={AiOutlineStar}
                        color={color}
                      />
                    </Flex>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Box maxWidth="690px" margin="0 auto" flexGrow={1}>
              <InputGroup width="auto" mx="16px">
                <InputLeftElement pointerEvents="none" padding="0 9px 0 15px;">
                  <Icon as={RiSearchLine} color={iconColor} w="20px" h="20px" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search Plebbit"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  width="100%"
                  bg={inputBg}
                  border="1px solid transparent"
                  borderColor={inputBorder}
                  _hover={{
                    borderColor: colorMode === 'light' ? navBtnBg : 'white',
                    bg: colorMode === 'light' ? 'white' : 'transparent',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                />
              </InputGroup>
            </Box>
          </Flex>
          <Flex alignContent="center">
            <Flex
              alignItems="center"
              marginRight="8px"
              sx={{
                '@media (max-width: 768px)': {
                  display: 'none',
                },
              }}
            >
              <Icon
                borderRadius="2px"
                color={iconColor}
                width={5}
                height={5}
                as={BsArrowUpRightCircle}
              />

              <Icon
                marginLeft="8px"
                borderRadius="2px"
                width={5}
                height={5}
                as={HiOutlineChartSquareBar}
                color={iconColor}
              />
            </Flex>

            <Box
              sx={{
                borderLeft: `1px solid #a4a4a4`,
                height: '15px',
                margin: 'auto',
                marginRight: '8px',
                '@media (max-width: 768px)': {
                  display: 'none',
                },
              }}
            />
            <Flex alignItems="center" marginRight="8px">
              <Icon borderRadius="2px" color={iconColor} width={5} height={5} as={HiOutlineChat} />
              <Icon borderRadius="2px" color={iconColor} width={5} height={5} as={BiBell} />

              <Icon
                marginLeft="8px"
                borderRadius="2px"
                width={5}
                height={5}
                as={AiOutlinePlus}
                color={iconColor}
              />
            </Flex>
            <ButtonGroup
              sx={{
                '@media (max-width: 614px)': {
                  display: 'none',
                },
                display: isLoggedIn ? 'none' : '',
              }}
            >
              <Button
                bg="transparent"
                marginLeft="16px"
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                content="Log In"
                color={navBtnBg}
                width="120px"
                onClick={() => setIsLoggedIn(true)}
              />
              <Button
                marginLeft="16px"
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                bg={navBtnBg}
                content="Sign Up"
                color={contBg}
                width="120px"
              />
            </ButtonGroup>
            <Menu closeOnSelect={false}>
              <MenuButton
                borderRadius="4px"
                outline="0"
                height="auto"
                minHeight="32px"
                padding="2px 0"
                sx={{
                  '@media (min-width: 955px)': {
                    width: isLoggedIn ? '150px' : '',
                  },
                }}
                bg={bg}
                _hover={{
                  borderColor: buttonHoverBorder,
                }}
                _active={{
                  bg: bg,
                }}
                _focus={{
                  outline: 'none',
                }}
                ml="8px"
                as={Btn}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  {!isLoggedIn ? (
                    <Icon as={BiUser} color={iconColor} w="20px" h="20px" />
                  ) : (
                    <Flex alignItems="center">
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
                      >
                        <Box fontSize="12px" fontWeight="500" lineHeight="16px">
                          Abydin
                        </Box>
                        <Box fontSize="12px" fontWeight="500" lineHeight="16px" color={iconColor}>
                          2.5m pleb
                        </Box>
                      </Flex>
                    </Flex>
                  )}
                  <Icon as={BsChevronDown} color={iconColor} w="20px" h="20px" />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuGroup
                  fontSize="10px"
                  fontWeight="700"
                  letterSpacing=".5px"
                  lineHeight="12px"
                  textTransform="uppercase"
                  color={iconColor}
                  margin="8px 0 4px 12px"
                  title="View Options"
                >
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    alignItems="center"
                    my="4px"
                  >
                    <Flex
                      width="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      direction="row"
                    >
                      {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                      <Box>Dark Mode</Box>
                      <Switch
                        size="md"
                        onChange={toggleColorMode}
                        isChecked={colorMode === 'dark'}
                      />
                    </Flex>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup
                  fontSize="10px"
                  fontWeight="700"
                  letterSpacing=".5px"
                  lineHeight="12px"
                  textTransform="uppercase"
                  color={iconColor}
                  margin="8px 0 4px 12px"
                  title="More stuffs"
                >
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={GiTwoCoins} w="20px" h="20px" />}
                  >
                    <Flex flexDir="column">
                      <Box>Coins</Box>
                      <Box fontSize="12px" fontWeight="400" lineHeight="16px" color={iconColor}>
                        {' '}
                        0 Coins
                      </Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={RiShieldCheckLine} w="20px" h="20px" mr="8px" />
                      <Box>Premium</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={AiOutlineThunderbolt} w="20px" h="20px" mr="8px" />
                      <Box>Powerups</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={CgMediaLive} w="20px" h="20px" mr="8px" />
                      <Box>Talk</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={MdWhereToVote} w="20px" h="20px" mr="8px" />
                      <Box>Predictions</Box>
                    </Flex>
                  </MenuItem>
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={BiHelpCircle} w="20px" h="20px" mr="8px" />
                      <Box>Help Center</Box>
                    </Flex>
                  </MenuItem>
                  <Divider />
                  <MenuItem fontSize="14px" fontWeight="500" lineHeight="18px" my="4px">
                    <Flex alignItems="center">
                      <Icon as={CgEnter} w="20px" h="20px" mr="8px" />
                      {!isLoggedIn ? (
                        <Box onClick={() => setIsLoggedIn(true)}>Log In / Sign Up</Box>
                      ) : (
                        <Box onClick={() => setIsLoggedIn(false)}>Log Out</Box>
                      )}
                    </Flex>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
