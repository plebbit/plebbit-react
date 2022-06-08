import React from 'react';
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
import { FiExternalLink } from 'react-icons/fi';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link as ReactLink } from 'react-router-dom';
import { dateToNow } from '../../utils/formatDate';
import numFormatter from '../../utils/numberFormater';

const ClassicPost = ({
  onOpen,
  loading,
  setVoteMode,
  voteMode,
  handleVote,
  vote,
  post,
  type,
  showContent,
  setShowContent,
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

  return (
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
                    {/* <Image alt="xxx" /> */}
                  </Box>
                )}
              </Box>
            </Flex>
          </Flex>

          {/* Post content */}
          <Box ml="8px" flex="1 1 100%" position="relative" wordBreak="break-word">
            {/* post title */}
            <Box margin="0 8px" onClick={onOpen}>
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
              alignItem="start"
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
                    <Link
                      as={ReactLink}
                      to={`/p/${post?.subplebbitAddress}`}
                      color={subPledditTextColor}
                      fontSize="12px"
                      fontWeight="700"
                      display="inline"
                      lineHeight="20px"
                      textDecoration="none"
                      mr="3px"
                    >
                      {`p/${post?.subplebbitAddress}`}
                    </Link>
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
                          {`u/${post?.author?.displayName}`}
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
                        {dateToNow(parseInt(post?.timestamp * 1000))}
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
              {post?.content}
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

export default ClassicPost;
