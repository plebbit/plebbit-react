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
import { BsChat, BsBookmark, BsEyeSlash } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiExternalLink } from 'react-icons/fi';
import DropDown from '../../components/DropDown';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { Link as ReactLink } from 'react-router-dom';
import { dateToNow } from '../../utils/formatDate';
import numFormatter from '../../utils/numberFormater';

const CardPost = ({ post, setVoteMode, voteMode, handleVote, vote, loading, type, onOpen }) => {
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
  return (
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
                          {`u/${post?.author?.displayName}`}
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
            <Box margin="0 8px" onClick={onOpen}>
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
                            {`u/${post?.author?.displayName}`}
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
              <Box margin="0 8px" onClick={onOpen}>
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
    </Box>
  );
};

export default CardPost;
