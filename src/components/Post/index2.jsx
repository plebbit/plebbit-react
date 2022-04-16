import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsChat, BsBookmark, BsEyeSlash, BsFlag, BsFileText } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { CgArrowsExpandLeft, CgCompressLeft } from 'react-icons/cg';
import { VscLinkExternal } from 'react-icons/vsc';

import { FiMoreHorizontal, FiExternalLink } from 'react-icons/fi';
import DropDown from '../../components/DropDown';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';

const Post = ({ type, post, mode = 'card', loading }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const inactiveSubTitle = useColorModeValue('lightText', 'darkText1');
  // const classicTitle = useColorModeValue('lightText1', 'darkText1');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const postTransBg = useColorModeValue('lightPostTransBg', 'darkPostTransBg');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const shadow = useColorModeValue('lightShadow', 'darkShadow2');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const [vote] = useState(+post?.upvoteCount - +post?.downvoteCount);
  const [voteMode, setVoteMode] = useState(0);
  const [showContent, setShowContent] = useState(false);
  return (
    <Box>
      <Box>
        {/* card */}
        {mode === 'card' && (
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
                  <Skeleton isLoaded={!loading} height="16px">
                    {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                  </Skeleton>
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
              {!post?.content ? (
                <>
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
                    <Skeleton mb="8px" isLoaded={!loading} height="16px">
                      <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                        <Flex
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          alignItems="center"
                          flexFlow="row wrap"
                        >
                          <Text color={misCol} flex="0 0 auto" mr="3px">
                            Posted by
                          </Text>
                          {/* User Badge */}{' '}
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
                    </Skeleton>
                  </Flex>{' '}
                  {/* Post Title */}
                  <Box margin="0 8px">
                    <Skeleton isLoaded={!loading} height="16px">
                      {' '}
                      {/* flair */}
                      {type === 'subPlebbit' ? (
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
                      ) : (
                        ''
                      )}
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
                      {type !== 'subPlebbit' ? (
                        <Tag
                          bg="rgb(113, 147, 255)"
                          borderRadius="20px"
                          padding="2px 8px"
                          size="sm"
                          fontSize="12px"
                          fontWeight="500"
                          lineHeight="16px"
                          ml="5px"
                          textOverflow="ellipsis"
                          overflow="hidden"
                          display="inline-block"
                          verticalAlign="text-bottom"
                        >
                          DISCUSSION
                        </Tag>
                      ) : (
                        ''
                      )}
                    </Skeleton>
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
                      <Skeleton mt="20px" isLoaded={!loading}>
                        <Box
                          color={voteColor}
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
                      </Skeleton>
                    </Box>
                  </Box>
                </>
              ) : (
                <Flex paddingBottom="8px">
                  <Flex
                    flexDir="column"
                    flex="1 1 100%"
                    paddingBottom="22px"
                    position="relative"
                    wordBreak="break-word"
                  >
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
                      <Skeleton mb="8px" isLoaded={!loading} height="8px">
                        <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                          <Flex
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                            alignItems="center"
                            flexFlow="row wrap"
                          >
                            <Text color={misCol} flex="0 0 auto" mr="3px">
                              Posted by
                            </Text>
                            {/* User Badge */}{' '}
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
                      </Skeleton>
                    </Flex>{' '}
                    {/* Post Title */}
                    <Box margin="0 8px">
                      <Skeleton mb="30px" isLoaded={!loading} height="16px">
                        {' '}
                        {/* flair */}
                        {type === 'subPlebbit' ? (
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
                        ) : (
                          ''
                        )}
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
                        {type !== 'subPlebbit' ? (
                          <Tag
                            bg="rgb(113, 147, 255)"
                            borderRadius="20px"
                            padding="2px 8px"
                            size="sm"
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="16px"
                            ml="5px"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            display="inline-block"
                            verticalAlign="text-bottom"
                          >
                            DISCUSSION
                          </Tag>
                        ) : (
                          ''
                        )}
                      </Skeleton>
                    </Box>
                    {/* Post url */}
                    <Flex mt="0">
                      <Link
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                        margin="4px 8px"
                        whiteSpace="nowrap"
                        color="mainBlue"
                        display="flex"
                        href="https://www.coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/"
                        alignItems="flex-end"
                      >
                        <Box>
                          {'coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/'.substring(
                            0,
                            20
                          ) + '...'}
                        </Box>
                        <Icon
                          as={FiExternalLink}
                          verticalAlign="middle"
                          fontWeight="400"
                          width="20px"
                          height="20px"
                          fontSize="12px"
                          paddingLeft="4px"
                        />
                      </Link>
                    </Flex>
                  </Flex>
                  <Flex
                    flex="0 0 144px"
                    height="108px"
                    alignItems="flex-end"
                    borderRadius="2px"
                    flexDir="column"
                    padding="0 8px"
                  >
                    <Box
                      borderRadius="4px"
                      flex="1"
                      height="100%"
                      width="100%"
                      overflow="hidden"
                      position="relative"
                      verticalAlign="bottom"
                    >
                      <Skeleton isLoaded={!loading}>
                        {' '}
                        <Link href="https://www.coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/">
                          <Image
                            borderColor="mainBlue"
                            border="1px solid #0079d3;"
                            src="https://picsum.photos/200"
                            width="100%"
                            height="100%"
                          />
                        </Link>
                      </Skeleton>
                    </Box>
                  </Flex>
                </Flex>
              )}
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
                      Award
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
        )}
        {/* classic */}
        {mode === 'classic' && (
          <Box
            color={iconColor}
            fill={iconColor}
            cursor="pointer"
            paddingLeft="40px"
            overflow="hidden"
            position="relative"
            border={`thin solid ${border1}`}
            zIndex="0"
            bg={postTransBg}
          >
            {/* Vote Bar */}
            <Skeleton isLoaded={!loading}>
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
                    <Skeleton isLoaded={!loading} height="16px">
                      {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                    </Skeleton>
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
            </Skeleton>

            <Box bg={mainBg} position="relative">
              <Flex position="relative" padding="8px 8px 0">
                {/* Post image */}
                <Flex flex="0 0 96px" height="72px" borderRadius="4px">
                  <Flex flex="0 0 96px" height="72px" borderRadius="4px" backgroundColor={shadow}>
                    <Box
                      borderRadius="4px"
                      flex="1"
                      height="100%"
                      overflow="hidden"
                      position="relative"
                      verticalAlign="bottom"
                    >
                      <Box
                        borderColor={border2}
                        backgroundImage="url(https://picsum.photos/200)"
                        transition="filter .5s"
                        height="72px"
                        width="96px"
                        border="none"
                        borderRadius="4px"
                        backgroundPosition="50% top"
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        flex="1"
                      >
                        {/* <Image alt="xxx" /> */}
                      </Box>
                    </Box>
                  </Flex>
                </Flex>

                {/* Post content */}
                <Box ml="8px" flex="1 1 100%" position="relative" wordBreak="break-word">
                  {/* post title */}
                  <Box margin="0 8px">
                    <Skeleton isLoaded={!loading}>
                      {' '}
                      {/* flair */}
                      {type === 'subPlebbit' ? (
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
                      ) : (
                        ''
                      )}
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
                        In the past 24 hours, $420.69 million longs were liquidated In the past 24
                        hours, $420.69 million longs were liquidated In the past 24 hours, $420.69
                        million longs were liquidated
                        {!post?.content ? (
                          <Link
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                            margin="4px 8px"
                            color="mainBlue"
                            href="https://www.coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/"
                          >
                            <span>
                              {'coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/'.substring(
                                0,
                                20
                              ) + '...'}
                            </span>
                            <Icon
                              as={FiExternalLink}
                              verticalAlign="middle"
                              fontWeight="400"
                              width="20px"
                              height="20px"
                              fontSize="12px"
                              paddingLeft="4px"
                            />
                          </Link>
                        ) : (
                          ''
                        )}
                      </Text>
                      {type !== 'subPlebbit' ? (
                        <Tag
                          bg="rgb(113, 147, 255)"
                          borderRadius="20px"
                          padding="2px 8px"
                          size="sm"
                          fontSize="12px"
                          fontWeight="500"
                          lineHeight="16px"
                          ml="5px"
                          textOverflow="ellipsis"
                          overflow="hidden"
                          display="inline-block"
                          verticalAlign="text-bottom"
                        >
                          DISCUSSION
                        </Tag>
                      ) : (
                        ''
                      )}
                    </Skeleton>
                  </Box>
                  {/* Post head */}
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    flexFlow="row nowrap"
                    alignItem="start"
                    margin="0 8px 8px"
                    position="relative"
                  >
                    <Skeleton mb="8px" isLoaded={!loading} height="16px">
                      <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                        <Flex
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          alignItems="center"
                          flexFlow="row wrap"
                        >
                          <Text color={misCol} flex="0 0 auto" mr="3px">
                            Posted by
                          </Text>
                          {/* User Badge */}{' '}
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
                    </Skeleton>
                  </Flex>
                  {/* Post footer */}
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
                      {post?.content ? (
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
                          onClick={() => setShowContent(!showContent)}
                        >
                          <Icon
                            as={showContent ? CgCompressLeft : CgArrowsExpandLeft}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                        </Flex>
                      ) : (
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
                            as={VscLinkExternal}
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                        </Flex>
                      )}
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
                          Award
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
                          as={BsEyeSlash}
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
                          Hide
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
                          as={BsFlag}
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
                          Report
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
              {showContent ? (
                <Box padding="5px 16px 5px 8px" maxWidth="800px">
                  <Box
                    color={voteColor}
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    wordBreak="break-word"
                    overflow="auto"
                    paddingBottom="1px"
                    marginBottom="-1px"
                  >
                    The Celsius news blocking regular Americans investors is terrible, but not
                    surprising you could sense they were tightening the screws because allowing
                    common folk to earn 7% on stables vs the 0.3% they get in banks is soooo risky.
                    Common folk can however invest happily, all their savings into IPOs like Didi...
                    Which is down a whopping 84% from its IPO The IPO which SEC's anti-poor hitman
                    Gary Gensler approved... You see, as long as you lose money, its all fun and
                    games. But when the average guys finds a way to make just a little more than
                    what the government allows them to make, they have to be shut down using the
                    entire force of the regulatoooors who want to protect you from earning more than
                    what banks allow you. The 7% rate offered by Celsius or Blockfi isnt even
                    inflation beating, in the era of {`>`} 8% CPI. But you cant earn that unless you
                    are accredited.
                  </Box>
                </Box>
              ) : (
                ''
              )}
            </Box>
          </Box>
        )}
        {/* compact */}
        {mode === 'compact' && (
          <Box
            color={iconColor}
            fill={iconColor}
            cursor="pointer"
            maxW="100%"
            overflow="hidden"
            bg={postTransBg}
            position="relative"
            border={`thin solid transparent`}
          >
            <Flex alignItems="normal">
              {/* vote Bar */}
              <Flex>
                <Flex
                  borderColor="transparent"
                  boxSizing="border-box"
                  borderLeftWidth="4px"
                  borderLeftStyle="solid"
                  flex="0 0 36px"
                >
                  <Flex alignItems="center" margin="0" padding="0 2px" mt="9px">
                    <Box
                      width="24px"
                      height="24px"
                      bg="transparent"
                      border="none"
                      color="inherit"
                      cursor="pointer"
                      padding="initial"
                      textAlign="center"
                    >
                      <Box
                        borderRadius="2px"
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
                      margin="0 1px"
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="15px"
                      pointerEvents="none"
                      wordBreak="normal"
                      textAlign="center"
                      width="32px"
                    >
                      <Skeleton isLoaded={!loading} height="16px">
                        {vote + voteMode === 0 ? 'vote' : vote + voteMode}
                      </Skeleton>
                    </Box>
                    <Box
                      textAlign="center"
                      width="24px"
                      height="24px"
                      bg="transparent"
                      border="none"
                      color="inherit"
                      cursor="pointer"
                      padding="initial"
                    >
                      <Box
                        borderRadius="2px"
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
              </Flex>
              <Box
                bg={mainBg}
                borderLeft={`1px solid ${border2}`}
                flex="1 1 auto"
                minW="0"
                padding="3px 0"
                position="relative"
              >
                <Flex alignItems="center">
                  {!post?.content ? (
                    <Link
                      display="flex"
                      flex="0 0 36px"
                      margin="0 8px"
                      alignSelf="flex-start"
                      alignItems="center"
                      borderRadius="2px"
                      justifyContent="center"
                      height="36px"
                      width="36px"
                      _hover={{
                        bg: iconBg,
                      }}
                      onClick={() => setShowContent(!showContent)}
                    >
                      <Icon
                        as={showContent ? CgCompressLeft : CgArrowsExpandLeft}
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    </Link>
                  ) : (
                    <Box
                      display="flex"
                      flex="0 0 36px"
                      margin="0 8px"
                      alignSelf="flex-start"
                      alignItems="center"
                      borderRadius="2px"
                      justifyContent="center"
                      height="36px"
                      width="36px"
                      _hover={{
                        bg: iconBg,
                      }}
                    >
                      <Icon
                        as={BsFileText}
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    </Box>
                  )}
                  <Box flex="1 1 100%" mt="2px" minW="150px" overflow="hidden" wordWrap="brak-word">
                    {/* post title */}
                    <Box margin="0 8px">
                      <Skeleton isLoaded={!loading}>
                        {' '}
                        {/* flair */}
                        {type === 'subPlebbit' ? (
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
                        ) : (
                          ''
                        )}
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
                          {!post?.content ? (
                            <Link
                              fontSize="12px"
                              fontWeight="400"
                              lineHeight="16px"
                              margin="4px 8px"
                              color="mainBlue"
                              href="https://www.coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/"
                            >
                              <span>
                                {'coindesk.com/business/2022/04/13/jack-dorseys-first-tweet-nft-went-on-sale-for-48m-it-ended-with-a-top-bid-of-just-280/'.substring(
                                  0,
                                  20
                                ) + '...'}
                              </span>
                              <Icon
                                as={FiExternalLink}
                                verticalAlign="middle"
                                fontWeight="400"
                                width="20px"
                                height="20px"
                                fontSize="12px"
                                paddingLeft="4px"
                              />
                            </Link>
                          ) : (
                            ''
                          )}
                        </Text>
                        {type !== 'subPlebbit' ? (
                          <Tag
                            bg="rgb(113, 147, 255)"
                            borderRadius="20px"
                            padding="2px 8px"
                            size="sm"
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="16px"
                            ml="5px"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            display="inline-block"
                            verticalAlign="text-bottom"
                          >
                            DISCUSSION
                          </Tag>
                        ) : (
                          ''
                        )}
                      </Skeleton>
                    </Box>
                    {/* Post head */}
                    <Flex
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      flexFlow="row nowrap"
                      alignItem="start"
                      margin="0 8px 8px"
                      position="relative"
                    >
                      <Skeleton mb="8px" isLoaded={!loading} height="16px">
                        <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                          <Flex
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                            alignItems="center"
                            flexFlow="row wrap"
                          >
                            <Text color={misCol} flex="0 0 auto" mr="3px">
                              Posted by
                            </Text>
                            {/* User Badge */}{' '}
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
                      </Skeleton>
                    </Flex>
                  </Box>
                  <Flex
                    alignItems="center"
                    flex="0 0 72px"
                    justifyContent="flex-end"
                    height="100%"
                    ml="4px"
                    paddingRight="4px"
                  >
                    <Link
                      width="60px"
                      borderRadius="2px"
                      fontSize="12px"
                      fontWeight="700"
                      linneHeight="16px"
                      padding="4px"
                      boxSizing="border-box"
                      _hover={{
                        bg: inputBg,
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
                      <span>326</span>
                    </Link>
                    <Box>
                      <Box
                        borderRadius="2px"
                        height="24px"
                        display="inline-block"
                        verticalAlign="middle"
                        cursor="pointer"
                        lineHeight="0"
                        padding="0 4px"
                        width="100%"
                        bg="transparent"
                        border="none"
                        color="inherit"
                        _hover={{
                          bg: inputBg,
                        }}
                      >
                        <Icon alignSelf="middle" as={FiMoreHorizontal} width="20px" height="20px" />
                      </Box>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            {showContent ? (
              <Box bg={mainBg} height="100%">
                <Box padding="5px 16px 5px 8px" maxWidth="800px">
                  <Box
                    color={voteColor}
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    wordBreak="break-word"
                    overflow="auto"
                    paddingBottom="1px"
                    marginBottom="-1px"
                  >
                    The Celsius news blocking regular Americans investors is terrible, but not
                    surprising you could sense they were tightening the screws because allowing
                    common folk to earn 7% on stables vs the 0.3% they get in banks is soooo risky.
                    Common folk can however invest happily, all their savings into IPOs like Didi...
                    Which is down a whopping 84% from its IPO The IPO which SEC's anti-poor hitman
                    Gary Gensler approved... You see, as long as you lose money, its all fun and
                    games. But when the average guys finds a way to make just a little more than
                    what the government allows them to make, they have to be shut down using the
                    entire force of the regulatoooors who want to protect you from earning more than
                    what banks allow you. The 7% rate offered by Celsius or Blockfi isnt even
                    inflation beating, in the era of {`>`} 8% CPI. But you cant earn that unless you
                    are accredited.
                  </Box>
                </Box>
              </Box>
            ) : (
              ''
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Post;
