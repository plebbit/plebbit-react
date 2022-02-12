import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Icon,
  Menu,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Input,
  Image,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { ChevronDownIcon, LinkIcon } from '@chakra-ui/icons';
import { FaFire } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineRise } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp } from 'react-icons/bs';
import { MdOutlineIndeterminateCheckBox, MdCompress } from 'react-icons/md';
import Button from '../../components/Button';
import Post from './Post';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';

const Home = () => {
  const { isLoggedIn, postStyle, setPostStyle } = useContext(ProfileContext);
  const history = useHistory();
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const selected = useColorModeValue('selectedLight', 'selectedDark');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');

  return (
    <Flex
      maxWidth="100%"
      justifyContent="center"
      margin="0 auto !important"
      sx={{
        '@media (min-width: 640px)': {
          padding: '20px 24px',
        },
      }}
    >
      <Box
        width="640px"
        sx={{
          '@media (min-width: 960px)': {
            minWidth: '0',
          },
          '@media (max-width: 960px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
        {!isLoggedIn ? (
          <Box
            pb="10px"
            fontSize="14px"
            textTransform="unset"
            lineHeight="18px"
            color="#878A8c"
            position="relative"
            width="100%"
          >
            Popular posts
          </Box>
        ) : (
          <Flex
            alignItems="center"
            backgroundColor={bg}
            border={`1px solid ${bg}`}
            borderRadius="4px"
            boxSizing="border-box"
            marginBottom="16px"
            padding="10px 12px"
            flexFlow="row no-wrap"
            marginTop="28px"
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
            <Input
              backgroundColor={inputBg}
              borderRadius="4px"
              placeholder="Create Post"
              flexGrow="1"
              fontSize="14px"
              fontWeight="400"
              lineHeight="400"
              onClick={() => history.push('/submit')}
            />
            <Box
              _hover={{
                background: '#f6f7f8',
              }}
              borderRadius="4px"
              fontSize="20px"
              fontWeight="700"
              lineHeight="18px"
              minW="40px"
              minH="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml="6px"
              onClick={() => history.push('/submit')}
            >
              <LinkIcon verticalAlign="middle" lineHeight="20px" color={iconColor} ml="4px" />
            </Box>
          </Flex>
        )}

        <Flex
          alignItems="center"
          backgroundColor={bg}
          border={`1px solid ${bg}`}
          borderRadius="4px"
          boxSizing="border-box"
          marginBottom="16px"
          padding="10px 12px"
          flexFlow="row no-wrap"
        >
          <Flex alignItems="center" cursor="pointer">
            <Button
              padding="6px 8px"
              minH="unset"
              minW="unset"
              borderRadius="20px"
              bg="rgba(164, 164, 164, 0.1)"
              border="none"
              mr="8px"
              content={
                <Flex cursor="default" alignItems="center">
                  <Icon
                    as={FaFire}
                    width={6}
                    height={6}
                    padding="0 8px 0 0"
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                  />
                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    lineHeight="18px"
                    maxHeight="64px"
                    whiteSpace="normal"
                    textAlign="left"
                    color="#a4a4a4"
                  >
                    Hot
                  </Box>
                </Flex>
              }
            />

            <Menu preventOverflow>
              <MenuButton alignItems="center" display="flex">
                <Button
                  padding="6px 8px"
                  minH="unset"
                  minW="unset"
                  mr="8px"
                  borderRadius="20px"
                  bg="rgba(164, 164, 164, 0.1)"
                  border="none"
                  content={
                    <Flex cursor="default" padding="0 8px" alignItems="center">
                      <Box
                        overflow="hidden"
                        textOverflow="ellipsis"
                        lineHeight="18px"
                        maxHeight="54px"
                        whiteSpace="normal"
                        textAlign="left"
                        color="#a4a4a4"
                      >
                        Everywhere
                      </Box>
                      <ChevronDownIcon
                        h={6}
                        w={8}
                        fontSize="20px"
                        fontWeight="400"
                        verticalAlign="middle"
                        lineHeight="20px"
                        color="#a4a4a4"
                        ml="2px"
                        mr="-4px"
                      />
                    </Flex>
                  }
                />
              </MenuButton>
              <MenuList
                backgroundColor={bg}
                color="#a4a4a4"
                borderRadius="10px"
                boxShadow="0 2px 4px 0 rgba(28 28 28 0.2)"
              >
                <MenuItem>United State</MenuItem>
                <MenuItem>United Kingdom</MenuItem>
                <MenuItem>Denmark</MenuItem>
                <MenuItem>Canada</MenuItem>
                <MenuItem>Brazil</MenuItem>
              </MenuList>
            </Menu>
            <Button
              padding="6px 8px"
              minH="unset"
              minW="unset"
              borderRadius="20px"
              bg="transparent"
              border="none"
              mr="8px"
              sx={{
                '@media (max-width: 640px)': {
                  display: 'none',
                },
              }}
              content={
                <Flex cursor="default" alignItems="center">
                  <Icon
                    as={TiStarburstOutline}
                    width={8}
                    height={8}
                    padding="0 8px 0 0"
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                  />
                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    lineHeight="18px"
                    maxHeight="64px"
                    whiteSpace="normal"
                    textAlign="left"
                    color="#a4a4a4"
                  >
                    New
                  </Box>
                </Flex>
              }
            />
            <Button
              padding="6px 8px"
              minH="unset"
              minW="unset"
              borderRadius="20px"
              bg="transparent"
              border="none"
              mr="8px"
              sx={{
                '@media (max-width: 640px)': {
                  display: 'none',
                },
              }}
              content={
                <Flex cursor="default" alignItems="center">
                  <Icon
                    as={BsBoxArrowUp}
                    width={8}
                    height={8}
                    padding="0 8px 0 0"
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                  />
                  <Box
                    overflow="hidden"
                    textOverflow="ellipsis"
                    lineHeight="18px"
                    maxHeight="64px"
                    whiteSpace="normal"
                    textAlign="left"
                    color="#a4a4a4"
                  >
                    Top
                  </Box>
                </Flex>
              }
            />
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              color="#a4a4a4"
              aria-label="Options"
              bg="transparent"
              borderRadius="99999px"
              outline="0"
              sx={{
                '@media (max-width: 640px)': {
                  display: 'none',
                },
              }}
              icon={
                <Icon
                  as={FiMoreHorizontal}
                  width={6}
                  height={8}
                  fontSize="20px"
                  lineHeight="20px"
                  color="#a4a4a4"
                />
              }
            />
            <MenuList color="#a4a4a4">
              <MenuItem icon={<Icon width={6} height={6} as={AiOutlineRise} />}>rising</MenuItem>
            </MenuList>
          </Menu>

          <Flex marginLeft="auto" alignItems="center" flexFlow="row nowrap">
            <Menu>
              <MenuButton>
                <Button
                  padding="6px 8px"
                  minH="unset"
                  minW="unset"
                  borderRadius="20px"
                  bg="transparent"
                  border="none"
                  content={
                    <Flex cursor="default" alignItems="center">
                      <Icon
                        as={
                          postStyle === 'card'
                            ? MdOutlineIndeterminateCheckBox
                            : postStyle === 'classic'
                            ? GiHamburgerMenu
                            : MdCompress
                        }
                        width={6}
                        height={6}
                        fontSize="20px"
                        lineHeight="20px"
                        color={iconColor}
                        mr="0"
                      />
                      <ChevronDownIcon
                        fontSize="20px"
                        fontWeight="400"
                        verticalAlign="middle"
                        lineHeight="20px"
                        color={iconColor}
                        mr="-4px"
                      />
                    </Flex>
                  }
                />
              </MenuButton>

              <MenuList
                backgroundColor={bg}
                boxShadow="0 2px 4px 0 rgba(28 28 28 0.2)"
                minWidth="52px"
                marginLeft="-9px"
                borderRadius="4px"
                zIndex="10"
                border="0.5 solid #a4a4a4"
                padding="0"
                margin="0"
              >
                <MenuItem
                  display="flex"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  borderTop="0.5px solid #edeff1"
                  borderbottom="none"
                  backgroundColor={postStyle === 'card' ? selected : bg}
                  outLine="none"
                  onClick={() => setPostStyle('card')}
                >
                  <Icon
                    as={MdOutlineIndeterminateCheckBox}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color={postStyle === 'card' && iconColor}
                    fill={postStyle === 'card' && iconColor}
                    mr="4px"
                  />
                  <Box
                    verticalAlign="baseline"
                    color={postStyle === 'card' && iconColor}
                    fontSize="inherit"
                  >
                    Card
                  </Box>
                </MenuItem>
                <MenuItem
                  display="flex"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  borderTop="0.5px solid #edeff1"
                  backgroundColor={postStyle === 'compact' ? selected : bg}
                  borderbottom="none"
                  outLine="none"
                  onClick={() => setPostStyle('compact')}
                >
                  <Icon
                    as={MdCompress}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color={postStyle === 'comapact' && iconColor}
                    fill={postStyle === 'comapact' && iconColor}
                    mr="4px"
                  />
                  <Box
                    verticalAlign="baseline"
                    color={postStyle === 'comapact' && iconColor}
                    fontSize="inherit"
                  >
                    Compact
                  </Box>
                </MenuItem>
                <MenuItem
                  display="flex"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="500"
                  lineHeight="18px"
                  padding="8px"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  borderTop="0.5px solid #edeff1"
                  backgroundColor={postStyle === 'classic' ? selected : bg}
                  borderbottom="none"
                  outLine="none"
                  onClick={() => setPostStyle('classic')}
                >
                  <Icon
                    as={GiHamburgerMenu}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color={postStyle === 'classic' && iconColor}
                    fill={postStyle === 'classic' && iconColor}
                    mr="4px"
                  />
                  <Box
                    verticalAlign="baseline"
                    color={postStyle === 'classic' && iconColor}
                    fontSize="inherit"
                  >
                    Classic
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Box minHeight="1000px" width="100%">
          <Post
            post={{
              title: 'Chainlink',
              details:
                "Chainlink is a decentralized blockchain oracle network built on Ethereum.[3][4] The network is intended to be used to facilitate the transfer of tamper-proof data from off-chain sources to on-chain smart contracts. Its creators claim it can be used to verify whether the parameters of a smart contract are met in a manner independent from any of the contract's stakeholders by connecting the contract directly to real-world data, events, payments, and other inputs",
            }}
          />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Box>
        <Button
          border="none"
          content="Load More"
          width="128px"
          bg="#a4a4a4"
          color={bg}
          fontSize="14px"
          fontWeight="700"
        />
      </Box>
      <SideBar bg={bg} />
    </Flex>
  );
};

export default Home;
