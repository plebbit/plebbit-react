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
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ProfileContext } from '../../store/profileContext';
import PlebLogo from '../../assets/images/plebbit-logo.png';
import plebbitDarkLogo from '../../assets/svgs/plebbitDarkLogo.svg';
import plebbitlightText2 from '../../assets/svgs/letters-black-grey-dot.svg';
import plebbitLightText from '../../assets/svgs/letters-white-grey-dot.svg';
import { RiSearchLine } from 'react-icons/ri';
import { BiBell } from 'react-icons/bi';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { ImPencil } from 'react-icons/im';
import { AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { HiOutlineChartSquareBar, HiOutlineChat } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import Button from '../Button';
import NavDropDownWide, { NavDropDownSmall } from './navDropDown';

const NavBar = () => {
  const history = useHistory();
  const { setIsLoggedIn, isLoggedIn } = useContext(ProfileContext);
  const { colorMode } = useColorMode();
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('white', 'darkNavBg');
  const navBtnBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const contBg = useColorModeValue('white', 'darkNavBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputBorder = useColorModeValue('#a4a4a4', '#343536');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  return (
    <>
      <Box w="100%" minH="48px" />

      <Box
        position="fixed"
        flex="0"
        left="0"
        right="0"
        top="0"
        color={color}
        marginTop="0px !important"
        zIndex="999999"
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
                mr="8px"
                cursor="pointer"
              />
            </Flex>
            {isLoggedIn ? (
              <Menu preventOverflow>
                <MenuButton
                  sx={{
                    '@media (max-width: 768px)': {
                      display: 'none',
                    },
                  }}
                >
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
            ) : (
              ''
            )}
            <Box
              maxWidth="690px"
              margin="0 auto"
              flexGrow={1}
              sx={{
                '@media (max-width: 768px)': {
                  display: 'none',
                },
              }}
            >
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
            {isLoggedIn ? (
              <>
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
                    as={HiOutlineChat}
                  />
                  <Icon borderRadius="2px" color={iconColor} width={5} height={5} as={BiBell} />

                  <Icon
                    marginLeft="8px"
                    borderRadius="2px"
                    width={5}
                    height={5}
                    as={AiOutlinePlus}
                    color={iconColor}
                    onClick={() => history.push('/submit')}
                  />
                </Flex>
              </>
            ) : (
              ''
            )}
            {isLoggedIn ? (
              <Flex
                alignItems="center"
                justifyContent="center"
                sx={{
                  '@media (min-width: 768px)': {
                    display: 'none',
                  },
                }}
              >
                <Icon
                  as={ImPencil}
                  onClick={() => history.push('/submit')}
                  color={iconColor}
                  w="20px"
                  h="20px"
                  marginRight="8px"
                />
              </Flex>
            ) : (
              ''
            )}

            {!isLoggedIn ? (
              <ButtonGroup
                sx={{
                  '@media (max-width: 768px)': {
                    display: 'none',
                  },
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
            ) : (
              ''
            )}
            <NavDropDownWide />
            <NavDropDownSmall />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
