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
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsChat, BsBookmark, BsEyeSlash } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiExternalLink } from 'react-icons/fi';
import DropDown from '../../components/DropDown';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { FiShare } from 'react-icons/fi';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { dateToNow } from '../../utils/formatDate';
import numFormatter from '../../utils/numberFormater';
import { ProfileContext } from '../../store/profileContext';
import getUserName from '../../utils/getUserName';
import truncateSting from '../../utils/truncateString';

const CardPost = ({ post, setVoteMode, voteMode, handleVote, vote, loading, type }) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const inactiveSubTitle = useColorModeValue('lightText', 'darkText1');
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const border1 = useColorModeValue('#ccc', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const postTransBg = useColorModeValue('lightPostTransBg', 'darkPostTransBg');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const mobileMainColor = useColorModeValue('lightMobileText', 'darkMobileText');
  const mainMobileBg = useColorModeValue('white', 'black');
  const postHeadColor = useColorModeValue('#1a1a1b', '#0079d3');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mobileIconColor = useColorModeValue('lightMobileIcon2', 'darkMobileIcon');
  const history = useHistory();

  const { device } = useContext(ProfileContext);

  return (
    <>
      {device !== 'mobile' ? (
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
                {!loading ? (vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)) : ''}
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
          <Link
            textDecoration="none"
            sx={{
              textDecoration: 'none !important',
            }}
            href={`#/p/${post?.subplebbitAddress}/c/${post?.cid}`}
          >
            <Box bg={mainBg} position="relative" paddingTop="8px">
              {post?.content ? (
                <>
                  {/* Post Head */}
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
                          {type !== 'subPlebbit' ? (
                            <>
                              <Link
                                as={ReactLink}
                                to={`p/${post?.subplebbitAddress}`}
                                color={subPledditTextColor}
                                fontSize="12px"
                                fontWeight="700"
                                display="inline"
                                lineHeight="20px"
                                textDecoration="none"
                              >
                                {`p/${post?.subplebbitAddress}`}
                              </Link>
                              <Box
                                verticalAlign="middle"
                                color={subPlebbitSubTitle}
                                fontSize="6px"
                                lineHeight="20px"
                                margin="0 4px"
                              >
                                •
                              </Box>
                            </>
                          ) : (
                            ''
                          )}
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
                              alt="not-found"
                              fallbackSrc={require('../../assets/images/fallback.png')}
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
                              alt="not-found"
                              fallbackSrc={require('../../assets/images/fallback.png')}
                            />
                          </Flex>
                          {/* User Name */}
                          <Box display="inline-block" flex="0 0 auto">
                            <Box>
                              <Link
                                as={ReactLink}
                                to={`u/${post?.author?.address}`}
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
                              </Link>
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
                  </Flex>{' '}
                  {/* Post Title */}
                  <Box
                    margin="0 8px"
                    onClick={() => history.push(`/p/${post?.subplebbitAddress}/c/${post?.cid}`, [])}
                  >
                    <Skeleton isLoaded={!loading}>
                      {' '}
                      {/* flair */}
                      {type === 'subPlebbit' && post?.flair?.text.length ? (
                        <Tag
                          bg={post?.flair?.backgroundColor}
                          color={post?.flair?.textColor}
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
                        fontSize="18px"
                        fontWeight="500"
                        lineHeight="22px"
                        paddingRight="5px"
                        textDecor="none"
                        wordBreak="break-word"
                      >
                        {post?.title}
                      </Text>
                      {type !== 'subPlebbit' && post?.flair?.text ? (
                        <Tag
                          bg={post?.flair?.backgroundColor}
                          color={post?.flair?.textColor}
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
                          {post?.content}
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
                            {type !== 'subPlebbit' ? (
                              <>
                                <Link
                                  as={ReactLink}
                                  to={`/p/${post?.subplebbitAddress}`}
                                  color={subPledditTextColor}
                                  fontSize="12px"
                                  fontWeight="700"
                                  display="inline"
                                  lineHeight="20px"
                                  textDecoration="none"
                                >
                                  {`p/${post?.subplebbitAddress}`}
                                </Link>
                                <Box
                                  verticalAlign="middle"
                                  color={subPlebbitSubTitle}
                                  fontSize="6px"
                                  lineHeight="20px"
                                  margin="0 4px"
                                >
                                  •
                                </Box>
                              </>
                            ) : (
                              ''
                            )}
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
                                fallbackSrc={require('../../assets/images/fallback.png')}
                                h="24px"
                                verticalAlign="middle"
                                src="https://picsum.photos/200?random=1"
                                alt="not-found"
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
                                fallbackSrc={require('../../assets/images/fallback.png')}
                                h="24px"
                                verticalAlign="middle"
                                src="https://picsum.photos/200?random=2"
                                alt="not-found"
                              />
                            </Flex>
                            {/* User Name */}
                            <Box display="inline-block" flex="0 0 auto">
                              <Box>
                                <Link
                                  _hover={{
                                    textDecoration: 'underline',
                                  }}
                                  as={ReactLink}
                                  to={`u/${post?.author?.address}`}
                                  color={misCol}
                                  fontWeight="700"
                                  mr="3px"
                                  textDecor="none"
                                  fontSize="12px"
                                  lineHeight="16px"
                                >
                                  {getUserName(post?.author)}
                                </Link>
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
                    </Flex>{' '}
                    {/* Post Title */}
                    <Box
                      margin="0 8px"
                      onClick={() =>
                        history.push(`/p/${post?.subplebbitAddress}/c/${post?.cid}`, [])
                      }
                    >
                      <Skeleton mb="30px" isLoaded={!loading}>
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
                          fontSize="18px"
                          fontWeight="500"
                          lineHeight="22px"
                          paddingRight="5px"
                          textDecor="none"
                          wordBreak="break-word"
                        >
                          {post?.title}
                        </Text>
                        {type !== 'subPlebbit' ? (
                          <Tag
                            bg={post?.flair?.backgroundColor}
                            color={post?.flair?.textColor}
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
                    {/* Post url */}
                    <Flex mt="0">
                      {post?.link ? (
                        <Link
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          margin="4px 8px"
                          whiteSpace="nowrap"
                          color="mainBlue"
                          display="flex"
                          href={post?.link}
                          alignItems="flex-end"
                        >
                          <Box>{post?.link?.substring(0, 20) + '...'}</Box>
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
                        <Link href={post?.link}>
                          <Image
                            fallbackSrc={require('../../assets/images/fallback.png')}
                            borderColor="mainBlue"
                            border="1px solid #0079d3;"
                            src={post?.link}
                            width="100%"
                            height="100%"
                            onError={(err) =>
                              err.onError === null
                                ? (err.src = 'https://demofree.sirv.com/products/123456/')
                                : ''
                            }
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
                      options={[
                        {
                          label: 'Hide',
                          icon: BsEyeSlash,
                          id: Math.random(),
                        },
                      ]}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Link>
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
                          <Flex
                            bg={mainMobileBg}
                            alignItems="center"
                            borderRadius="50%"
                            height="24px"
                            justifyContent="center"
                            marginRight="8px"
                            overflow="hidden"
                            verticalAlign="middle"
                            width="24px"
                          >
                            <Image
                              fallbackSrc={require('../../assets/images/fallback.png')}
                              alt="plebbit-post"
                              overflow="hidden"
                              whiteSpace="nowrap"
                              src="https://bit.ly/dan-abramov"
                            />
                          </Flex>
                          <Skeleton isLoaded={!loading}>{`p/${truncateSting(
                            post?.subplebbitAddress,
                            14
                          )}`}</Skeleton>
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
                          <Skeleton isLoaded={!loading}>
                            {dateToNow(post?.timestamp * 1000)}
                          </Skeleton>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box padding="0" flex="0 0 auto" whiteSpace="nowrap" />
                  <Box
                    pointerEvents="all"
                    color="#565758"
                    padding="8px 16px 8px 12px"
                    verticalAlign="middle"
                  >
                    <Icon as={FiMoreHorizontal} verticalAlign="inherit" height={5} w={5} />
                  </Box>
                </Flex>
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
              </Box>
            </Box>
            {/* Footer */}
            <Box
              paddingBottom="12px"
              paddddingTop="8px"
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

export default CardPost;
