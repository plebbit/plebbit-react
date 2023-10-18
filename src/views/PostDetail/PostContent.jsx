import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  useToast,
  Button,
  Skeleton,
  useDisclosure,
  Tooltip,
  SkeletonText,
} from '@chakra-ui/react';
import {
  useAccountComments,
  useSubscribe,
  useAccountVote,
  useAccount,
  useComment,
  useSubplebbit,
  useEditedComment,
  useBlock,
  useAuthorAddress,
  useAccountSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { CloseIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsChat, BsBookmark, BsEyeSlash, BsPencil, BsChatSquare, BsShield } from 'react-icons/bs';
import { GoGift, GoMute } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FcCancel } from 'react-icons/fc';
import { FiMoreHorizontal, FiBell, FiExternalLink } from 'react-icons/fi';
import { CgNotes, CgClose } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import Comment from '../../components/Post/comment';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import getUserName, { getSubName } from '../../utils/getUserName';
import numFormatter from '../../utils/numberFormater';
import Post from '../../components/Post';
import PostMedia from '../../components/Post/PostMedia';
import DropDown from '../../components/DropDown';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOutlineDeleteOutline } from 'react-icons/md';
import logger from '../../utils/logger';
import Marked from '../../components/Editor/marked';
import getIsOnline from '../../utils/getIsOnline';
import Avatar from '../../components/Avatar';
import Replies from '../../components/Post/comment/replies';
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import AddRemovalReason from '../../components/Post/Modal/addRemovalReason';
import { DeletedMessage, LockedMessage, RemovedMessage } from '../../components/Card/ModMessage';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import useRepliesAndAccountReplies from '../../hooks/useRepliesAndAccountReplies';
import usePublishUpvote from '../../hooks/usePublishUpvote';
import usePublishDownvote from '../../hooks/usePublishDownvote';
import Image from '../../components/Image';
import Link from '../../components/Link';
import { dateToNow } from '../../utils/formatDate';
import EditLabel from '../../components/Label/editLabel';
import PendingLabel from '../../components/Label/pendingLabel';
import SpoilerLabel from '../../components/Label/spoilerLabel';
import FlairLabel from '../../components/Label/flairLabel';
import AddComment from './addComment';
import EditComment from './editComment';
import useStateString from '../../hooks/useStateString';
import StateString from '../../components/Label/stateString';
import ConfirmDelete from '../../components/Post/Modal/confirmDelete';
import useStore from '../../store/useStore';

