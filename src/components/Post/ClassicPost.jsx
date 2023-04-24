import React, { useContext } from 'react';

import {
  Box,
  Button,
  Flex,
  Icon,

  Link,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  BsChat,
  BsBookmark,
  BsEyeSlash,
  BsFlag,
  BsFileText,
  BsPencil,
  BsChatSquare,
  BsShield,
  BsPinAngleFill,
} from 'react-icons/bs';
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
import getUserName, { getSubName } from '../../utils/getUserName';
import { ProfileContext } from '../../store/profileContext';
import DropDown from '../DropDown';
import Marked from '../Editor/marked';
import Avatar from '../Avatar';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOutlineAudiotrack, MdOutlineDeleteOutline } from 'react-icons/md';
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineYoutube, AiTwotoneDelete } from 'react-icons/ai';
import truncateString from '../../utils/truncateString';
import Image from "../Image"
import PostMedia from './PostMedia';

const ClassicPost = ({
  loading,
  handleVoting,
  vote,
  post,
  type,
  showContent,
  setShowContent,
  location,
  copied,
  detail,
  isOnline,
  handleOption,
  subPlebbit: sub,
  postVotes,
  handleCopy,
  pending,
  detailRoute,
  openRemovalModal,
  allowedSpecial,
  owner,
  showSpoiler,
  setShowSpoiler,
  mediaInfo,
  hasThumbnail,
  commentCount
}) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
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
  const removeColor = useColorModeValue('persimmon', 'persimmon');
  const lockColor = useColorModeValue('brightSun', 'brightSun');
  const approveColor = useColorModeValue('pastelGreen', 'pastelGreen');
  const { device } = useContext(ProfileContext);
  const subPlebbit = sub || { address: post?.subplebbitAddress };
  const postBg = useColorModeValue('lightCommunityThemePost', 'darkCommunityThemePost');
  const history = useHistory();

  return (
    <>
      { device !== 'mobile' ? (
        <Box
          color={ iconColor }
          fill={ iconColor }
          cursor="pointer"
          paddingLeft="40px"
          position="relative"
          border={ `thin solid ${border1}` }
          bg={ postTransBg }
          _hover={ { border: '1px solid #898989' } }
        >
          {/* Vote Bar */ }
          <Skeleton isLoaded={ !loading }>
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
                    _hover={ {
                      bg: iconBg,
                      color: 'upvoteOrange',
                    } }
                    _focus={ {
                      outline: 'none',
                    } }
                    onClick={ () => {
                      handleVoting(vote === 1 ? 0 : 1);
                    } }
                    color={ vote === 1 ? 'upvoteOrange' : iconColor }
                  >
                    <Icon
                      width="20px"
                      height="20px"
                      fontSize="20px"
                      fontWeight="400"
                      as={ vote === 1 ? ImArrowUp : BiUpvote }
                    />
                  </Box>
                </Box>
                <Box
                  color={ voteColor }
                  margin="4px 0"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  pointerEvents="none"
                  wordBreak="normal"
                >
                  <Skeleton isLoaded={ !loading }>
                    { postVotes === 0 ? 'vote' : numFormatter(postVotes) }{ ' ' }
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
                    color={ vote === -1 ? 'downvoteBlue' : iconColor }
                    display="inline-block"
                    overflow="hidden"
                    h="24px"
                    w="24px"
                    fontSize="16px"
                    lineHeight="24px"
                    _hover={ {
                      bg: iconBg,
                      color: 'downvoteBlue',
                    } }
                    _focus={ {
                      outline: 'none',
                    } }
                    onClick={ () => {
                      handleVoting(vote === -1 ? 0 : -1);
                    } }
                  >
                    <Icon
                      width="20px"
                      height="20px"
                      fontSize="20px"
                      fontWeight="400"
                      as={ vote === -1 ? ImArrowDown : BiDownvote }
                    />
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Skeleton>

          <Box bg={ mainBg } position="relative">
            <Flex position="relative" padding="8px 8px 0">
              {/* Post image */ }
              <Flex
                flex="0 0 96px"
                height="72px"
                borderRadius="4px"
                onClick={ () => history.push(detailRoute, []) }
              >
                <Flex flex="0 0 96px" height="72px" borderRadius="4px" backgroundColor={ shadow }>
                  <Box
                    borderRadius="4px"
                    flex="1"
                    height="100%"
                    overflow="hidden"
                    position="relative"
                    verticalAlign="bottom"
                  >
                    { post?.content && (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="100%"
                      >
                        <Icon as={ BsFileText } h="20px" w="20px" alignSelf="center" />
                      </Box>
                    ) }
                    { post?.link && (
                      <Image
                        borderColor={ border2 }
                        src={ post?.thumbnailUrl || post?.link }

                        transition="filter .5s"
                        height="72px"
                        width="96px"
                        border="none"
                        borderRadius="4px"
                        backgroundPosition="50% top"
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        flex="1"
                      />
                    ) }
                  </Box>
                </Flex>
              </Flex>

              {/* Post content */ }
              <Box ml="8px" flex="1 1 100%" position="relative" wordBreak="break-word">
                {/* post title */ }
                <Flex
                  alignItems="center"
                  flexWrap="wrap"
                  margin="0 8px"
                  onClick={ () => history.push(detailRoute, []) }
                >
                  <Skeleton display="flex" flexWrap="wrap" isLoaded={ !loading }>
                    { ' ' }
                    {/* flair */ }
                    { type === 'subPlebbit' && post?.flair?.text && (
                      <Tag
                        bg={ post?.flair?.color }
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
                        mb="4px"
                      >
                        { post?.flair?.text }
                      </Tag>
                    ) }
                    <Text
                      display="inline"
                      color={ inactiveSubTitle }
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      paddingRight="5px"
                      textDecor="none"
                      wordBreak="break-word"
                      mb="4px"
                    >
                      { post?.title }
                      { hasThumbnail && (
                        <Link
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          margin="4px 8px"
                          color="mainBlue"
                          href={ post?.link }
                        >
                          <span>{ truncateString(post?.link, 20, '...') }</span>
                          <Icon
                            as={ FiExternalLink }
                            verticalAlign="middle"
                            fontWeight="400"
                            width="20px"
                            height="20px"
                            fontSize="12px"
                            paddingLeft="4px"
                          />
                        </Link>
                      ) }
                    </Text>
                    { type !== 'subPlebbit' && post?.flair?.text ? (
                      <Tag
                        bg={ post?.flair?.color }
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
                        mb="4px"
                      >
                        { post?.flair?.text }
                      </Tag>
                    ) : (
                      ''
                    ) }
                    { post?.spoiler && (
                      <Tag
                        borderRadius="2px"
                        p="1px 8px"
                        mr="5px"
                        variant="outline"
                        colorScheme="blackAlpha"
                      >
                        SPOILER
                      </Tag>
                    ) }
                    { pending && (
                      <Tag mb="4px" size="sm" colorScheme="yellow" variant="outline">
                        Pending
                      </Tag>
                    ) }
                  </Skeleton>
                </Flex>
                {/* Post head */ }
                <Flex
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="16px"
                  flexFlow="row nowrap"
                  alignItems="start"
                  margin="0 8px 8px"
                  position="relative"
                >
                  <Skeleton mb="8px" isLoaded={ !loading }>
                    <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                      <Flex
                        fontSize="12px"
                        fontWeight="400"
                        lineHeight="16px"
                        alignItems="center"
                        flexFlow="row wrap"
                      >
                        {/* <Avatar width={24} height={24} mr="8px" badge isOnline={isOnline} /> */ }
                        <Link
                          as={ ReactLink }
                          to={ detailRoute }
                          color={ subPledditTextColor }
                          fontSize="12px"
                          fontWeight="700"
                          display="inline"
                          lineHeight="20px"
                          textDecoration="none"
                          mr="5px"
                        >
                          { getSubName(subPlebbit) }
                        </Link>
                        <Text color={ misCol } flex="0 0 auto" mr="3px">
                          Posted by
                        </Text>

                        {/* User Name */ }
                        <Box display="inline-block" flex="0 0 auto">
                          <Box>
                            <Text
                              _hover={ {
                                textDecoration: 'underline',
                              } }
                              color={ misCol }
                              fontWeight="400"
                              mr="3px"
                              textDecor="none"
                              fontSize="12px"
                              lineHeight="16px"
                            >
                              { getUserName(post?.author) }
                            </Text>
                          </Box>
                        </Box>
                        {/* status */ }
                        { post?.author?.flair && (
                          <Box display="inline" verticalAlign="text-top">
                            <Text
                              bg={ statusBg }
                              color={ statusColor }
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
                              { post?.author?.flair?.text }
                            </Text>
                          </Box>
                        ) }
                        {/* tips */ }
                        {/* date/time */ }
                        <Tooltip
                          fontSize="10px"
                          label={ post?.timestamp * 1000 }
                          aria-label="date tooltip"
                          placement="top"
                        >
                          <Text
                            color={ misCol }
                            mr="3px"
                            textDecor="none"
                            display="inline-block"
                            flex="0 0 auto"
                          >
                            { fromNow(parseInt(post?.timestamp * 1000)) }
                          </Text>
                        </Tooltip>
                        { post?.locked && <Icon as={ HiLockClosed } color={ lockColor } /> }
                        { post?.removed && (
                          <Flex
                            cursor="pointer"
                            color={ removeColor }
                            alignItems="center"
                            onClick={ () => (post?.moderatorReason ? openRemovalModal() : {}) }
                          >
                            <Icon as={ TiDeleteOutline } />
                            { !post?.moderatorReason ? (
                              allowedSpecial && <Box>Add A removal reason</Box>
                            ) : (
                              <Tooltip
                                fontSize="10px"
                                label="removal reason"
                                aria-label="removal reason"
                                placement="top"
                              >
                                <Text
                                  color={ misCol }
                                  mr="3px"
                                  textDecor="none"
                                  display="inline-block"
                                  flex="0 0 auto"
                                >
                                  { post?.moderatorReason }
                                </Text>
                              </Tooltip>
                            ) }
                          </Flex>
                        ) }
                      </Flex>
                    </Flex>
                  </Skeleton>
                </Flex>
                {/* Post footer */ }
                <Flex alignItems="center" height="40px" paddingRight="10px" overflowY="visible">
                  { pending ? (
                    !loading && (
                      <Box />
                    )
                  ) : allowedSpecial ? (
                    <Flex
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="16px"
                      alignItems="stretch"
                      padding="0 8px 0 4px"
                      flexGrow="1"
                    >
                      { !hasThumbnail ? (
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                          onClick={ () => setShowContent(!showContent) }
                        >
                          <Icon
                            as={ showContent ? CgCompressLeft : CgArrowsExpandLeft }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                        </Flex>
                      ) : (
                        <Link href={ post?.link } isExternal>
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ VscLinkExternal }
                              width="20px"
                              height="20px"
                              verticalAlign="middle"
                              fontWeight="400"
                              mr="6px"
                            />
                          </Flex>
                        </Link>
                      ) }
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                        onClick={ () => history.push(detailRoute, []) }
                      >
                        <Icon
                          as={ BsChatSquare }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { commentCount }
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ GoGift }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          Award
                        </Text>
                      </Flex>
                      <CopyToClipboard text={ location } onCopy={ handleCopy }>
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                        >
                          <Icon
                            as={ FaShare }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={ 1 }
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            { copied ? 'copied' : 'Share' }
                          </Text>
                        </Flex>
                      </CopyToClipboard>
                      { post?.removed ? (
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                          color={ approveColor }
                          onClick={ () => handleOption({ id: 'approved' }) }
                        >
                          <Icon
                            as={ HiOutlineCheckCircle }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="4px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={ 1 }
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Approve
                          </Text>
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                          color={ removeColor }
                          onClick={ () => handleOption({ id: 'removed' }) }
                        >
                          <Icon
                            as={ TiDeleteOutline }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="4px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={ 1 }
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Remove
                          </Text>
                        </Flex>
                      ) }

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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <DropDown
                          onClick={ handleOption }
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
                              _hover={ {
                                backgroundColor: inputBg,
                              } }
                            >
                              <Icon as={ BsShield } color={ iconColor } h="20px" w="20px" />
                            </Flex>
                          }
                          options={ [
                            {
                              label: 'Sticky Post',
                              icon: post?.pinned ? MdCheckBox : MdCheckBoxOutlineBlank,
                              id: 'pinned',
                            },
                            {
                              label: 'Lock Comments',
                              icon: post?.locked ? MdCheckBox : MdCheckBoxOutlineBlank,
                              id: 'locked',
                            },
                            {
                              label: 'Mark As Spoiler',
                              icon: post?.spoiler ? MdCheckBox : MdCheckBoxOutlineBlank,
                              id: 'spoiler',
                            },
                          ] }
                          rightOffset={ 0 }
                          leftOffset="none"
                          topOffset="34px"
                        />
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="16px"
                      alignItems="stretch"
                      overflow="hidden"
                      padding="0 8px 0 4px"
                      flexGrow="1"
                    >
                      { !hasThumbnail ? (
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                          onClick={ () => setShowContent(!showContent) }
                        >
                          <Icon
                            as={ showContent ? CgCompressLeft : CgArrowsExpandLeft }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                        </Flex>
                      ) : (
                        <Link href={ post?.link } isExternal>
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ VscLinkExternal }
                              width="20px"
                              height="20px"
                              verticalAlign="middle"
                              fontWeight="400"
                              mr="6px"
                            />
                          </Flex>
                        </Link>
                      ) }

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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                        onClick={ () => history.push(detailRoute, []) }
                      >
                        <Icon
                          as={ BsChat }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          { commentCount } comment{ commentCount > 1 ? 's' : '' }
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ GoGift }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          Award
                        </Text>
                      </Flex>
                      <CopyToClipboard text={ location } onCopy={ handleCopy }>
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                        >
                          <Icon
                            as={ FaShare }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={ 1 }
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            { copied ? 'copied' : 'Share' }
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
                        _hover={ {
                          backgroundColor: inputBg,
                        } }
                      >
                        <Icon
                          as={ BsBookmark }
                          width="20px"
                          height="20px"
                          verticalAlign="middle"
                          fontWeight="400"
                          mr="6px"
                        />
                        <Text
                          display="inline-block"
                          lineHeight={ 1 }
                          textTransform="capitalize"
                          verticalAlign="middle"
                        >
                          Save
                        </Text>
                      </Flex>
                      { !owner ? (
                        <>
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ BsEyeSlash }
                              width="20px"
                              height="20px"
                              verticalAlign="middle"
                              fontWeight="400"
                              mr="6px"
                            />
                            <Text
                              display="inline-block"
                              lineHeight={ 1 }
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
                            _hover={ {
                              backgroundColor: inputBg,
                            } }
                          >
                            <Icon
                              as={ BsFlag }
                              width="20px"
                              height="20px"
                              verticalAlign="middle"
                              fontWeight="400"
                              mr="6px"
                            />
                            <Text
                              display="inline-block"
                              lineHeight={ 1 }
                              textTransform="capitalize"
                              verticalAlign="middle"
                            >
                              Report
                            </Text>
                          </Flex>
                        </>
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
                          _hover={ {
                            backgroundColor: inputBg,
                          } }
                          onClick={ () => handleOption({ label: 'Delete', id: 'delete' }) }
                        >
                          <Icon
                            as={ MdOutlineDeleteOutline }
                            width="20px"
                            height="20px"
                            verticalAlign="middle"
                            fontWeight="400"
                            mr="6px"
                          />
                          <Text
                            display="inline-block"
                            lineHeight={ 1 }
                            textTransform="capitalize"
                            verticalAlign="middle"
                          >
                            Delete
                          </Text>
                        </Flex>
                      ) }
                    </Flex>
                  ) }
                </Flex>
              </Box>
            </Flex>
            { showContent && (
              <Box bg={ postBg }>
                { post?.content && (
                  <Box padding="5px 16px 5px 8px" maxWidth="100%">
                    <Box
                      color={ voteColor }
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="21px"
                      wordBreak="break-word"
                      overflow="auto"
                      paddingBottom="1px"
                      marginBottom="-1px"
                    >
                      <Marked content={ post?.content } />
                    </Box>
                  </Box>
                ) }
                <PostMedia post={ post } />
              </Box>
            ) }
          </Box>
        </Box>
      ) : (
        <Box>
          <Box position="relative" bg={ mainMobileBg }>
            {/* Background link */ }
            <Link
              as={ ReactLink }
              to={ detailRoute }
              bottom="0"
              left="0"
              pointerEvents="all"
              position="absolute"
              right="0"
              top="0"
            />
            {/*Header */ }
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
                    _after={ {
                      background: 'linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 70%)',
                      content: `""`,
                      top: '0',
                      right: '0',
                      bottom: '0',
                      width: '3em',
                    } }
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
                          color={ postHeadColor }
                        >
                          <Avatar
                            avatar={ subPlebbit?.avatar }
                            width={ 24 }
                            height={ 24 }
                            mr="8px"
                            badge
                            isOnline={ isOnline }
                          />
                          <Skeleton isLoaded={ !loading }>{ getSubName(subPlebbit) }</Skeleton>
                        </Flex>
                        <Box
                          mx="4px"
                          _after={ {
                            color: '#818384',
                            content: `"•"`,
                            margin: '0 4px',
                            position: 'relative',
                            top: '-1px',
                            verticalAlign: 'middle',
                          } }
                          fontSize="14px"
                          lineHeight="18px"
                          color="#798389"
                        />
                        <Box>
                          <Skeleton isLoaded={ !loading }>{ fromNow(post?.timestamp * 1000) }</Skeleton>
                        </Box>
                        { pending && (
                          <Skeleton isLoaded={ !loading }>
                            <Tag mb="4px" size="sm" colorScheme="yellow" variant="outline">
                              Pending
                            </Tag>
                          </Skeleton>
                        ) }
                      </Flex>
                    </Box>
                  </Box>
                  <Box padding="0" flex="0 0 auto" whiteSpace="nowrap" />
                  <Flex alignItems="center" alignSelf="flex-start">
                    <Flex
                      padding="10px 2px"
                      flex="0 0 auto"
                      alignSelf="flex-start"
                      whiteSpace="nowrap"
                      ml="auto"
                    >
                      { post?.pinned && <Icon as={ BsPinAngleFill } color={ approveColor } /> }
                      { post?.locked && <Icon as={ HiLockClosed } color={ lockColor } /> }
                      { post?.removed && <Icon as={ AiTwotoneDelete } color={ removeColor } /> }
                    </Flex>
                    { !pending && (
                      <Box pointerEvents="all">
                        <DropDown
                          onChange={ handleOption }
                          rightOffset="10px"
                          leftOffset="none"
                          dropDownTitle={
                            <Box
                              pointerEvents="all"
                              color="#565758"
                              padding="8px 16px 8px 2px"
                              verticalAlign="middle"
                            >
                              <Icon
                                as={ FiMoreHorizontal }
                                verticalAlign="inherit"
                                height={ 5 }
                                w={ 5 }
                              />
                            </Box>
                          }
                          options={ [
                            {
                              label: 'Edit',
                              icon: BsPencil,
                              id: 'edit',
                              disabled: !(owner && detail),
                            },
                            {
                              label: 'Approve',
                              icon: HiOutlineCheckCircle,
                              id: 'approved',
                              disabled: !(allowedSpecial && post?.removed),
                              color: approveColor,
                            },
                            {
                              label: 'Remove',
                              icon: TiDeleteOutline,
                              id: 'removed',
                              disabled: !(allowedSpecial && !post?.removed),
                              color: removeColor,
                            },
                            {
                              label: 'Block Author',
                              icon: BsEyeSlash,
                              id: 'block',
                              disabled: owner,
                            },
                            {
                              label: 'Delete',
                              icon: MdOutlineDeleteOutline,
                              id: 'delete',
                              disabled: !owner,
                            },
                          ] }
                        />
                      </Box>
                    ) }
                  </Flex>
                </Flex>
                <Box padding="0 16px 8px">
                  { post?.spoiler && (
                    <Tag
                      borderRadius="2px"
                      p="1px 8px"
                      mr="5px"
                      variant="solid"
                      colorScheme="blackAlpha"
                    >
                      SPOILER
                    </Tag>
                  ) }
                </Box>

                { post?.link ? (
                  <Flex
                    justifyContent="space-between"
                    pointerEvents="none"
                    alignItems="flex-start"
                    flexFlow="row nowrap"
                    padding="0 16px"
                  >
                    <Box overflow="hidden" overflowWrap="break-word">
                      <Box
                        color={ mobileMainColor }
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="19px"
                        margin="0"
                        overflowX="hidden"
                        pr="8px"
                        overflowWrap="break-word"
                      >
                        { post?.title }
                      </Box>
                    </Box>
                    <Box margin="0 0 16px">
                      { hasThumbnail && <Box pointerEvents="none" position="relative" marginX="0">
                        <Link href={ post?.link }>
                          <Box width="70px" height="52px" pointerEvent="all">
                            <Image

                              src={ post?.thumbnailUrl }
                              position="absolute"
                              height="100%"
                              objectFit="cover"
                              top="0"
                              width="100%"
                            />
                          </Box>
                        </Link>
                        <Text left="0" bottom="0" right="0" background="rgba(0,0,0,.7)" color="#fff" pos="absolute" fontSize="10px" padding="4px" noOfLines={ 1 } isTruncated overflow="hidden">{ post?.link?.replace(/(^\w+:|^)\/\//, '') }</Text>
                      </Box> }
                      { mediaInfo?.type === "image" && (

                        <Box width="70px" height="52px" onClick={ () => setShowContent(!showContent) } >

                          <Image
                            width="100%" height="100%"
                            bg={ postBg }
                            src={ post?.link }
                            onError={ (event) =>
                              (event.target.style.display = "none")
                            }


                          />
                        </Box>

                      ) }
                      { mediaInfo?.type === "video" && (
                        <Flex justifyContent="center" alignItems="center" width="70px" height="52px" onClick={ () => setShowContent(!showContent) } >

                          <Icon
                            as={ AiOutlineYoutube }
                            width="28px"
                            height="28px"
                            verticalAlign="middle"
                          />
                        </Flex>

                      ) }
                      { mediaInfo?.type === "audio" && (
                        <Flex justifyContent="center" alignItems="center" width="70px" height="52px" onClick={ () => setShowContent(!showContent) } >

                          <Icon
                            as={ MdOutlineAudiotrack }
                            width="28px"
                            height="28px"
                            verticalAlign="middle"
                          />
                        </Flex>

                      ) }

                    </Box>
                  </Flex>
                ) : (
                  <Box
                    color={ mobileMainColor }
                    fontSize="18px"
                    fontWeight="500"
                    margin="0"
                    overflowX="hidden"
                    padding="0 16px 8px"
                  >
                    <Skeleton isLoaded={ !loading }>{ post?.title }</Skeleton>
                  </Box>
                ) }
                { detail && <Box padding="0 16px 8px">
                  { post?.flair?.text ? (
                    <Tag
                      borderRadius="20px"
                      p="2px 8px"
                      mr="5px"
                      background={ post?.flair?.backgroundColor }
                      color={ post?.flair?.textColor }
                    >
                      { post?.flair.text }
                    </Tag>
                  ) : null }
                </Box> }
                { showContent && <Box pt="10%" >

                  { mediaInfo?.type === "image" && (
                    <Image
                      maxH="320px"
                      margin="0 auto"
                      maxW="100%"
                      overflow="hidden"
                      bg={ postBg }
                      src={ post?.link }
                      onError={ (event) =>
                        (event.target.style.display = "none")
                      }
                    />
                  ) }

                  { mediaInfo?.type === "video" && (
                    <Box
                      bg="black"
                      maxHeight="320px"
                      width="100%"
                      maxW="100%"
                      color="#fff"
                    >
                      <video
                        autoPlay
                        playsInline
                        preload="auto"
                        controls
                        style={ {
                          objectFit: "contain",
                          width: "100% !important",
                          overflowClipMargin: "content-box",
                          overflow: "clip",
                        } }
                        onError={ (event) =>
                          (event.target.style.display = "none")
                        }
                        muted
                      >
                        <source src={ post?.link } />
                      </video>
                    </Box>
                  ) }

                  { mediaInfo?.type === "audio" && (
                    <Box maxW="100%" color="#fff" margin="4px 8px">
                      <audio
                        preload="auto"
                        src={ post?.link }
                        onError={ (event) =>
                          (event.target.style.display = "none")
                        }
                        controls
                        style={ {
                          width: "100%",
                        } }
                      >
                        <source src={ post?.link } />
                      </audio>
                    </Box>
                  ) }
                </Box> }
              </Box>
            </Box>
            <Box marginTop="8px" padding="0 8px">
              <>
                { detail &&


                  (showSpoiler ? (
                    <Flex alignItems="center" justifyContent="center">
                      <Button
                        variant="outline"
                        colorScheme="blackAlpha"
                        padding="10px 20px"
                        onClick={ () => setShowSpoiler(false) }
                        borderRadius="none"
                        fontWeight="400"
                        my="10px"
                      >
                        CLICK TO SEE SPOILER
                      </Button>
                    </Flex>
                  ) : (
                    <Box
                      color={ subPledditTextColor }
                      padding="5px 8px 10px"
                      fontFamily="Noto sans, Arial, sans-serif"
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="21px"
                      wordBreak="break-word"
                      overflow="hidden"
                    >
                      { post?.content ? (
                        <Marked content={ post?.content } />
                      ) : (
                        <Skeleton isLoaded={ !loading }>
                          <PostMedia />

                        </Skeleton>
                      ) }
                    </Box>
                  ))


                }
              </>
            </Box>
            {/* Footer */ }
            { pending ? (
              !loading && (

                <Box />
              )
            ) : allowedSpecial ? (
              <Box
                paddingBottom="12px"
                paddingTop="8px"
                padding="8px 16px"
                borderBottom={ `8px solid ${border2}` }
                pointerEvents="none"
                _before={ {
                  content: `" "`,
                  display: 'table',
                } }
                _after={ {
                  clear: 'both',
                  content: `" "`,
                  display: 'table',
                } }
              >
                <Flex flex="1" float="none" top="0" position="relative" pointerEvents="none">
                  {/* vote button */ }
                  <Flex
                    border={ `1px solid ${border2}` }
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
                      fill={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                      color={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === 1 ? 0 : 1);
                      } }
                    >
                      <Icon
                        fill={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                        color={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                        as={ vote === 1 ? ImArrowUp : BiUpvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                    <Box
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      fontSize="12px"
                      paddingTop="2px"
                      minW="16px"
                      lineHeight="14px"
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Skeleton isLoaded={ !loading }>
                        { !loading ? (postVotes === 0 ? 'vote' : numFormatter(postVotes)) : 'vote' }
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
                      fill={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                      color={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === -1 ? 0 : -1);
                      } }
                    >
                      <Icon
                        fill={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                        color={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                        as={ vote === -1 ? ImArrowDown : BiDownvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                  </Flex>
                  {/* award button */ }
                  <Flex
                    color={ mobileIconColor }
                    border={ `1px solid ${border2}` }
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
                      <Icon as={ GoGift } height="16px" width="16px" />
                    </Flex>
                  </Flex>
                  {/* comment button */ }
                  <Link as={ ReactLink } to={ detailRoute }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
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
                        as={ BsChat }
                        color={ mobileIconColor }
                        fill={ mobileIconColor }
                        height="16px"
                        width="16px"
                        mr="4px"
                        flex="0 0 16px"
                      />
                      <Skeleton isLoaded={ !loading }>{ commentCount }</Skeleton>
                    </Flex>
                  </Link>
                  {/* mod button */ }
                  <Box pointerEvents="all" ml="auto">
                    <DropDown
                      menuSx={ {
                        pointerEvents: 'all',
                      } }
                      onChange={ handleOption }
                      dropDownTitle={
                        <Flex
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          alignItems="center"
                          justifyContent="center"
                          padding="1px 7px"
                        >
                          <Icon as={ BsShield } height="16px" width="16px" />
                        </Flex>
                      }
                      options={ [
                        {
                          label: 'Sticky Post',
                          icon: post?.pinned ? MdCheckBox : MdCheckBoxOutlineBlank,
                          id: 'pinned',
                        },
                        {
                          label: 'Lock Comments',
                          icon: post?.locked ? MdCheckBox : MdCheckBoxOutlineBlank,
                          id: 'locked',
                        },
                        {
                          label: 'Mark As Spoiler',
                          icon: post?.spoiler ? MdCheckBox : MdCheckBoxOutlineBlank,
                          id: 'spoiler',
                        },
                      ] }
                      rightOffset={ 0 }
                      leftOffset="none"
                      topOffset="34px"
                    />
                  </Box>
                </Flex>
              </Box>
            ) : (
              <Box
                paddingBottom="12px"
                paddingTop="8px"
                padding="8px 16px"
                borderBottom={ `8px solid ${border2}` }
                pointerEvents="none"
                _before={ {
                  content: `" "`,
                  display: 'table',
                } }
                _after={ {
                  clear: 'both',
                  content: `" "`,
                  display: 'table',
                } }
              >
                <Flex flex="1" float="none" top="0" position="relative" pointerEvents="none">
                  {/* vote button */ }
                  <Flex
                    border={ `1px solid ${border2}` }
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
                      fill={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                      color={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === 1 ? 0 : 1);
                      } }
                    >
                      <Icon
                        fill={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                        color={ vote === 1 ? 'upvoteOrange' : mobileIconColor }
                        as={ vote === 1 ? ImArrowUp : BiUpvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                    <Box
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      fontSize="12px"
                      paddingTop="2px"
                      minW="16px"
                      lineHeight="14px"
                      textAlign="center"
                      verticalAlign="middle"
                    >
                      <Skeleton isLoaded={ !loading }>
                        { !loading ? (postVotes === 0 ? 'vote' : numFormatter(postVotes)) : 'vote' }
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
                      fill={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                      color={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                      lineHeight="24px"
                      onClick={ () => {
                        handleVoting(vote === -1 ? 0 : -1);
                      } }
                    >
                      <Icon
                        fill={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                        color={ vote === -1 ? 'downvoteBlue' : mobileIconColor }
                        as={ vote === -1 ? ImArrowDown : BiDownvote }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                      />
                    </Flex>
                  </Flex>
                  {/* award button */ }
                  <Flex
                    color={ mobileIconColor }
                    border={ `1px solid ${border2}` }
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
                      <Icon as={ GoGift } height="16px" width="16px" />
                    </Flex>
                  </Flex>
                  {/* comment button */ }
                  <Link as={ ReactLink } to={ detailRoute }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
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
                        as={ BsChat }
                        color={ mobileIconColor }
                        fill={ mobileIconColor }
                        height="16px"
                        width="16px"
                        mr="4px"
                        flex="0 0 16px"
                      />
                      <Skeleton isLoaded={ !loading }>{ commentCount }</Skeleton>
                    </Flex>
                  </Link>
                  {/* share button */ }
                  <CopyToClipboard text={ location } onCopy={ handleCopy }>
                    <Flex
                      color={ mobileIconColor }
                      fill={ mobileIconColor }
                      border={ `1px solid ${border2}` }
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
                        as={ FiShare }
                        color={ mobileIconColor }
                        height="16px"
                        width="16px"
                        flex="0 0 16px"
                        overflow="hidden"
                        mr="4px"
                      />
                      { copied ? 'copied' : 'Share' }
                    </Flex>
                  </CopyToClipboard>
                </Flex>
              </Box>
            ) }
          </Box>
        </Box>
      ) }
    </>
  );
};

export default ClassicPost;
