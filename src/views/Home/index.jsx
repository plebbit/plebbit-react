import React from 'react';
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
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import SideBar from './sideBar';
import { FaFire } from 'react-icons/fa';
import { AiOutlineRise } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TiStarburstOutline } from 'react-icons/ti';
import { BsBoxArrowUp } from 'react-icons/bs';
import { MdOutlineIndeterminateCheckBox, MdCompress, MdNotes } from 'react-icons/md';
import Button from '../../components/Button';
import Post from './Post/post';
const Home = () => {
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');

  return (
    <>
      <Box
        width="640px"
        sx={{
          '@media (max-width: 640px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
        <Box
          pb="10px"
          fontSize="14px"
          textTransform="unset"
          lineHeight="18px"
          color="#878A8c"
          position="relative"
        >
          Popular posts
        </Box>
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
          <Flex alignItems="center" cursor="pointer" width="100%">
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

            <Menu matchWidth>
              <MenuButton>
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
                boxShadow="0 2px 4px 0 rgba(28 28 28 0.2)"
                overflowY="scroll"
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
            <MenuList>
              <MenuItem
                icon={
                  <Icon
                    as={AiOutlineRise}
                    width={8}
                    height={8}
                    padding="0 0 8px 0"
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                  />
                }
              >
                rising
              </MenuItem>
            </MenuList>
          </Menu>

          <Flex marginLeft="auto">
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
                        as={MdOutlineIndeterminateCheckBox}
                        width={6}
                        height={6}
                        fontSize="20px"
                        lineHeight="20px"
                        color="#a4a4a4"
                        mr="0"
                      />
                      <ChevronDownIcon
                        fontSize="20px"
                        fontWeight="400"
                        verticalAlign="middle"
                        lineHeight="20px"
                        color="#a4a4a4"
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
                  outLine="none"
                >
                  <Icon
                    as={MdOutlineIndeterminateCheckBox}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                    fill="#a4a4a4"
                    mr="4px"
                  />
                  <Box verticalAlign="baseline" fontSize="inherit">
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
                  borderbottom="none"
                  outLine="none"
                >
                  <Icon
                    as={MdCompress}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                    fill="#a4a4a4"
                    mr="4px"
                  />
                  <Box verticalAlign="baseline" fontSize="inherit">
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
                  borderbottom="none"
                  outLine="none"
                >
                  <Icon
                    as={MdNotes}
                    width={6}
                    height={6}
                    fontSize="20px"
                    lineHeight="20px"
                    color="#a4a4a4"
                    fill="#a4a4a4"
                    mr="4px"
                  />
                  <Box verticalAlign="baseline" fontSize="inherit">
                    Classic
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Box minHeight="1000px" width="100%">
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
      <SideBar />
    </>
  );
};

export default Home;