const PostContent = ({ setDetail, setSubplebbit, state }) => {
  const {
    onOpen: openRemovalModal,
    onClose: closeRemovalModal,
    isOpen: isRemovalModalOpen,
  } = useDisclosure();
  const {
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
    isOpen: isDeleteModalOpen,
  } = useDisclosure();
  const location = useLocation();
  const postDetailModal = location?.state?.modal && location?.state?.detail;
  const params = useParams();

  const feedFromProfile = location?.pathname.includes('/profile/c');
  const myPostLocation = params?.index;
  const { accountComments: myPost } = useAccountComments();
  const profilePost = myPost && myPostLocation && myPost[Number(myPostLocation)];
  // post from link or link address
  const commentFromCid = useComment({
    commentCid: !feedFromProfile ? params?.commentCid : undefined,
  });
  // const commentFromFeed = location?.state?.detail;
  // applicable if coming from feeds, if posts takes time to load uses feeds post props
  const comment = feedFromProfile ? profilePost : commentFromCid;
  let detail;
  let reply;
  let replyParent;
  let replyPost = useComment({
    commentCid: feedFromProfile ? comment?.postCid || comment?.parentCid : comment?.postCid,
  }); // if comment is a reply, this is what you replied to
  const isReply = Boolean(
    (feedFromProfile && profilePost?.parentCid) || (comment?.parentCid && comment?.depth !== 0)
  );
  if (isReply) {
    detail = replyPost;
    reply = comment;
  } else {
    detail = comment;
  }
  const replyParentaux = useComment({ commentCid: reply?.parentCid }); // incase what the reply parent is a comment also this is the parent
  replyPost = useComment({ commentCid: replyParentaux?.postCid });
  if (replyPost?.state === 'succeeded') {
    detail = replyPost;
  }
  replyParent = replyParentaux;
  if (replyPost?.cid === replyParentaux?.cid) {
    replyParent = comment;
    reply = undefined;
  }

  const sub = useSubplebbit({ subplebbitAddress: detail?.subplebbitAddress });
  const loading = detail?.state === 'fetching-ipfs' || !detail?.timestamp;
  const commentLoading = detail?.state === 'fetching-ipfs' || !detail?.updatedAt;
  const detailPending = !detail?.cid;
  const subplebbit =
    sub === undefined ? { ...detail?.subplebbit, address: detail?.subplebbitAddress } : sub;

  const mediaInfo = getCommentMediaInfo(detail);
  const hasThumbnail = !detail?.removed && detail?.thumbnailUrl && !mediaInfo;
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const [postVotes] = useState(detail?.upvoteCount || 0 - detail?.downvoteCount || 0);
  const accountVote = useAccountVote({ commentCid: detail?.cid });
  const vote = accountVote?.vote || 0;
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const bg = useColorModeValue('white', 'darkNavBg');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  // const approveColor = useColorModeValue('pastelGreen', 'pastelGreen');
  const removeColor = useColorModeValue('persimmon', 'persimmon');
  const lockColor = useColorModeValue('brightSun', 'brightSun');
  // const borderColor = useColorModeValue('#ccc', '#343536');
  const postBg = useColorModeValue('lightCommunityThemePost', 'darkCommunityThemePost');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  // const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mainMobileBg = useColorModeValue('white', 'black');
  const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
  const toast = useToast();

  const [subLoading, setSubLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
  const [copied, setCopied] = useState(false);

  const [showSpoiler, setShowSpoiler] = useState(detail?.spoiler);
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { device, baseUrl } = useStore((state) => state);
  const navigate = useNavigate();
  const [showFullComments, setShowFullComments] = useState(!isReply);

  const { blocked, unblock, block } = useBlock({ cid: detail?.cid });
  const { muted, unblock: unMute, block: mute } = useBlock({ address: detail?.subplebbitAddress });

  const upVote = usePublishUpvote(detail);
  const downVote = usePublishDownvote(detail);

  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress: detail?.subplebbitAddress,
  });

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (error) {
      logger('subscribe:response:', error, 'error');
      toast({
        title: 'Subscription declined',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUnSubscribe = async () => {
    try {
      await unsubscribe();
    } catch (error) {
      logger('unsubscribe:response:', error, 'error');
      toast({
        title: 'UnSubscribe declined',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOption = (option) => {
    if (option?.id === 'edit') {
      setEdit(true);
    } else if (option?.id === 'delete') {
      openDeleteModal();
    }
    if (option?.id === 'block') {
      blocked ? unblock() : block();
    }
    if (option?.id === 'mute') {
      muted ? unMute() : mute();
    } else openRemovalModal();
  };

  const sharePath = `${baseUrl}p/${detail?.subplebbitAddress}/c/${detail?.cid}`;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(detail?.subplebbitAddress);

  useEffect(() => {
    if (feedFromProfile && comment?.cid) {
      navigate(`/p/${comment?.subplebbitAddress}/c/${comment?.cid}/`);
    }
  }, [comment?.cid]);

  const { authorAddress, shortAuthorAddress } = useAuthorAddress({ comment: detail });
  const owner =
    profile?.author?.address === authorAddress || profile?.signer?.address === authorAddress;

  const authorPath = owner ? '/profile' : `/u/${detail?.author?.address}/c/${detail?.cid}/`;

  const comments = useRepliesAndAccountReplies(detail);

  const detailCommentCount = detail?.replyCount || 0;

  const { state: editedCommentState, editedComment } = useEditedComment({ comment: detail });

  let editLabel;
  if (editedCommentState === 'succeeded') {
    editLabel = { text: 'edited', color: 'green' };
  }
  if (editedCommentState === 'pending') {
    editLabel = { text: 'pending edit', color: 'orange' };
  }
  if (editedCommentState === 'failed') {
    editLabel = { text: 'failed edit', color: 'red' };
  }

  useEffect(() => {
    detail = editedComment;
  }, [editedComment]);

  useEffect(() => {
    setDetail({ ...detail });
    setSubplebbit({ ...subplebbit });
  }, [detail, subplebbit]);

  const stateString = useStateString(detail);

  return (
    <>
      {device !== 'mobile' ? (
        <>
          {/* head  Start*/}
          {postDetailModal ? (
            <Box
              top="48px"
              background="#030303"
              zIndex="80"
              minH="48px"
              height="48px"
              left="0"
              margin="0 auto"
              width="100%"
              position="sticky"
              right="0"
              transition="top .3s ease"
              tabIndex="-1"
            >
              <Flex
                alignItems="center"
                height="100%"
                margin="auto"
                maxWidth="1128px"
                width="100%"
                padding="0 32px"
              >
                <Flex alignItems="center" flex="1" maxW="calc(100% - 324px)" width="100%">
                  <Flex
                    as={loading && Skeleton}
                    mr="4px"
                    alignItems="center"
                    margin="0"
                    padding="0 2px"
                  >
                    <Box
                      borderRight="1px solid #a4a4a4"
                      height="16px"
                      mr="8px"
                      content=""
                      verticalAlign="text-bottom"
                      width="0"
                    />
                    <IconButton
                      aria-label="Upvote Post"
                      color={vote === 1 ? 'upvoteOrange' : iconColor}
                      w="24px"
                      h="24px"
                      bg="none"
                      minW="24px"
                      minH="24px"
                      border="none"
                      borderRadius="2px"
                      _hover={{
                        bg: iconBg,
                        color: 'upvoteOrange',
                      }}
                      _focus={{
                        outline: 'none',
                      }}
                      onClick={detail?.locked ? null : upVote}
                      icon={<Icon as={vote === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                      disabled={detail?.locked}
                    />
                    <Text
                      fontSize="12px"
                      fontWeight="700"
                      lineHeight="16px"
                      pointerEvents="none"
                      color="#D7DADC"
                      textAlign="center"
                    >
                      <Skeleton isLoaded={!loading}>
                        {postVotes === 0 ? 'vote' : numFormatter(postVotes)}
                      </Skeleton>
                    </Text>
                    <IconButton
                      aria-label="Downvote Post"
                      color={vote === -1 ? 'downvoteBlue' : iconColor}
                      w="24px"
                      h="24px"
                      minW="24px"
                      minH="24px"
                      border="none"
                      bg="none"
                      borderRadius="2px"
                      _hover={{
                        bg: iconBg,
                        color: 'downvoteBlue',
                      }}
                      _focus={{
                        outline: 'none',
                      }}
                      onClick={detail?.locked ? null : downVote}
                      icon={<Icon as={vote === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
                      disabled={detail?.locked}
                    />
                    <Box
                      borderRight="1px solid #a4a4a4"
                      height="16px"
                      margin="0 8px"
                      verticalAlign="text-bottom"
                      content=""
                      width="0"
                    />
                  </Flex>

                  <Skeleton isLoaded={!loading}>
                    <Icon as={CgNotes} mr="8px" color="#D7DADC" />
                  </Skeleton>

                  <Text
                    color="#D7DADC"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    minWidth="0"
                    ml="2px"
                    paddingRight="5px"
                    sx={{
                      '@media (max-width: 768px)': {
                        display: 'none',
                      },
                    }}
                    isTruncated
                    as={loading && Skeleton}
                  >
                    {detail?.title}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="12px"
                  lineHeight="16px"
                  fontWeight="700"
                  width="312px"
                  marginLeft="12px"
                  color="#d7dadc"
                >
                  <CloseIcon mr="5px" onClick={() => navigate(-1)} cursor="pointer" />
                  <Box onClick={() => navigate(-1)} cursor="pointer">
                    Close
                  </Box>
                </Flex>
              </Flex>
            </Box>
          ) : (
            <Box
              top="0"
              zIndex="70"
              background="#030303"
              height="48px"
              left="0"
              margin="0 auto"
              maxW="1280px"
              position="sticky"
              width="calc(100% -160px)"
              right="0"
              transition="top .3s ease"
              tabIndex="-1"
            >
              <Flex
                alignItems="center"
                height="100%"
                margin="auto"
                maxWidth="1128px"
                width="100%"
                padding="0 32px"
              >
                <Flex alignItems="center" flex="1" maxW="calc(100% - 324px)" width="100%">
                  <Skeleton mr="4px" isLoaded={!loading}>
                    <Flex mr="4px" alignItems="center" margin="0" padding="0 2px">
                      <Box
                        borderRight="1px solid #a4a4a4"
                        height="16px"
                        mr="8px"
                        content=""
                        verticalAlign="text-bottom"
                        width="0"
                      />
                      <IconButton
                        aria-label="Upvote Post"
                        color={vote === 1 ? 'upvoteOrange' : iconColor}
                        w="24px"
                        h="24px"
                        bg="none"
                        minW="24px"
                        minH="24px"
                        border="none"
                        borderRadius="2px"
                        _hover={{
                          bg: iconBg,
                          color: 'upvoteOrange',
                        }}
                        _focus={{
                          outline: 'none',
                        }}
                        onClick={detail?.locked ? null : upVote}
                        icon={<Icon as={vote === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                        disabled={detail?.locked}
                      />
                      <Text
                        fontSize="12px"
                        fontWeight="700"
                        lineHeight="16px"
                        pointerEvents="none"
                        color="#D7DADC"
                        textAlign="center"
                      >
                        <Skeleton isLoaded={!loading}>
                          {postVotes === 0 ? 'vote' : numFormatter(postVotes)}
                        </Skeleton>
                      </Text>
                      <IconButton
                        aria-label="Downvote Post"
                        color={vote === -1 ? 'downvoteBlue' : iconColor}
                        w="24px"
                        h="24px"
                        minW="24px"
                        minH="24px"
                        border="none"
                        bg="none"
                        borderRadius="2px"
                        _hover={{
                          bg: iconBg,
                          color: 'downvoteBlue',
                        }}
                        _focus={{
                          outline: 'none',
                        }}
                        onClick={detail?.locked ? null : downVote}
                        icon={<Icon as={vote === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
                        disabled={detail?.locked}
                      />
                      <Box
                        borderRight="1px solid #a4a4a4"
                        height="16px"
                        margin="0 8px"
                        verticalAlign="text-bottom"
                        content=""
                        width="0"
                      />
                    </Flex>
                  </Skeleton>
                  <Skeleton isLoaded={!loading}>
                    <Icon as={CgNotes} mr="8px" color="#D7DADC" />
                  </Skeleton>

                  <Text
                    color="#D7DADC"
                    fontSize="14px"
                    fontWeight="500"
                    lineHeight="18px"
                    minWidth="0"
                    ml="2px"
                    paddingRight="5px"
                    sx={{
                      '@media (max-width: 768px)': {
                        display: 'none',
                      },
                    }}
                    isTruncated
                    as={loading && Skeleton}
                  >
                    {detail?.title}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="12px"
                  lineHeight="16px"
                  fontWeight="700"
                  width="312px"
                  marginLeft="12px"
                  color="#d7dadc"
                >
                  <CloseIcon mr="5px" onClick={() => navigate(-1)} cursor="pointer" />
                  <Box onClick={() => navigate(-1)} cursor="pointer">
                    Close
                  </Box>
                </Flex>
              </Flex>
            </Box>
          )}
          {/* head  End */}

          {/* body */}
          <Flex
            tabIndex="-1"
            justifyContent="center"
            margin="0 auto"
            maxWidth="1280px"
            paddingBottom="32px"
            position="relative"
            width="calc(100% - 160px)"
          >
            <Box
              maxW="740px"
              flex="1"
              margin="32px 12px 32px 32px"
              minH="100vh"
              minW="0"
              paddingBottom="1px"
              width="100%"
              wordBreak="break-word"
            >
              {/* Main */}
              <Flex width="100%" bg={bg} borderRadius="4px">
                {/* vote column */}
                <Flex display="flex">
                  <Flex
                    flexDir="column"
                    w="40px"
                    h="revert"
                    borderLeft="4px solid transparent"
                    borderRadius="4px"
                    bg="none"
                    alignItems="center"
                    p="8px 4px 8px 0"
                    sx={{
                      '@media (max-width: 960px)': {
                        display: 'none',
                      },
                    }}
                  >
                    <Skeleton isLoaded={!loading}>
                      <>
                        <IconButton
                          aria-label="Upvote Post"
                          color={vote === 1 ? 'upvoteOrange' : iconColor}
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={{
                            bg: iconBg,
                            color: 'upvoteOrange',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={detail?.locked ? null : upVote}
                          icon={<Icon as={vote === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                          disabled={detail?.locked}
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color=""
                          textAlign="center"
                        >
                          {postVotes === 0 ? 'vote' : numFormatter(postVotes)}
                        </Text>
                        <IconButton
                          aria-label="Downvote Post"
                          color={vote === -1 ? 'downvoteBlue' : iconColor}
                          w="24px"
                          h="24px"
                          minW="24px"
                          minH="24px"
                          border="none"
                          bg="none"
                          borderRadius="2px"
                          _hover={{
                            bg: iconBg,
                            color: 'downvoteBlue',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={detail?.locked ? null : downVote}
                          icon={<Icon as={vote === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />}
                          disabled={detail?.locked}
                        />
                      </>
                    </Skeleton>
                  </Flex>
                </Flex>
                {/* post Details */}
                <Flex flexDir="column" paddingTop="8px" flex="1">
                  {/* post Head */}

                  <Flex
                    alignItems="start"
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    margin="0 8px 8px"
                  >
                    <Avatar
                      width={20}
                      height={20}
                      style={{
                        marginRight: '8px',
                      }}
                      badge
                      isOnline={getIsOnline(subplebbit?.updatedAt)}
                      loading={loading}
                    />

                    <Skeleton isLoaded={!loading}>
                      <Flex
                        alignItems="center"
                        flexWrap="wrap"
                        flex="1 1 auto"
                        justifyContent="space-between"
                        position="relative"
                      >
                        <Box display="inline">
                          <Box display="inline-block" flex="0 0 auto">
                            <Box
                              color={subPledditTextColor}
                              fontSize="12px"
                              fontWeight="700"
                              display="inline"
                              lineHeight="20px"
                              textDecoration="none"
                              cursor="pointer"
                              as={Link}
                              to={`/p/${detail?.subplebbitAddress}/`}
                            >
                              {getSubName(subplebbit)}
                            </Box>
                          </Box>
                          <Text
                            color={separatorColor}
                            as="span"
                            verticalAlign="middle"
                            fontSize="6px"
                            lineHeight="20px"
                            margin="0 4px"
                          >
                            •
                          </Text>
                          <Text color={misCol} as="span" marginRight="3px">
                            Posted By
                          </Text>

                          <Link
                            fontWeight="400"
                            mr="3px"
                            textDecor="none"
                            fontSize="12px"
                            lineHeight="16px"
                            color={misCol}
                            marginRight="3px"
                            to={authorPath}
                          >
                            {getUserName(detail?.author)}
                          </Link>

                          {detail?.author?.flair && (
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
                                {detail?.author?.flair?.text}
                              </Text>
                            </Box>
                          )}
                          <Link color={misCol}>
                            {dateToNow(parseInt(detail?.timestamp * 1000))} ago
                          </Link>
                          <StateString stateString={stateString} />
                        </Box>
                        {detail?.locked && <Icon as={HiLockClosed} color={lockColor} />}
                        {detail?.removed && (
                          <Flex
                            ml="4px"
                            cursor="pointer"
                            color={removeColor}
                            alignItems="center"
                            onClick={() => (!detail?.reason ? openRemovalModal() : {})}
                          >
                            <Icon as={FcCancel} color={removeColor} />
                            {!detail?.reason ? (
                              isSpecial && <Box mx="3px">Add a removal reason</Box>
                            ) : (
                              <Tooltip
                                fontSize="10px"
                                label="removal reason"
                                aria-label="removal reason"
                                placement="top"
                              >
                                <Text
                                  color={misCol}
                                  mr="3px"
                                  textDecor="none"
                                  display="inline-block"
                                  flex="0 0 auto"
                                >
                                  {detail?.reason}
                                </Text>
                              </Tooltip>
                            )}
                          </Flex>
                        )}

                        {/* <PdMenu /> */}
                      </Flex>
                    </Skeleton>
                    <Flex as={loading && Skeleton} ml="auto">
                      <Icon
                        sx={{
                          '@media (min-width: 1280px)': {},
                          '@media (max-width: 1120px)': {
                            display: 'none',
                          },
                        }}
                        as={FiBell}
                        height="16px"
                        width="16px"
                      />
                    </Flex>
                  </Flex>
                  {/* post Title */}

                  <Flex as={loading && Skeleton} margin="0 8px" display="flex" alignItems="center">
                    <Text
                      color={titleColor}
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="22px"
                      paddingRight="5px"
                      wordBreak="break-word"
                    >
                      {detail?.title}{' '}
                    </Text>
                  </Flex>
                  <Flex
                    as={loading && Skeleton}
                    margin="2px 8px"
                    display="flex"
                    alignItems="center"
                  >
                    {detail?.flair?.text ? <FlairLabel flair={detail?.flair} /> : null}
                    {detail?.spoiler && <SpoilerLabel />}
                    {detailPending && <PendingLabel />}
                    {/* edit status */}
                    <EditLabel editLabel={editLabel} post={detail} />
                  </Flex>
                  {/* post Body */}
                  {edit ? (
                    <EditComment detail={detail} setEdit={setEdit} />
                  ) : detail?.removed ? (
                    <RemovedMessage subplebbit={subplebbit} />
                  ) : detail?.deleted ? (
                    <DeletedMessage />
                  ) : showSpoiler ? (
                    <Flex alignItems="center" justifyContent="center">
                      <Button
                        variant="outline"
                        colorScheme="blackAlpha"
                        padding="10px 20px"
                        onClick={() => setShowSpoiler(false)}
                        borderRadius="none"
                        fontWeight="400"
                        my="10px"
                      >
                        CLICK TO SEE SPOILER
                      </Button>
                    </Flex>
                  ) : (
                    <Box marginTop="8px">
                      {detail?.content ? (
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
                          <SkeletonText noOfLines={4} isLoaded={!loading}>
                            <Marked content={detail?.content} />
                          </SkeletonText>
                        </Box>
                      ) : (
                        <Box width="100%" display="flex" justifyContent="center">
                          <Skeleton width="100%" isLoaded={!loading}>
                            <Box w="100%">
                              <Box w="100%" mt="0" textAlign="left">
                                {hasThumbnail && (
                                  <Link
                                    fontSize="12px"
                                    fontWeight="400"
                                    lineHeight="16px"
                                    margin="4px 8px"
                                    whiteSpace="nowrap"
                                    color="mainBlue"
                                    display="flex"
                                    href={detail?.link}
                                    alignItems="flex-end"
                                    isExternal={!detail?.thumbnailUrl}
                                  >
                                    <Box>{detail?.link?.substring(0, 20) + '...'}</Box>
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
                                )}
                              </Box>
                              <PostMedia post={detail} />
                            </Box>
                          </Skeleton>
                        </Box>
                      )}
                    </Box>
                  )}
                  {/* Post Bottom Bar */}
                  {detailPending ? (
                    !loading && <Flex padding="15px" />
                  ) : isSpecial ? (
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      paddingRight="10px"
                      overflowY="visible"
                      mb="2px"
                      color={iconColor}
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="stretch"
                        flexGrow={1}
                        padding="0 8px 0 4px"
                        fontSize="12px"
                        fontWeight="700"
                        lineHeight="16px"
                      >
                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <Icon as={BsChatSquare} height={5} width={5} mr="5px" />
                          <Box as={loading && Skeleton}>
                            {detailCommentCount} Comment
                            {detailCommentCount === 1 ? '' : 's'}
                          </Box>
                        </Link>
                        <Flex
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <Icon as={GoGift} height={5} width={5} mr="5px" />
                          <Box>Award</Box>
                        </Flex>
                        <CopyToClipboard text={sharePath} onCopy={handleCopy}>
                          <Box
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={{
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            }}
                            _focus={{
                              boxShadow: 'none',
                            }}
                          >
                            <Icon as={FaShare} height={5} width={5} mr="5px" />
                            <Box>{copied ? 'Copied' : 'Share'}</Box>
                          </Box>
                        </CopyToClipboard>

                        {detail?.removed ? (
                          <Flex
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={{
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            }}
                            _focus={{
                              boxShadow: 'none',
                            }}
                            onClick={() => handleOption({ id: 'approved' })}
                            color={iconColor}
                          >
                            <Icon as={HiOutlineCheckCircle} height={5} width={5} mr="5px" />
                            <Box>Approve</Box>
                          </Flex>
                        ) : (
                          <Flex
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={{
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            }}
                            _focus={{
                              boxShadow: 'none',
                            }}
                            color={iconColor}
                            onClick={() => handleOption({ id: 'removed' })}
                          >
                            <Icon as={TiDeleteOutline} height={5} width={5} mr="5px" />
                            <Box>Remove</Box>
                          </Flex>
                        )}

                        <Flex justifyContent="center">
                          <DropDown
                            onChange={(val) => handleOption(val)}
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
                                <Icon as={BsShield} color={iconColor} h="20px" w="20px" />
                              </Flex>
                            }
                            options={[
                              {
                                label: 'Sticky Post',
                                icon: detail?.pinned ? MdCheckBox : MdCheckBoxOutlineBlank,
                                id: 'pinned',
                              },
                              {
                                label: 'Lock Comments',
                                icon: detail?.locked ? MdCheckBox : MdCheckBoxOutlineBlank,
                                id: 'locked',
                              },
                              {
                                label: 'Mark As Spoiler',
                                icon: detail?.spoiler ? MdCheckBox : MdCheckBoxOutlineBlank,
                                id: 'spoiler',
                              },
                            ]}
                            rightOffset={0}
                            leftOffset="none"
                            topOffset="34px"
                          />
                        </Flex>

                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <DropDown
                            topOffset="30px"
                            width="215px"
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
                              >
                                <Icon as={FiMoreHorizontal} color={iconColor} h="20px" w="20px" />
                              </Flex>
                            }
                            options={[
                              {
                                label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subplebbit)}`,
                                icon: GoMute,
                                id: 'mute',
                              },
                              {
                                label: blocked ? 'Unhide' : 'Hide',
                                icon: BsEyeSlash,
                                id: 'block',
                              },
                              {
                                label: 'Edit Post',
                                icon: BsPencil,
                                id: 'edit',
                                disabled: !owner,
                              },
                              {
                                label: 'Save',
                                icon: BsBookmark,
                                id: 'save',
                              },

                              {
                                label: 'Delete',
                                icon: MdOutlineDeleteOutline,
                                id: 'delete',
                                disabled: !owner,
                              },
                            ]}
                            render={(item) => (
                              <Flex
                                alignItems="center"
                                padding="8px"
                                fontSize="14px"
                                lineHeight="18px"
                                fontWeight="500"
                                color={iconColor}
                                borderTop={`1px solid ${border2}`}
                                textTransform="capitalize"
                                _hover={{
                                  bg: bottomButtonHover,
                                }}
                                onClick={() => handleOption(item)}
                              >
                                <Icon as={item?.icon} w="20px" h="20px" mr="6px" />
                                <Box>{item?.label}</Box>
                              </Flex>
                            )}
                          />
                        </Link>
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      paddingRight="10px"
                      overflowY="visible"
                      mb="2px"
                      color={iconColor}
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="stretch"
                        flexGrow={1}
                        padding="0 8px 0 4px"
                        fontSize="12px"
                        fontWeight="700"
                        lineHeight="16px"
                      >
                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <Icon as={BsChat} height={5} width={5} mr="5px" />
                          <Box as={loading && Skeleton}>
                            {detailCommentCount} Comment
                            {detailCommentCount === 1 ? '' : 's'}
                          </Box>
                        </Link>
                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <Icon as={GoGift} height={5} width={5} mr="5px" />
                          <Box>Award</Box>
                        </Link>
                        <CopyToClipboard text={sharePath} onCopy={handleCopy}>
                          <Box
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={{
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            }}
                            _focus={{
                              boxShadow: 'none',
                            }}
                          >
                            <Icon as={FaShare} height={5} width={5} mr="5px" />
                            <Box>{copied ? 'Copied' : 'Share'}</Box>
                          </Box>
                        </CopyToClipboard>

                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <Icon as={BsBookmark} height={5} width={5} mr="5px" />
                          <Box>save</Box>
                        </Link>

                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={{
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          }}
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <DropDown
                            topOffset="30px"
                            width="215px"
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
                              >
                                <Icon as={FiMoreHorizontal} color={iconColor} h="20px" w="20px" />
                              </Flex>
                            }
                            options={[
                              {
                                label: `${muted ? 'UnMuted' : 'Mute'} ${getSubName(subplebbit)}`,
                                icon: GoMute,
                                id: 'mute',
                              },
                              {
                                label: blocked ? 'Unhide' : 'Hide',
                                icon: BsEyeSlash,
                                id: 'block',
                              },
                              {
                                label: 'Edit Post',
                                icon: BsPencil,
                                id: 'edit',
                                disabled: !owner,
                              },

                              {
                                label: 'Delete',
                                icon: MdOutlineDeleteOutline,
                                id: 'delete',
                                disabled: !owner,
                              },
                            ]}
                            render={(item) => (
                              <Flex
                                alignItems="center"
                                padding="8px"
                                fontSize="14px"
                                lineHeight="18px"
                                fontWeight="500"
                                color={iconColor}
                                borderTop={`1px solid ${border2}`}
                                textTransform="capitalize"
                                _hover={{
                                  bg: bottomButtonHover,
                                }}
                                onClick={() => handleOption(item)}
                              >
                                <Icon as={item?.icon} w="20px" h="20px" mr="6px" />
                                <Box>{item?.label}</Box>
                              </Flex>
                            )}
                          />
                        </Link>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Box maxW="100%" bg={bg} mt="10px" padding="10px">
                <AddComment
                  detail={detail}
                  subplebbit={subplebbit}
                  showFullComments={showFullComments}
                  setShowFullComments={setShowFullComments}
                  isReply={isReply}
                />
                {isReply && !showFullComments ? (
                  <Replies
                    loading={loading}
                    parent={replyParent}
                    reply={reply}
                    disableReplies={detail?.locked}
                  />
                ) : null}
                {showFullComments &&
                  comments?.map((comment, index) => (
                    <Comment
                      loading={commentLoading}
                      comment={comment}
                      key={index || comment.cid}
                      parentCid={detail?.cid}
                      disableReplies={detail?.locked}
                    />
                  ))}
              </Box>
            </Box>
            <SideBar
              margin="32px 0"
              borderRadius="4px"
              padding="0"
              right="0"
              top="0"
              width="312px"
              sx={{
                '@media (max-width: 1120px)': {
                  display: 'none',
                },
              }}
              handleSubscribe={handleSubscribe}
              handleUnSubscribe={handleUnSubscribe}
              subLoading={subLoading}
              setSubLoading={setSubLoading}
              subscribed={subscribed}
              detail={detail}
              loading={loading}
              subplebbit={subplebbit}
            />
          </Flex>
        </>
      ) : (
        <Box>
          <Box>
            <Box position="relative" bg={mainMobileBg}>
              <Box position="relative">
                <Box paddingTop="0">
                  <Box
                    backgroundPosition="top"
                    backgroundRepeat="no-repeat"
                    backgroundSize="auto 96px"
                    overflow="hidden"
                    paddingTop="48px"
                    position="relative"
                    backgroundColor="#212a3b"
                  >
                    <Box
                      backgroundPosition="50%"
                      backgroundSize="cover"
                      left="0"
                      paddingTop="30%"
                      position="absolute"
                      right="0"
                      top="0"
                    />
                    <Box
                      bottom="20px"
                      left="0"
                      pos="absolute"
                      right="0"
                      top="0"
                      as={Link}
                      to={`/p/${detail?.subplebbitAddress}/`}
                    />
                    <Box
                      backgroundColor={mainMobileBg}
                      borderRadius="20px 20px 0 0"
                      position="relative"
                      pt="20px"
                    >
                      <Icon
                        onClick={() => navigate(-1)}
                        as={CgClose}
                        color={mobileColor}
                        fill={mobileColor}
                        width={6}
                        height={6}
                        lineHeight="20px"
                        verticalAlign="middle"
                        bg="#efefed"
                        position="absolute"
                        borderRadius="50%"
                        right="16px"
                        top="16px"
                        pointerEvents="all"
                        _before={{
                          verticalAlign: 'inherit',
                        }}
                      />
                      <Flex alignItems="center" flexFlow="column nowrap">
                        <Skeleton
                          isLoaded={!loading}
                          width="72px"
                          height="72px"
                          borderRadius="50%"
                          mb="8px"
                        >
                          <Avatar
                            width={72}
                            height={72}
                            avatar={subplebbit?.suggested?.avatarUrl}
                            badge
                            isOnline={getIsOnline(subplebbit?.updatedAt)}
                            style={{
                              marginRight: '8px',
                            }}
                          />
                        </Skeleton>
                        <Skeleton margin="5px" isLoaded={!loading}>
                          <Box
                            fontWeight="700"
                            lineHeight="18px"
                            margin="5px"
                            textAlign="center"
                            cursor="pointer"
                            as={Link}
                            to={`/p/${detail?.subplebbitAddress}/`}
                          >
                            {getSubName(subplebbit)}
                          </Box>
                        </Skeleton>
                      </Flex>
                    </Box>
                  </Box>
                  {edit ? (
                    <EditComment detail={detail} setEdit={setEdit} />
                  ) : (
                    <Flex flexDir="column">
                      <Post
                        detail
                        post={detail}
                        mode="card"
                        key={detail?.cid}
                        handleOption={handleOption}
                        loading={loading}
                      />
                    </Flex>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box width="100%" minH="calc(100vh - 48px)">
            <Box padding="8px 16px 4px">
              <Box
                _before={{
                  content: `" "`,
                  display: 'table',
                }}
                _after={{
                  content: `" "`,
                  display: 'table',
                  clear: 'both',
                }}
              >
                <Box w="100%" lineHeight="1.5" mr="0" maxW="100%" padding="4px 0">
                  <Flex alignItems="center" flexFlow="row nowrap">
                    <Box>
                      {detailCommentCount} comment{detailCommentCount > 1 ? 's' : ''}
                    </Box>
                  </Flex>
                </Box>

                <AddComment
                  detail={detail}
                  subplebbit={subplebbit}
                  showFullComments={showFullComments}
                  setShowFullComments={setShowFullComments}
                  isReply={isReply}
                />
              </Box>
            </Box>
            <Box padding="16px" maxW="100%">
              {isReply ? (
                <Replies
                  loading={loading}
                  parent={replyParent}
                  reply={reply}
                  disableReplies={detail?.locked}
                />
              ) : null}
              {showFullComments &&
                comments.map((comment) => (
                  <Comment
                    loading={commentLoading}
                    comment={comment}
                    key={comment.cid}
                    disableReplies={detail?.locked}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      )}

      {isRemovalModalOpen && (
        <AddRemovalReason isOpen={isRemovalModalOpen} onClose={closeRemovalModal} post={detail} />
      )}
      {isDeleteModalOpen && (
        <ConfirmDelete isOpen={isDeleteModalOpen} onClose={closeDeleteModal} post={detail} />
      )}
    </>
  );
};

export default PostContent;
