import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import Button from '../../components/Button';
import { FaBell } from 'react-icons/fa';
import { RiFireFill } from 'react-icons/ri';
import { TiStarburstOutline } from 'react-icons/ti';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsBoxArrowUp, BsChat, BsBookmark, BsEyeSlash } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';

import {
  MdOutlineViewStream,
  MdViewAgenda,
  MdOutlineTableRows,
  MdOutlineViewHeadline,
} from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { LinkIcon } from '@chakra-ui/icons';
import DropDown from '../../components/DropDown';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';

const SubPlebbit = ({ post }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const subPlebbitBorder = useColorModeValue('borderLight1', 'borderDark1');
  const inactiveSubTitle = useColorModeValue('lightText1', 'darkText1');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputText = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const activeFilterText = useColorModeValue('lightText', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const postTransBg = useColorModeValue('lightPostTransBg', 'darkPostTransBg');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const [vote] = useState(+post?.upvoteCount - +post?.downvoteCount);
  const [voteMode, setVoteMode] = useState(0);

  return (
    <Box width="100%">
      <Box
        minW="260px"
        margin="0 auto"
        padding="8px 16px"
        height="145px"
        background={`url("https://styles.redditmedia.com/t5_2wlj3/styles/bannerBackgroundImage_bx1bi0qmmcg61.jpg?width=4000&format=pjpg&s=8fbb510f1bae6b0fdd98d075458022e98e4910f4") center center / cover no-repeat rgb(55, 60, 63)`}
      />
      <Box bg={mainBg} display="block" width="100%">
        <Flex
          maxWidth="984px"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="space-between"
          margin="0 auto"
          padding="0 16px 0 24px"
        >
          <Flex marginTop="-14px" marginBottom="12px" alignItems="flex-start">
            <Image
              src="https://styles.redditmedia.com/t5_2wlj3/styles/communityIcon_7jxh2j4ouky41.png?width=256&s=59ea46d93492e9d0951b43d7c580f72982a86974"
              backgroundColor="#fff"
              backgroundSize="cover"
              borderRadius="100%"
              border="4px solid #fff"
              display="inline-block"
              height="76px"
              width="76px"
            />
            <Flex
              boxSizing="border-box"
              alignContent="flex-start"
              flex="1"
              paddingLeft="16px"
              marginTop="24px"
              justifyContent="space-between"
              width="calc(100% - 80px)"
            >
              <Box paddingRight="24px" box-sizing="border-box">
                <Text
                  flex="1"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="32px"
                  overflow="hidden"
                  padding="0 2px 4px 0"
                  width="100%"
                  text-overflow="ellipsis"
                >
                  Cryptocurrency News & Discussion
                </Text>
                <Text fontSize="14px" fontWeight="500" lineHeight="18px" color={subPlebbitSubTitle}>
                  p/CryptoCurrency
                </Text>
              </Box>
              <Flex>
                <Box width="96px">
                  <Button
                    bg="transparent"
                    content="Joined"
                    padding="4px 16px"
                    minW="32px"
                    minH="32px"
                  />
                </Box>
                <Box>
                  <Button
                    content={<Icon verticalAlign="middle" width="20px" height="20px" as={FaBell} />}
                    padding="5px"
                    borderRadius="100%"
                    height="32px"
                    width="33px"
                    bg="transparent"
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box bg="inherit">
            <Flex
              mb="2px"
              maxW="1200px"
              minW="260px"
              alignItems="center"
              color={subPlebbitSubTitle}
            >
              <Box
                borderBottom={`3px solid`}
                borderColor={subPlebbitBorder}
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Posts
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="700"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                color={inactiveSubTitle}
              >
                Polls
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
                display="flex"
                alignItems="center"
              >
                Prediction
                <Tag
                  fontSize="10px"
                  padding="1px 4px"
                  bg="#ea0027"
                  borderRadius="full"
                  fontWeight="700"
                  color="#fff"
                  ml="4px"
                  lineHeight="12px"
                  textTransform="uppercase"
                  size="small"
                >
                  live
                </Tag>
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Plebbit Talk
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Our Network
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Wiki
              </Box>
              <Box
                paddingBottom="1px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                margin="0 5px"
                paddingLeft="8px"
                paddingRight="8px"
                paddingTop="4px"
              >
                Official Discord
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
        <Box width="640px" minWidth="0">
          {/* Create Post Bar */}
          <Flex
            bg={mainBg}
            borderRadius="4px"
            border={`1px solid ${border1}`}
            mb="16px"
            padding="8px"
          >
            <Box
              border="1px solid"
              borderColor={border2}
              flexBasis="38px"
              mr="8px"
              borderRadius="50%"
              width="38px"
              height="38px"
            >
              <Box position="relative">
                <Box borderRadius="50%" width="38px" height="38px" position="relative">
                  <Box width="100%" height="100%" borderRadius="50%" bg={border2} />
                  <Box width="100%" position="absolute" bottom="0">
                    <Image
                      src={`https://robohash.org/${Math.round(
                        Math.random() * (5 - 1 + 1) + 1
                      )}?set=set${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`}
                      width="100%"
                      transformOrigin="bottom center"
                      display="block"
                      transform="scale(1.3)"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Input
              placeholder="Create Post"
              bg={inputBg}
              border={`1px solid ${border2}`}
              boxShadow="none"
              boxSizing="border-box"
              color={inputText}
              display="block"
              flexGrow="1"
              height="38px"
              mr="8px"
              outline="none"
              padding="0 16px"
              fontSize="14px"
              lineHeight="21px"
              fontWeight="400"
              fonrFamily="inherit"
            />
            <Box
              borderRadius="4px"
              position="relative"
              border="1px solid transparent"
              color={iconColor}
              fill={iconColor}
              _hover={{
                background: inputBg,
              }}
              minH="40px"
              minW="40px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="auto"
            >
              <LinkIcon height="20px" width="20px" />
            </Box>
          </Flex>
          {/* feed filter bar */}
          <Flex
            alignItems="center"
            bg={mainBg}
            border={`1px solid ${border2}`}
            borderRadius="4px"
            flexFlow="nowrap"
            justifyContent="flex-start"
            mb="16px"
            padding="10px 12px"
          >
            <Flex alignItems="center" cursor="pointer">
              <Box
                bg={inputBg}
                color={activeFilterText}
                cursor="default"
                fill={activeFilterText}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
              >
                <Icon width="20px" mr="8px" height="20px" as={RiFireFill} />
                Hot
              </Box>
              <Box
                bg="transparent"
                color={iconColor}
                cursor="default"
                fill={iconColor}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon width="20px" mr="8px" height="20px" as={TiStarburstOutline} />
                New
              </Box>
              <Box
                bg="transparent"
                color={iconColor}
                cursor="default"
                fill={iconColor}
                mr="8px"
                textTransform="capitalize"
                position="relative"
                border="1px solid transparent"
                minH="unset"
                minW="unset"
                padding="6px 8px"
                borderRadius="20px"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="unset"
                lineHeight="17px"
                width="auto"
                display="flex"
                alignItems="center"
                _hover={{
                  background: inputBg,
                }}
              >
                <Icon width="20px" mr="8px" height="20px" as={BsBoxArrowUp} />
                Top
              </Box>
            </Flex>
            <Flex alignItems="center" cursor="pointer" display="flex">
              <Flex alignItems="center" borderRadius="4px">
                <Box
                  borderRadius="20px"
                  color={iconColor}
                  outLine="none"
                  padding="8px"
                  bg="transparent"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  _hover={{
                    background: inputBg,
                  }}
                >
                  <Icon as={FiMoreHorizontal} width="20px" height="20px" />
                </Box>
              </Flex>
            </Flex>
            <DropDown
              caret
              inputBg={inputBg}
              dropDownTitle={
                <>
                  {' '}
                  <Flex color={iconColor} alignItems="center">
                    <Icon as={MdOutlineViewStream} height={6} width={6} />
                  </Flex>
                </>
              }
              content={
                <>
                  {' '}
                  <Flex
                    color={activeFilterText}
                    fill={activeFilterText}
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                  >
                    <Icon mr="4px" as={MdViewAgenda} width={6} height={6} />
                    <Box>Card</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                    borderTop={`1px solid ${border2}`}
                  >
                    <Icon mr="4px" as={MdOutlineTableRows} width={6} height={6} />
                    <Box>Classic</Box>
                  </Flex>
                  <Flex
                    alignItems="center"
                    position="relative"
                    outline="none"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    padding="8px"
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                    _hover={{
                      background: inputBg,
                    }}
                    borderTop={`1px solid ${border2}`}
                  >
                    <Icon mr="4px" as={MdOutlineViewHeadline} width={6} height={6} />
                    <Box>Compact</Box>
                  </Flex>
                </>
              }
            />
          </Flex>
          {/* feed list */}
          <Box minH="1000px" width="100%">
            <Box>
              <Box>
                <Box
                  borderRadius="4px"
                  paddingLeft="40px"
                  cursor="pointer"
                  transition="color .5s,fill .5s,box-shadow .5s"
                  mb="10px"
                  overflow="hidden"
                  border={`1px solid ${border1}`}
                  bg={postTransBg}
                  color={iconColor}
                  position="relative"
                >
                  {/* Vote Bar */}
                  <Flex
                    width="40px"
                    borderLeft="4px solid transparent"
                    alignItems="center"
                    boxSizing="border-box"
                    flexDir="column"
                    left="0"
                    padding="8px 4px 8px 0"
                    position="absolute"
                    top="0"
                  >
                    <Flex flexDir="column" alignItems="center" fill="inherit">
                      <Box
                        width="24px"
                        height="24px"
                        bg="transparent"
                        border="none"
                        color="inherit"
                        cursor="pointer"
                        padding="inherit"
                      >
                        <Box
                          border="2px solid transparent"
                          cursor="pointer"
                          display="inline-block"
                          overflow="hidden"
                          h="24px"
                          w="24px"
                          fontSize="16px"
                          lineHeight="24px"
                          _hover={{
                            bg: iconBg,
                            color: 'upvoteOrange',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === 1 ? 0 : 1);
                          }}
                          color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                        >
                          <Icon
                            width="20px"
                            height="20px"
                            fontSize="20px"
                            fontWeight="400"
                            as={voteMode === 1 ? ImArrowUp : BiUpvote}
                          />
                        </Box>
                      </Box>
                      <Box
                        color={voteColor}
                        margin="4px 0"
                        fontSize="12px"
                        fontWeight="700"
                        lineHeight="16px"
                        pointerEvents="none"
                        wordBreak="normal"
                      >
                        {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                      </Box>
                      <Box
                        width="24px"
                        height="24px"
                        bg="transparent"
                        border="none"
                        color="inherit"
                        cursor="pointer"
                        padding="inherit"
                      >
                        <Box
                          border="2px solid transparent"
                          cursor="pointer"
                          color={voteMode === -1 ? 'downvoteBlue' : iconColor}
                          display="inline-block"
                          overflow="hidden"
                          h="24px"
                          w="24px"
                          fontSize="16px"
                          lineHeight="24px"
                          _hover={{
                            bg: iconBg,
                            color: 'downvoteBlue',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === -1 ? 0 : -1);
                          }}
                        >
                          <Icon
                            width="20px"
                            height="20px"
                            fontSize="20px"
                            fontWeight="400"
                            as={voteMode === -1 ? ImArrowDown : BiDownvote}
                          />
                        </Box>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box bg={mainBg} position="relative" paddingTop="8px">
                    {/* Post Head */}
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      flexFlow="row nowrap"
                      alignItem="start"
                      margin="0 8px 8px"
                      position="relative"
                    >
                      <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                        <Flex
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          alignItems="center"
                        >
                          <Text color={misCol} flex="0 0 auto" mr="3px">
                            Posted by
                          </Text>
                          {/* User Badge */}
                          <Flex
                            alignItems="center"
                            display="inline-flex"
                            justifyContent="center"
                            verticalAlign="middle"
                            mr="4px"
                          >
                            <Image
                              h="24px"
                              verticalAlign="middle"
                              src="https://picsum.photos/200?random=1"
                            />
                          </Flex>
                          <Flex
                            alignItems="center"
                            display="inline-flex"
                            justifyContent="center"
                            verticalAlign="middle"
                            mr="4px"
                          >
                            <Image
                              h="24px"
                              verticalAlign="middle"
                              src="https://picsum.photos/200?random=2"
                            />
                          </Flex>
                          {/* User Name */}
                          <Box display="inline-block" flex="0 0 auto">
                            <Box>
                              <Text
                                _hover={{
                                  textDecoration: 'underline',
                                }}
                                color={misCol}
                                fontWeight="700"
                                mr="3px"
                                textDecor="none"
                                fontSize="12px"
                                lineHeight="16px"
                              >
                                u/Abydin1973
                              </Text>
                            </Box>
                          </Box>
                          {/* status */}
                          <Box display="inline" verticalAlign="text-top">
                            <Text
                              bg={statusBg}
                              color={statusColor}
                              fontSize="12px"
                              fontWeight="500"
                              lineHeight="16px"
                              borderRadius="2px"
                              display="inline-block"
                              mr="5px"
                              overflow="hidden"
                              isTruncated
                              padding="0 4px"
                            >
                              texting Text
                            </Text>
                          </Box>
                          {/* tips */}
                          <Tooltip
                            fontSize="10px"
                            label="Tip Abydin1973 with Moons"
                            aria-label="tip tooltip"
                          >
                            <Flex
                              cursor="pointer"
                              alignItems="center"
                              display="inline-flex"
                              margin="-2px 0 0 4px"
                              verticalAlign="middle"
                            >
                              <Icon
                                color={iconColor}
                                as={RiCopperCoinLine}
                                height="16px"
                                width="16px"
                                _hover={{
                                  color: '#cc3700',
                                }}
                              />
                              <Text
                                fontSize="12px"
                                fontWeight="400"
                                lineHeight="16px"
                                color={subPlebbitSubTitle}
                                ml="5px"
                                _hover={{
                                  textDecoration: 'underline',
                                }}
                              >
                                3.2k
                              </Text>
                              <Box
                                verticalAlign="middle"
                                color={subPlebbitSubTitle}
                                fontSize="6px"
                                lineHeight="20px"
                                margin="0 4px"
                              >
                                •
                              </Box>
                            </Flex>
                          </Tooltip>
                          {/* date/time */}
                          <Tooltip
                            fontSize="10px"
                            label="Mon Apr 11, 2022 12:00:00 AM GMT-04:00"
                            aria-label="date tooltip"
                            placement="top"
                          >
                            <Text
                              color={misCol}
                              mr="3px"
                              textDecor="none"
                              display="inline-block"
                              flex="0 0 auto"
                            >
                              2 days ago
                            </Text>
                          </Tooltip>
                        </Flex>
                      </Flex>
                    </Flex>
                    {/* Post Title */}
                    <Box margin="0 8px">
                      {/* flair */}
                      <Tag
                        bg="rgb(113, 147, 255)"
                        borderRadius="20px"
                        padding="2px 8px"
                        size="sm"
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="16px"
                        mr="5px"
                        ml="0"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        display="inline-block"
                        verticalAlign="text-bottom"
                      >
                        DISCUSSION
                      </Tag>

                      <Text
                        display="inline"
                        color={inactiveSubTitle}
                        fontSize="18px"
                        fontWeight="500"
                        lineHeight="22px"
                        paddingRight="5px"
                        wordWrap="break-word"
                        textDecor="none"
                        wordBreak="break-word"
                      >
                        In the past 24 hours, $420.69 million longs were liquidated
                      </Text>
                    </Box>
                    {/* Post Body */}
                    <Box mt="8px">
                      <Box
                        maxH="250px"
                        overflow="hidden"
                        padding="5px 8px 10px"
                        sx={{
                          maskImage: 'linear-gradient(180deg, #000 60%, transparent)',
                        }}
                      >
                        <Box
                          colot={voteColor}
                          fontFamily="Noto sans, Arial, sans-serif"
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          wordBreak="break-word"
                          paddingBottom="1px"
                          marginBottom="-1px"
                        >
                          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum. tempor incididunt ut labore et dolore magna aliqua. Ut enim
                          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                          mollit anim id est laborum. est laborum. tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum. mollit anim id est
                          laborum. est laborum. tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                          mollit anim id est laborum.
                        </Box>
                      </Box>
                    </Box>
                    {/* Post Footer */}
                    <Flex alignItems="center" height="40px" paddingRight="10px" overflowY="visible">
                      <Flex
                        fontSize="12px"
                        fontWeight="700"
                        lineHeight="16px"
                        alignItems="stretch"
                        overflow="hidden"
                        padding="0 8px 0 4px"
                        flexGrow="1"
                      >
                        <Flex
                          padding="8px"
                          wordBreak="normal"
                          mr="4px"
                          alignItems="center"
                          borderRadius="2px"
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          boxSizing="border-box"
                          _hover={{
                            backgroundColor: inputBg,
                          }}
                        >
                          <Icon
                            as={BsChat}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={1}
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            238 comments
                          </Text>
                        </Flex>
                        <Flex
                          padding="8px"
                          wordBreak="normal"
                          mr="4px"
                          alignItems="center"
                          borderRadius="2px"
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          boxSizing="border-box"
                          _hover={{
                            backgroundColor: inputBg,
                          }}
                        >
                          <Icon
                            as={GoGift}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={1}
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Awards
                          </Text>
                        </Flex>
                        <Flex
                          padding="8px"
                          wordBreak="normal"
                          mr="4px"
                          alignItems="center"
                          borderRadius="2px"
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          boxSizing="border-box"
                          _hover={{
                            backgroundColor: inputBg,
                          }}
                        >
                          <Icon
                            as={FaShare}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={1}
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Share
                          </Text>
                        </Flex>
                        <Flex
                          padding="8px"
                          wordBreak="normal"
                          mr="4px"
                          alignItems="center"
                          borderRadius="2px"
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          boxSizing="border-box"
                          _hover={{
                            backgroundColor: inputBg,
                          }}
                        >
                          <Icon
                            as={BsBookmark}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={1}
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Save
                          </Text>
                        </Flex>
                        <Flex justifyContent="center">
                          <DropDown
                            dropDownTitle={
                              <Flex
                                borderRadius="2px"
                                height="24px"
                                verticalAlign="middle"
                                padding="0 4px"
                                width="100%"
                                bg="transparent"
                                border="none"
                                alignItems="center"
                                _hover={{
                                  backgroundColor: inputBg,
                                }}
                              >
                                <Icon as={FiMoreHorizontal} color={iconColor} h="20px" w="20px" />
                              </Flex>
                            }
                            options={[{ label: 'Hide', icon: BsEyeSlash, id: Math.random() }]}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* side bar */}
        <Box
          width="312px"
          flex="0 0 312px"
          display="none"
          ml="24px"
          margin="0"
          sx={{
            '@media (min-width: 960px)': {
              display: 'block',
            },
          }}
        ></Box>
      </Flex>
    </Box>
  );
};

export default SubPlebbit;
