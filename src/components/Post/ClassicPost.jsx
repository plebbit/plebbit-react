import React, { useContext } from 'react';

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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsChat, BsBookmark, BsEyeSlash, BsFlag, BsFileText } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { CgArrowsExpandLeft, CgCompressLeft } from 'react-icons/cg';
import { VscLinkExternal } from 'react-icons/vsc';
import { FiExternalLink, FiMoreHorizontal, FiShare } from 'react-icons/fi';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import fromNow from '../../utils/formatDate';
import numFormatter from '../../utils/numberFormater';
import getUserName from '../../utils/getUserName';
import { ProfileContext } from '../../store/profileContext';
import DropDown from '../DropDown';
import Marked from '../Editor/marked';
import Avatar from '../Avatar';

const ClassicPost = ({
  loading,
  setVoteMode,
  voteMode,
  handleVote,
  vote,
  post,
  type,
  showContent,
  setShowContent,
  setCopied,
  location,
  copied,
  detail,
  isOnline,
  subPlebbit,
}) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const inactiveSubTitle = useColorModeValue('lightText', 'darkText1');
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
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mobileMainColor = useColorModeValue('lightMobileText', 'darkMobileText');
  const mainMobileBg = useColorModeValue('white', 'black');
  const postHeadColor = useColorModeValue('#1a1a1b', '#0079d3');
  const mobileIconColor = useColorModeValue('lightMobileIcon2', 'darkMobileIcon');
  const { device } = useContext(ProfileContext);
  const history = useHistory();

  return (
    <>
      {device !== 'mobile' ? (
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
                      handleVote(voteMode === 1 ? 0 : 1);
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
                  <Skeleton isLoaded={!loading}>
                    {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
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
                      handleVote(voteMode === -1 ? 0 : -1);
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
                    {post?.content ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="100%"
                      >
                        <Icon as={BsFileText} h="20px" w="20px" alignSelf="center" />
                      </Box>
                    ) : (
                      <Box
                        borderColor={border2}
                        backgroundImage={`url(${post?.link})`}
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
                        {/* <Image fallbackSrc='https://via.placeholder.com/150' alt="xxx" /> */}
                      </Box>
                    )}
                  </Box>
                </Flex>
              </Flex>

              {/* Post content */}
              <Box ml="8px" flex="1 1 100%" position="relative" wordBreak="break-word">
                {/* post title */}
                <Box
                  margin="0 8px"
                  onClick={() => history.push(`/p/${post?.subplebbitAddress}/c/${post?.cid}`, [])}
                >
                  <Skeleton isLoaded={!loading}>
                    {' '}
                    {/* flair */}
                    {type === 'subPlebbit' && post?.flair?.text ? (
                      <Tag
                        bg={post?.flair?.color}
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
                        {post?.flair?.text}
                      </Tag>
                    ) : (
                      ''
                    )}
                    <Text
                      display="inline"
                      color={inactiveSubTitle}
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      paddingRight="5px"
                      textDecor="none"
                      wordBreak="break-word"
                    >
                      {post?.title}
                      {!post?.content ? (
                        <Link
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          margin="4px 8px"
                          color="mainBlue"
                          href={post?.link}
                        >
                          <span>{post?.link.substring(0, 20) + '...'}</span>
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
                    {type !== 'subPlebbit' && post?.flair?.text ? (
                      <Tag
                        bg={post?.flair?.color}
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
                        {post?.flair?.text}
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
                  alignItems="start"
                  margin="0 8px 8px"
                  position="relative"
                >
                  <Skeleton mb="8px" isLoaded={!loading}>
                    <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                      <Flex
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                        alignItems="center"
                        flexFlow="row wrap"
                      >
                        <Avatar width={24} height={24} mr="8px" badge isOnline={isOnline} />
                        <Link
                          as={ReactLink}
                          to={`/p/${post?.subplebbitAddress}`}
                          color={subPledditTextColor}
                          fontSize="12px"
                          fontWeight="700"
                          display="inline"
                          lineHeight="20px"
                          textDecoration="none"
                          mr="5px"
                        >
                          {`p/${post?.subplebbitAddress}`}
                        </Link>
                        <Text color={misCol} flex="0 0 auto" mr="3px">
                          Posted by
                        </Text>

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
                              {getUserName(post?.author)}
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
                          label={`Tip ${post?.author?.displayName} with Moons`}
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
                          label={post?.timestamp * 1000}
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
                            {fromNow(parseInt(post?.timestamp * 1000))}
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
                        {post?.replyCount} comments
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
                    <CopyToClipboard
                      text={location}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 3000);
                      }}
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
                          {copied ? 'copied' : 'Share'}
                        </Text>
                      </Flex>
                    </CopyToClipboard>
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
                  <Marked content={post?.content} />
                </Box>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <Box position="relative" bg={mainMobileBg}>
            {/* Background link */}
            <Link
              href={`#/p/${post?.subplebbitAddress}/c/${post?.cid}`}
              bottom="0"
              left="0"
              pointerEvents="all"
              position="absolute"
              right="0"
              top="0"
            />
            {/*Header */}
            <Box pointerEvents="none" position="relative">
              <Box paddingTop="0">
                <Flex alignItems="center">
                  <Box
                    color="#a5a4a4"
                    maxW="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    position="relative"
                    verticalAlign="middle"
                    flex="1 0"
                    _after={{
                      background: 'linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 70%)',
                      content: `""`,
                      top: '0',
                      right: '0',
                      bottom: '0',
                      width: '3em',
                    }}
                  >
                    <Box
                      color="#798389"
                      fontSize="14px"
                      lineHeight="18px"
                      paddingBottom="4px"
                      overflow="hidden"
                      paddingRight="3em"
                      padding="8px 16px"
                    >
                      <Flex alignItems="center">
                        <Flex
                          alignItems="center"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={postHeadColor}
                        >
                          <Avatar
                            avatar={subPlebbit?.avatar}
                            width={24}
                            height={24}
                            mr="8px"
                            badge
                            isOnline={isOnline}
                          />
                          <Skeleton isLoaded={!loading}>{`p/${post?.subplebbitAddress}`}</Skeleton>
                        </Flex>
                        <Box
                          _after={{
                            color: '#818384',
                            content: `"•"`,
                            margin: '0 4px',
                            position: 'relative',
                            top: '-1px',
                            verticalAlign: 'middle',
                          }}
                          fontSize="14px"
                          lineHeight="18px"
                          color="#798389"
                        />
                        <Box>
                          <Skeleton isLoaded={!loading}>{fromNow(post?.timestamp * 1000)}</Skeleton>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box padding="0" flex="0 0 auto" whiteSpace="nowrap" />
                  <DropDown
                    leftOffset="-40px"
                    dropDownTitle={
                      <Box
                        pointerEvents="all"
                        color="#565758"
                        padding="8px 16px 8px 12px"
                        verticalAlign="middle"
                      >
                        <Icon as={FiMoreHorizontal} verticalAlign="inherit" height={5} w={5} />
                      </Box>
                    }
                    options={[
                      {
                        label: 'Hide',
                        icon: BsEyeSlash,
                        id: Math.random(),
                      },
                      {
                        label: 'Report',
                        icon: BsFlag,
                        id: Math.random(),
                      },
                    ]}
                  />
                </Flex>
                {post?.link ? (
                  <Flex
                    justifyContent="space-between"
                    pointerEvents="none"
                    alignItems="flex-start"
                    flexFlow="row nowrap"
                    padding="0 16px"
                  >
                    <Box overflow="hidden" overflowWrap="break-word">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="19px"
                        padding="2px 0"
                        color="#a5a4a4"
                      >
                        {post?.title}
                      </Box>
                    </Box>
                    <Box margin="0 0 16px">
                      <Box position="relative" marginX="0">
                        <Link href={post?.link}>
                          <Box width="70px" height="52px" pointerEvent="all">
                            <Image
                              fallbackSrc={require('../../assets/images/fallback.png')}
                              src={post?.link}
                              position="absolute"
                              height="100%"
                              objectFit="cover"
                              top="0"
                              width="100%"
                            />
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  </Flex>
                ) : (
                  <Box
                    color={mobileMainColor}
                    fontSize="18px"
                    fontWeight="500"
                    margin="0"
                    overflowX="hidden"
                    padding="0 16px 8px"
                  >
                    <Skeleton isLoaded={!loading}>{post?.title}</Skeleton>
                  </Box>
                )}
              </Box>
            </Box>
            <Box marginTop="8px">
              {detail && (
                <Box
                  color={subPledditTextColor}
                  padding="5px 8px 10px"
                  fontFamily="Noto sans, Arial, sans-serif"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="21px"
                  wordBreak="break-word"
                  overflow="hidden"
                >
                  {post?.content || (
                    <Box display="flex" justifyContent="center">
                      <Image fallbackSrc="https://via.placeholder.com/150" src={post?.link} />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            {/* Footer */}
            <Box
              paddingBottom="12px"
              paddingTop="8px"
              padding="8px 16px"
              borderBottom={`8px solid ${border2}`}
              pointerEvents="none"
              _before={{
                content: `" "`,
                display: 'table',
              }}
              _after={{
                clear: 'both',
                content: `" "`,
                display: 'table',
              }}
            >
              <Flex flex="1" float="none" top="0" position="relative" pointerEvents="none">
                {/* vote button */}
                <Flex
                  border={`1px solid ${border2}`}
                  alignItems="center"
                  borderRadius="16px"
                  flexShrink="0"
                  fontWeight="0"
                  height="32px"
                  justifyContent="center"
                  minWidth="32px"
                  fontSize="12px"
                  marginRight="10px"
                  maxWidth="110px"
                  width="auto"
                  pointerEvents="all"
                >
                  <Flex
                    alignItems="center"
                    borderRadius="16px"
                    flexShrink="0"
                    fontWeight="500"
                    height="32px"
                    justifyContent="center"
                    width="32px"
                    minW="32px"
                    fontSize="12px"
                    fill={voteMode === 1 ? 'upvoteOrange' : mobileIconColor}
                    color={voteMode === 1 ? 'upvoteOrange' : mobileIconColor}
                    lineHeight="24px"
                    onClick={() => {
                      setVoteMode(voteMode === 1 ? 0 : 1);
                      handleVote(voteMode === 1 ? 0 : 1);
                    }}
                  >
                    <Icon
                      fill={voteMode === 1 ? 'upvoteOrange' : mobileIconColor}
                      color={voteMode === 1 ? 'upvoteOrange' : mobileIconColor}
                      as={voteMode === 1 ? ImArrowUp : BiUpvote}
                      height="16px"
                      width="16px"
                      flex="0 0 16px"
                    />
                  </Flex>
                  <Box
                    color={mobileIconColor}
                    fill={mobileIconColor}
                    fontSize="12px"
                    paddingTop="2px"
                    minW="16px"
                    lineHeight="14px"
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <Skeleton isLoaded={!loading}>
                      {!loading
                        ? vote + voteMode === 0
                          ? 'vote'
                          : numFormatter(vote + voteMode)
                        : ''}
                    </Skeleton>
                  </Box>
                  <Flex
                    alignItems="center"
                    borderRadius="16px"
                    flexShrink="0"
                    fontWeight="500"
                    height="32px"
                    justifyContent="center"
                    width="32px"
                    minW="32px"
                    fontSize="12px"
                    fill={voteMode === -1 ? 'downvoteBlue' : mobileIconColor}
                    color={voteMode === -1 ? 'downvoteBlue' : mobileIconColor}
                    lineHeight="24px"
                    onClick={() => {
                      setVoteMode(voteMode === -1 ? 0 : -1);
                      handleVote(voteMode === -1 ? 0 : -1);
                    }}
                  >
                    <Icon
                      fill={voteMode === -1 ? 'downvoteBlue' : mobileIconColor}
                      color={voteMode === -1 ? 'downvoteBlue' : mobileIconColor}
                      as={voteMode === -1 ? ImArrowDown : BiDownvote}
                      height="16px"
                      width="16px"
                      flex="0 0 16px"
                    />
                  </Flex>
                </Flex>
                {/* award button */}
                <Flex
                  color={mobileIconColor}
                  border={`1px solid ${border2}`}
                  alignItems="center"
                  fontWeight="500"
                  height="32px"
                  justifyContent="center"
                  minW="32px"
                  width="auto"
                  fontSize="12px"
                  flexShrink="1"
                  marginRight="10px"
                  overflowX="scroll"
                  padding="0"
                  borderRadius="16px"
                >
                  <Flex
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    alignItems="center"
                    justifyContent="center"
                    padding="1px 7px"
                  >
                    <Icon as={GoGift} height="16px" width="16px" />
                  </Flex>
                </Flex>
                {/* comment button */}
                <Link to="#">
                  <Flex
                    color={mobileIconColor}
                    fill={mobileIconColor}
                    border={`1px solid ${border2}`}
                    alignItems="center"
                    borderRadius="16px"
                    flexShrink="0"
                    fontWeight="500"
                    height="32px"
                    justifyContent="center"
                    minW="32px"
                    marginRight="10px"
                    padding="2px 8px 0"
                    maxW="100px"
                  >
                    <Icon
                      as={BsChat}
                      color={mobileIconColor}
                      fill={mobileIconColor}
                      height="16px"
                      width="16px"
                      mr="4px"
                      flex="0 0 16px"
                    />
                    <Skeleton isLoaded={!loading}>{post?.replyCount}</Skeleton>
                  </Flex>
                </Link>
                {/* share button */}
                <Flex
                  color={mobileIconColor}
                  fill={mobileIconColor}
                  border={`1px solid ${border2}`}
                  alignItems="center"
                  borderRadius="16px"
                  flexShrink="0"
                  fontWeight="500"
                  height="32px"
                  justifyContent="center"
                  minW="32px"
                  width="auto"
                  marginRight="10px"
                  marginLeft="auto"
                  padding="1px 8px 0"
                  maxW="85px"
                >
                  <Icon
                    as={FiShare}
                    color={mobileIconColor}
                    height="16px"
                    width="16px"
                    flex="0 0 16px"
                    overflow="hidden"
                    mr="4px"
                  />
                  share
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ClassicPost;
