import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from "../Image"

import {
  // BsBookmark,
  BsChat,
  BsChatSquare,
  BsEyeSlash,
  BsFileText,
  // BsPencil,
  BsPinAngleFill,
  BsShield,
} from 'react-icons/bs';
import { CgArrowsExpandLeft, CgCompressLeft, CgImage } from 'react-icons/cg';
import { FiMoreHorizontal, FiExternalLink } from 'react-icons/fi';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import fromNow from '../../utils/formatDate';
import numFormatter from '../../utils/numberFormater';
import getUserName, { getSubName } from '../../utils/getUserName';
import Marked from '../Editor/marked';
import Avatar from '../Avatar';
import Link from '../Link';
import DropDown from '../DropDown';
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';

import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineAudiotrack,
  MdOutlineDeleteOutline,
} from 'react-icons/md';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiOutlineYoutube } from 'react-icons/ai';
import PostMedia from './PostMedia';
import Label from '../Label'
import EditLabel from "../Label/editLabel";
import PendingLabel from "../Label/pendingLabel";
import SpoilerLabel from "../Label/spoilerLabel";
import FlairLabel from "../Label/flairLabel";
import StateString from '../Label/stateString';
import { GoMute } from 'react-icons/go';

const CompactPost = ({
  loading,
  setShowContent,
  showContent,
  vote,
  post,
  type,
  isOnline,
  subPlebbit,
  postVotes,
  handleOption,
  // setCopied,
  // location,
  // copied,
  pending,
  detailRoute,
  openRemovalModal,
  allowedSpecial,
  mediaInfo,
  owner,
  hasThumbnail,
  commentCount,
  upVote,
  downVote,
  editLabel,
  authorPath,
  stateString,
  blocked,
  muted
}) => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const inactiveSubTitle = useColorModeValue('lightText', 'darkText1');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const postTransBg = useColorModeValue('lightPostTransBg', 'darkPostTransBg');
  const voteColor = useColorModeValue('lightVoteText', 'darkVoteTest');
  const iconBg = useColorModeValue('lightIconBg', 'darkIconBg');
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const approveColor = useColorModeValue('pastelGreen', 'pastelGreen');
  const removeColor = useColorModeValue('persimmon', 'persimmon');
  const lockColor = useColorModeValue('brightSun', 'brightSun');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const postBg = useColorModeValue('lightCommunityThemePost', 'darkCommunityThemePost');
  const [showExpand, setShowExpand] = useState(false);

  return (
    <Box
      color={ iconColor }
      fill={ iconColor }
      cursor="pointer"
      maxW="100%"
      bg={ postTransBg }
      position="relative"
      border={ `thin solid transparent` }
      _hover={ { border: '1px solid #898989' } }
    >
      <Flex alignItems="normal">
        {/* vote Bar */ }
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
                  _hover={ {
                    bg: iconBg,
                    color: 'upvoteOrange',
                  } }
                  _focus={ {
                    outline: 'none',
                  } }
                  onClick={ upVote }
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
                margin="0 1px"
                fontSize="12px"
                fontWeight="700"
                lineHeight="15px"
                pointerEvents="none"
                wordBreak="normal"
                textAlign="center"
                width="32px"
              >
                <Skeleton isLoaded={ !loading }>
                  { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
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
                  onClick={ downVote }
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
        </Flex>
        <Box
          bg={ mainBg }
          borderLeft={ `1px solid ${border2}` }
          flex="1 1 auto"
          minW="0"
          padding="3px 0"
          position="relative"
        >
          <Flex alignItems="center">

            { !hasThumbnail && (
              <Link
                display="flex"
                flex="0 0 36px"
                margin="0 8px"
                alignSelf="center"
                alignItems="center"
                borderRadius={ loading ? '50%' : "2px" }
                justifyContent="center"
                height="36px"
                width="36px"
                _hover={ {
                  bg: iconBg,
                } }
                as={ loading && SkeletonCircle }
                onClick={ () => setShowContent(!showContent) }
                onMouseEnter={ () => setShowExpand(true) }
                onMouseLeave={ () => setShowExpand(false) }
              >
                { showExpand ? (
                  <Icon
                    as={ showContent ? CgCompressLeft : CgArrowsExpandLeft }
                    position="absolute"
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                  />
                ) : showContent ? (
                  <Icon
                    as={ CgCompressLeft }
                    position="absolute"
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                  />
                ) : (
                  <>
                    { post?.content && (
                      <Icon
                        as={ BsFileText }
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    ) }

                    { mediaInfo?.type === 'image' && (
                      <Icon
                        as={ CgImage }
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    ) }
                    { mediaInfo?.type === 'video' && (
                      <Icon
                        as={ AiOutlineYoutube }
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    ) }
                    { mediaInfo?.type === 'audio' && (
                      <Icon
                        as={ MdOutlineAudiotrack }
                        position="absolute"
                        width="20px"
                        height="20px"
                        verticalAlign="middle"
                      />
                    ) }
                  </>
                ) }
              </Link>
            ) }

            { hasThumbnail && (
              <Box
                display="flex"
                flex="0 0 36px"
                margin="0 8px"
                alignSelf="center"
                alignItems="center"
                borderRadius={ loading ? '50%' : "2px" }
                justifyContent="center"
                height="36px"
                width="36px"
                _hover={ {
                  bg: iconBg,
                } }
                as={ loading && SkeletonCircle }
              >
                <Icon
                  as={ VscLinkExternal }
                  position="absolute"
                  width="20px"
                  height="20px"
                  verticalAlign="middle"
                />
              </Box>
            ) }


            <Box as={ loading && Skeleton } w={ loading && '50%' } h={ loading && '20px' } mr={ loading && '8px' } flex={ !loading && "1 1 100%" } mt="2px" minW="150px" overflow="hidden" wordWrap="break-word">
              {/* post title */ }

              <Box margin="0 8px" as={ Link } to={ detailRoute }>
                { ' ' }
                {/* flair */ }
                { type === 'subPlebbit' && post?.flair?.text ? (
                  <FlairLabel flair={ post?.flair } />
                ) : (
                  ''
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
                  { hasThumbnail ? (
                    <Link
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      margin="4px 8px"
                      color="mainBlue"
                      href={ post?.link }
                    >
                      <span>{ post?.link.substring(0, 20) + '...' }</span>
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
                  ) : (
                    ''
                  ) }
                </Text>
                { type !== 'subPlebbit' && post?.flair?.text ? (
                  <FlairLabel flair={ post?.flair } />
                ) : (
                  ''
                ) }
                { post?.spoiler && (
                  <SpoilerLabel />
                ) }
                { pending && (

                  <PendingLabel />

                ) }
                {/* edit status */ }
                <EditLabel editLabel={ editLabel } post={ post } />


              </Box>
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

                <Flex alignItems="center" flexWrap="wrap" flex="1 1 auto" overflow="hidden">
                  <Flex
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    alignItems="center"
                    flexFlow="row wrap"
                  >
                    { type !== 'subPlebbit' ? (
                      <>
                        <Avatar
                          avatar={ subPlebbit?.suggested?.avatarUrl }
                          width={ 24 }
                          height={ 24 }
                          mr="8px"
                          badge
                          isOnline={ isOnline }
                        />
                        <Link
                          color={ subPledditTextColor }
                          fontSize="12px"
                          fontWeight="700"
                          display="inline"
                          lineHeight="20px"
                          textDecoration="none"
                        >
                          { getSubName(subPlebbit) }
                        </Link>
                        <Box
                          verticalAlign="middle"
                          color={ subPlebbitSubTitle }
                          fontSize="6px"
                          lineHeight="20px"
                          margin="0 4px"
                        />
                      </>
                    ) : (
                      <Link
                        to={ `/p/${post?.subplebbitAddress}` }
                        color={ subPledditTextColor }
                        fontSize="12px"
                        fontWeight="700"
                        display="inline"
                        lineHeight="20px"
                        textDecoration="none"
                        mr="3px"
                      >
                        { getSubName(subPlebbit) }{ ' ' }
                      </Link>
                    ) }
                    <Text color={ misCol } flex="0 0 auto" mr="3px">
                      Posted by
                    </Text>
                    {/* User Name */ }
                    <Box display="inline-block" flex="0 0 auto">
                      <Box>
                        <Link
                          _hover={ {
                            textDecoration: 'underline',
                          } }
                          color={ misCol }
                          fontWeight="400"
                          mr="3px"
                          textDecor="none"
                          fontSize="12px"
                          lineHeight="16px"
                          to={ authorPath }
                        >
                          { getUserName(post?.author) }
                        </Link>
                      </Box>
                    </Box>
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
                    { post?.pinned && <Icon as={ BsPinAngleFill } color={ approveColor } /> }
                    { post?.locked && <Icon as={ HiLockClosed } color={ lockColor } /> }
                    { post?.removed && (
                      <Flex
                        cursor="pointer"
                        color={ removeColor }
                        alignItems="center"
                        onClick={ () => (post?.reason ? openRemovalModal() : {}) }
                      >
                        <Icon as={ TiDeleteOutline } />
                        { !post?.reason ? (
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
                              { post?.reason }
                            </Text>
                          </Tooltip>
                        ) }
                      </Flex>
                    ) }
                  </Flex>
                </Flex>

              </Flex>
            </Box>
            { loading && <StateString stateString={ stateString } /> }

            {/* Post Footer */ }
            { pending ? (
              !loading && (
                <Box />
              )
            ) : allowedSpecial ? (
              <Flex
                alignItems="center"
                flex="0 0 72px"
                justifyContent="flex-end"
                height="100%"
                ml="4px"
                paddingRight="4px"
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
                  _hover={ {
                    backgroundColor: inputBg,
                  } }
                  as={ Link }
                  to={ detailRoute }
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
                { post?.removed ? (
                  <Flex
                    _hover={ {
                      bg: inputBg,
                    } }
                    alignItems="center"
                    mr="4px"
                    margin="4px 8px 4px 0"
                    padding="4px"
                    borderRadius="2px"
                    cursor="pointer"
                    color={ iconColor }
                    onClick={ () => handleOption({ id: 'approved' }) }
                  >
                    <Icon height="20px" width="20px" as={ HiOutlineCheckCircle } />
                  </Flex>
                ) : (
                  <Flex
                    _hover={ {
                      bg: inputBg,
                    } }
                    alignItems="center"
                    mr="4px"
                    margin="4px 8px 4px 0"
                    padding="4px"
                    borderRadius="2px"
                    cursor="pointer"
                    color={ iconColor }
                    onClick={ () => handleOption({ id: 'removed' }) }
                  >
                    <Icon height="20px" width="20px" as={ TiDeleteOutline } />
                  </Flex>
                ) }

                <Flex justifyContent="center">
                  <DropDown
                    onChange={ handleOption }
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
                <Flex justifyContent="center">
                  <DropDown
                    onChange={ handleOption }
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
                        <Icon as={ FiMoreHorizontal } color={ iconColor } h="20px" w="20px" />
                      </Flex>
                    }
                    options={ [
                      {
                        label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                        icon: GoMute,
                        id: "mute",
                        disabled: type === "subPlebbit"
                      },
                      {
                        label: blocked ? 'Unhide' : "Hide",
                        icon: BsEyeSlash,
                        id: "block",

                      },
                      {
                        label: 'Delete',
                        icon: MdOutlineDeleteOutline,
                        id: 'delete',
                        disabled: !owner,
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
                alignItems="center"
                flex="0 0 72px"
                justifyContent="flex-end"
                height="100%"
                ml="4px"
                paddingRight="4px"
              >
                <Link
                  width="max-content"
                  borderRadius="2px"
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  padding="4px"
                  boxSizing="border-box"
                  _hover={ {
                    bg: inputBg,
                  } }
                  as={ Link }
                  to={ detailRoute }
                >
                  <Icon
                    as={ BsChat }
                    width="20px"
                    height="20px"
                    verticalAlign="middle"
                    fontWeight="400"
                    mr="6px"
                  />
                  <span>{ commentCount }</span>
                </Link>
                <Flex justifyContent="center">
                  <DropDown
                    onChange={ handleOption }
                    rightOffset={ 0 }
                    leftOffset="unset"
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
                        <Icon as={ FiMoreHorizontal } color={ iconColor } h="20px" w="20px" />
                      </Flex>
                    }
                    options={ [
                      {
                        label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subPlebbit)}`,
                        icon: GoMute,
                        id: "mute",
                        disabled: type === "subPlebbit"
                      },
                      {
                        label: blocked ? 'Unhide' : "Hide",
                        icon: BsEyeSlash,
                        id: "block",

                      },
                      {
                        label: 'Delete',
                        icon: MdOutlineDeleteOutline,
                        id: 'delete',
                        disabled: !owner,
                      },
                    ] }
                  />
                </Flex>
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
  );
};

export default CompactPost;
