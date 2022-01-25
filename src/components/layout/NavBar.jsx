import React from 'react';
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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import PlebLogo from '../../assets/images/plebbit-logo.png';
import plebbitDarkLogo from '../../assets/svgs/plebbitDarkLogo.svg';
import { RiSearchLine, RiShieldCheckLine } from 'react-icons/ri';
import { BiUser, BiHelpCircle } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { GiTwoCoins } from 'react-icons/gi';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { CgMediaLive, CgEnter } from 'react-icons/cg';
import { MdWhereToVote } from 'react-icons/md';
import Button from '../Button';

const NavBar = () => {
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
            <ButtonGroup
              sx={{
                '@media (max-width: 614px)': {
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
                rightIcon={<Icon as={BsChevronDown} color={iconColor} w="20px" h="20px" />}
              >
                <Icon as={BiUser} color={iconColor} w="20px" h="20px" />
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
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={RiShieldCheckLine} w="20px" h="20px" />}
                  >
                    Premium
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={AiOutlineThunderbolt} w="20px" h="20px" />}
                  >
                    Powerups
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={CgMediaLive} w="20px" h="20px" />}
                  >
                    Talk
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={MdWhereToVote} w="20px" h="20px" />}
                  >
                    Predictions
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={BiHelpCircle} w="20px" h="20px" />}
                  >
                    Help Center
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    my="4px"
                    icon={<Icon as={CgEnter} w="20px" h="20px" />}
                  >
                    Log In / Sign Up
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
