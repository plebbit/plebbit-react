import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Link,
  Image,
  Tag,
  useToast,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { useAccountsActions, useComment, useSubplebbit } from '@plebbit/plebbit-react-hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { CloseIcon, LinkIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsChat, BsBookmark, BsEyeSlash, BsPencil } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiShare, FiBell } from 'react-icons/fi';
import { CgNotes, CgClose } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import { dateToNow } from '../../../utils/formatDate';
import Comment from '../comment';
import Editor from '../../Editor';
import { ProfileContext } from '../../../store/profileContext';
import { useHistory, useLocation } from 'react-router-dom';
import getUserName, { getAddress, getSubName } from '../../../utils/getUserName';
import numFormatter from '../../../utils/numberFormater';
import Post from '..';
import DropDown from '../../DropDown';
import { MdOutlineDeleteOutline, MdStickyNote2 } from 'react-icons/md';
import logger from '../../../utils/logger';
import Layout from '../../layout';
import Marked from '../../Editor/marked';
import getIsOnline from '../../../utils/getIsOnline';
import Avatar from '../../Avatar';
import onError from '../../../utils/onError';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';
import Replies from '../comment/replies';

function PostDetail() {
  const location = useLocation();

  // post from link or link address
  const det = useComment(
    window.location.hash?.substring(window.location.hash.lastIndexOf('/') + 1)
  );
  // applicable if coming from feeds, if posts takes time to load uses feeds post props
  const dat = det === undefined ? location?.state?.detail : det;
  let detail;
  let reply;
  let replyParent;
  let replyPost = useComment(dat?.postCid); // if comment is a reply, this is what you replied to
  const isReply = dat?.depth !== 0;
  if (isReply) {
    detail = replyPost;
    reply = dat;
  } else {
    detail = dat;
  }
  const replyParentaux = useComment(reply?.parentCid);
  replyParent = replyParentaux;
  if (dat?.depth === 1) {
    replyParent = dat;
    reply = undefined;
  }

  const sub = useSubplebbit(detail?.subplebbitAddress);
  const loading = detail !== undefined;
  const subplebbit = sub === undefined ? { address: detail?.subplebbitAddress } : sub;
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const detBg = useColorModeValue('#bbbdbf', '#030303');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const vote = detail?.upvoteCount - detail?.downvoteCount;
  const [voteMode, setVoteMode] = useState(0);
  const subPledditTextColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const bg = useColorModeValue('white', 'darkNavBg');
  const statusColor = useColorModeValue('lightVoteText', 'fff');
  const statusBg = useColorModeValue('rgb(237, 239, 241);', 'rgb(52, 53, 54)');
  const misCol = useColorModeValue('rgb(120, 124, 126)', 'rgb(129, 131, 132)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mainMobileBg = useColorModeValue('white', 'black');
  const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
  const toast = useToast();
  const { publishVote, publishComment, publishCommentEdit, subscribe, unsubscribe } =
    useAccountsActions();
  const [subLoading, setSubLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPost, setEditPost] = useState(detail?.content);
  const [content, setContent] = useState(detail?.content);
  const [link, setLink] = useState(detail?.link);
  const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
  const [copied, setCopied] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [postEditorState, setPostEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${editPost}</p>`))
    )
  );
  const { device, postStyle, profile, mode, subscriptions, authorAvatarImageUrl } =
    useContext(ProfileContext);
  const history = useHistory();
  const [showMEditor, setShowMEditor] = useState(false);

  const onChallengeVerification = (challengeVerification) => {
    if (challengeVerification.challengeSuccess === true) {
      toast({
        title: 'Accepted.',
        description: 'Action accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setContent('');
      setEdit(false);
      setEditorState(EditorState.createEmpty());
      logger('challenge success', { publishedCid: challengeVerification.publication.cid }, 'trace');
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challenge failed',
        {
          reason: challengeVerification.reason,
          errors: challengeVerification.challengeErrors,
        },
        'error'
      );
      toast({
        title: challengeVerification.reason ? challengeVerification.reason : 'Declined.',
        description: challengeVerification.challengeErrors
          ? challengeVerification.challengeErrors.join(',')
          : 'Challenge Verification Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setEdit(false);
    }
  };

  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('decline challenge', error, 'trace');
      toast({
        title: 'Declined.',
        description: error?.message || 'failed Challenge',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (challengeAnswers) {
      await comment.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleVote = async (vote) => {
    try {
      await publishVote({
        vote,
        commentCid: detail?.cid,
        subplebbitAddress: detail?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
      });
    } catch (error) {
      logger('post:detail:voting:', error, 'error');

      toast({
        title: 'Voting Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePublishPost = async () => {
    try {
      await publishComment({
        content,
        postCid: detail?.cid, // the thread the comment is on
        parentCid: detail?.cid, // if top level reply to a post, same as postCid
        subplebbitAddress: detail?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
      });
    } catch (error) {
      toast({
        title: 'Comment Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      logger('post:comment:response:', error);
    }
  };
  const handleEditPost = async (cid, content, address) => {
    try {
      setEditLoading(true);
      await publishCommentEdit({
        commentCid: cid,
        content,
        link,
        subplebbitAddress: address,
        onChallenge,
        onChallengeVerification,
        onError: onError,
      });
      setEditLoading(false);
    } catch (error) {
      logger('edit:comment:response:', error, 'error');
      setEditLoading(false);
      toast({
        title: 'Comment Edit Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleDeletePost = async (cid, address) => {
    try {
      setEditLoading(true);
      await publishCommentEdit({
        commentCid: cid,
        deleted: true,
        subplebbitAddress: address,
        onChallenge,
        onChallengeVerification,
        onError: onError,
      });
      setEditLoading(false);
    } catch (error) {
      logger('delete:comment:response:', error, 'error');
      setSubLoading(false);
      toast({
        title: 'Deleting declined',
        description: error?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubscribe = async () => {
    try {
      setSubLoading(true);
      await subscribe(detail?.subplebbitAddress);
      toast({
        title: 'Subscription.',
        description: 'Joined successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSubLoading(false);
    } catch (error) {
      logger('subscribe:response:', error, 'error');
      setSubLoading(false);
      toast({
        title: 'Subscription declined',
        description: error?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUnSubscribe = async () => {
    try {
      setSubLoading(true);
      await unsubscribe(detail?.subplebbitAddress);
      toast({
        title: 'Unsubscribed.',
        description: 'Unsubscribed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSubLoading(false);
    } catch (error) {
      logger('unsubscribe:response:', error, 'error');

      setSubLoading(false);
      toast({
        title: 'UnSubscribe declined',
        description: error?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOption = (option) => {
    if (option?.id === 'Edit') {
      setEdit(true);
    }
    if (option?.id === 'Delete') {
      Swal.fire({
        title: 'Do you want to delete this post?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        icon: 'warning',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleDeletePost(detail?.cid, detail?.subplebbitAddress);
        }
      });
    }
  };

  logger('feed:detail', {
    address: window.location.hash?.substring(window.location.hash.lastIndexOf('/') + 1),
    detail,
  });

  return (
    <Layout
      name={{
        label:
          subplebbit?.title ||
          getSubName(subplebbit) ||
          getAddress(window.location.hash?.substring(window.location.hash.lastIndexOf('/') + 1)),
        value: location?.pathname,
      }}
    >
      <Box maxWidth="100%">
        {device !== 'mobile' ? (
          <Box>
            <Box
              top="48px"
              backgroundColor="rgba(28,28,28,.9)"
              bottom="0"
              height="100%"
              left="0"
              position="fixed"
              right="0"
              width="100%"
              zIndex="50"
              _after={{
                background: detBg,
                bottom: '0',
                height: '100%',
                content: `" "`,
                left: '0',
                margin: '0 auto',
                maxWidth: '1280px',
                position: 'fixed',
                right: '0',
                width: 'calc(100% - 160px)',
                top: '0',
              }}
            >
              <Box
                top="48px"
                bottom="0"
                height="100%"
                left="0"
                position="fixed"
                right="0"
                width="100%"
                zIndex="50"
                sx={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <Box
                  height="100%"
                  overflowY="auto"
                  position="relative"
                  width="100%"
                  willChange="transform"
                  sx={{
                    contain: 'layout style size',
                  }}
                >
                  {/* head */}
                  <Box
                    background="#030303"
                    height="48px"
                    left="0"
                    margin="0 auto"
                    maxW="1280px"
                    position="sticky"
                    right="0"
                    top="0"
                    transition="top .3s ease"
                    width="calc(100% -160px)"
                    zIndex="70"
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
                        <Skeleton mr="4px" isLoaded={loading}>
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
                              color={voteMode === 1 ? 'upvoteOrange' : iconColor}
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
                              onClick={() => {
                                setVoteMode(voteMode === 1 ? 0 : 1);
                                handleVote(voteMode === 1 ? 0 : 1);
                              }}
                              icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                            />
                            <Text
                              fontSize="12px"
                              fontWeight="700"
                              lineHeight="16px"
                              pointerEvents="none"
                              color="#D7DADC"
                            >
                              <Skeleton isLoaded={loading}>
                                {vote + voteMode === 0
                                  ? 'vote'
                                  : numFormatter(vote + voteMode) || 0}
                              </Skeleton>
                            </Text>
                            <IconButton
                              aria-label="Downvote Post"
                              color={voteMode === -1 ? 'downvoteBlue' : iconColor}
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
                              onClick={() => {
                                setVoteMode(voteMode === -1 ? 0 : -1);
                                handleVote(voteMode === -1 ? 0 : -1);
                              }}
                              icon={
                                <Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />
                              }
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
                        <Skeleton isLoaded={loading}>
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
                        <CloseIcon mr="5px" onClick={() => history.goBack()} cursor="pointer" />
                        <Box onClick={() => history.goBack()} cursor="pointer">
                          Close
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
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
                            <Skeleton isLoaded={loading}>
                              <>
                                <IconButton
                                  aria-label="Upvote Post"
                                  color={voteMode === 1 ? 'upvoteOrange' : iconColor}
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
                                  onClick={() => {
                                    setVoteMode(voteMode === 1 ? 0 : 1);
                                    handleVote(voteMode === 1 ? 0 : 1);
                                  }}
                                  icon={
                                    <Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />
                                  }
                                />
                                <Text
                                  fontSize="12px"
                                  fontWeight="700"
                                  lineHeight="16px"
                                  pointerEvents="none"
                                  color=""
                                >
                                  {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
                                </Text>
                                <IconButton
                                  aria-label="Downvote Post"
                                  color={voteMode === -1 ? 'downvoteBlue' : iconColor}
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
                                  onClick={() => {
                                    setVoteMode(voteMode === -1 ? 0 : -1);
                                    handleVote(voteMode === -1 ? 0 : -1);
                                  }}
                                  icon={
                                    <Icon
                                      as={voteMode === -1 ? ImArrowDown : BiDownvote}
                                      w={4}
                                      h={4}
                                    />
                                  }
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
                            <Skeleton
                              isLoaded={loading}
                              mr="8px"
                              width="20px"
                              height="20px"
                              borderRadius="50%"
                            >
                              <Avatar
                                width={20}
                                height={20}
                                mr="8px"
                                badge
                                isOnline={getIsOnline(subplebbit?.updatedAt)}
                              />
                            </Skeleton>
                            <Skeleton isLoaded={loading}>
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
                                      onClick={() =>
                                        history.push(`/p/${detail?.subplebbitAddress}`, [])
                                      }
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
                                </Box>
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
                                {/* <PdMenu /> */}
                              </Flex>
                            </Skeleton>
                          </Flex>
                          {/* post Title */}
                          <Flex margin="0 8px" display="flex" alignItems="center">
                            <Text
                              color={titleColor}
                              fontSize="18px"
                              fontWeight="500"
                              lineHeight="22px"
                              paddingRight="5px"
                              wordBreak="break-word"
                            >
                              {detail?.title}{' '}
                              {detail?.flair?.text && (
                                <Tag
                                  borderRadius="20px"
                                  p="2px 8px"
                                  mr="5px"
                                  background={detail?.flair?.backgroundColor}
                                  color={detail?.flair?.textColor}
                                >
                                  {detail?.flair.text}
                                </Tag>
                              )}
                            </Text>
                          </Flex>
                          {/* post Body */}
                          {edit ? (
                            <Box marginTop="8px" padding="10px">
                              <Flex alignItems="stretch">
                                <Flex
                                  color={color}
                                  fontSize="14px"
                                  fontWeight="700"
                                  lineHeight="18px"
                                  cursor="pointer"
                                  outline="none"
                                  zIndex="1"
                                  width="25%"
                                  position="relative"
                                  textAlign="center"
                                  borderColor="#a4a4a4"
                                  borderStyle="solid"
                                  borderWidth="0 1px 1px 0"
                                  borderRadius="0"
                                  justifyContent="center"
                                  alignItems="center"
                                  whiteSpace="nowrap"
                                  padding="15px 17px"
                                  borderBottom={editMode === 'post' && '3px solid #a4a4a4'}
                                  onClick={() => {
                                    setEditMode('post');
                                    setLink('');
                                  }}
                                >
                                  <Icon
                                    as={MdStickyNote2}
                                    fontSize="20px"
                                    fontWeight="400"
                                    height="20px"
                                    lineHeight="20px"
                                    verticalAlign="middle"
                                    width="20px"
                                    marginRight="8px"
                                  />
                                  Post
                                </Flex>
                                <Flex
                                  color={color}
                                  fontSize="14px"
                                  fontWeight="700"
                                  lineHeight="18px"
                                  cursor="pointer"
                                  outline="none"
                                  zIndex="1"
                                  width="25%"
                                  position="relative"
                                  textAlign="center"
                                  borderColor="#a4a4a4"
                                  borderStyle="solid"
                                  borderWidth="0 1px 1px 0"
                                  borderBottom={editMode === 'link' && '3px solid #a4a4a4'}
                                  borderRadius="0"
                                  justifyContent="center"
                                  alignItems="center"
                                  whiteSpace="nowrap"
                                  padding="15px 17px"
                                  onClick={() => {
                                    setEditMode('link');
                                    setContent('');
                                  }}
                                >
                                  <LinkIcon
                                    fontSize="20px"
                                    fontWeight="400"
                                    height="20px"
                                    lineHeight="20px"
                                    verticalAlign="middle"
                                    width="20px"
                                    marginRight="8px"
                                  />
                                  Link
                                </Flex>
                              </Flex>
                              <Editor
                                editorState={postEditorState}
                                setEditorState={setPostEditorState}
                                setValue={setEditPost}
                              />
                              <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                                <Button
                                  borderRadius="999px"
                                  border="transparent"
                                  bg="transparent"
                                  onClick={() => setEdit(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  borderRadius="999px"
                                  padding="5px 10px"
                                  minW="90px"
                                  minH="27px"
                                  onClick={() =>
                                    handleEditPost(detail?.cid, editPost, detail?.subplebbitAddress)
                                  }
                                  isLoading={editLoading}
                                >
                                  Save
                                </Button>
                              </Flex>
                            </Box>
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
                                  <Skeleton isLoaded={loading}>
                                    <Marked content={detail?.content} />
                                  </Skeleton>
                                </Box>
                              ) : (
                                <Box display="flex" justifyContent="center">
                                  <Skeleton isLoaded={loading}>
                                    <Image
                                      fallbackSrc="https://via.placeholder.com/150"
                                      src={detail?.link}
                                    />
                                  </Skeleton>
                                </Box>
                              )}
                            </Box>
                          )}
                          {/* Post Bottom Bar */}
                          <Flex
                            sx={{
                              '@media (max-width: 960px)': {
                                display: 'none',
                              },
                            }}
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
                                <Box>
                                  {detail?.replyCount} Comment{detail?.replyCount === 1 ? '' : 's'}
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
                              <CopyToClipboard
                                text={
                                  mode === 'http:'
                                    ? `demo.plebbit.eth.limo/#/p/${detail?.subplebbitAddress}/c/${detail?.cid}`
                                    : window?.location?.href
                                }
                                onCopy={() => {
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 3000);
                                }}
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
                                  <Icon as={FaShare} height={5} width={5} mr="5px" />
                                  <Box>{copied ? 'Copied' : 'share'}</Box>
                                </Link>
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

                              {profile?.author?.address === detail?.author?.address ||
                              profile?.signer?.address === detail?.author?.address ? (
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
                                        <Icon
                                          as={FiMoreHorizontal}
                                          color={iconColor}
                                          h="20px"
                                          w="20px"
                                        />
                                      </Flex>
                                    }
                                    options={[
                                      {
                                        label: 'Edit Post',
                                        icon: BsPencil,
                                        id: 'Edit',
                                      },
                                      {
                                        label: 'Save',
                                        icon: BsBookmark,
                                        id: 'Save',
                                      },
                                      {
                                        label: 'Block Author',
                                        icon: BsEyeSlash,
                                        id: 'block',
                                      },
                                      {
                                        label: 'Delete',
                                        icon: MdOutlineDeleteOutline,
                                        id: 'Delete',
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
                              ) : (
                                <>
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
                                    <Icon as={BsEyeSlash} height={5} width={5} mr="5px" />
                                    <Box>Block Author</Box>
                                  </Link>
                                </>
                              )}
                            </Flex>
                          </Flex>

                          <Flex
                            flexDirection="row"
                            alignItems="center"
                            overflowY="visible"
                            mb="2px"
                            paddingBottom="12px"
                            paddingTop="8px"
                            sx={{
                              '@media (min-width: 960px)': {
                                display: 'none',
                              },
                            }}
                          >
                            <Flex
                              flexDirection="row"
                              alignItems="stretch"
                              flexGrow={1}
                              padding="0 8px 0 8px"
                              fontSize="12px"
                              fontWeight="500"
                              lineHeight="16px"
                              overflow="hidden"
                            >
                              <Flex
                                borderRadius="16px"
                                alignItems="center"
                                maxH=""
                                p=""
                                width="auto"
                                maxWidth="110px"
                                minWidth="32px"
                                mr="10px"
                                flexShrink="0"
                                border={`1px solid ${borderColor}`}
                              >
                                <IconButton
                                  aria-label="Upvote Post"
                                  color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                                  w="24px"
                                  h="24px"
                                  bg="none"
                                  minW="24px"
                                  minH="24px"
                                  border="none"
                                  borderRadius="2px"
                                  _hover={{
                                    color: 'upvoteOrange',
                                  }}
                                  _focus={{
                                    outline: 'none',
                                  }}
                                  onClick={() => {
                                    setVoteMode(voteMode === 1 ? 0 : 1);
                                    handleVote(voteMode === 1 ? 0 : 1);
                                  }}
                                  icon={
                                    <Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />
                                  }
                                />
                                <Text
                                  fontSize="12px"
                                  fontWeight="700"
                                  lineHeight="16px"
                                  pointerEvents="none"
                                  color=""
                                >
                                  {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
                                </Text>
                                <IconButton
                                  aria-label="Downvote Post"
                                  color={voteMode === -1 ? 'downvoteBlue' : iconColor}
                                  w="24px"
                                  h="24px"
                                  minW="24px"
                                  minH="24px"
                                  border="none"
                                  bg="none"
                                  borderRadius="2px"
                                  _hover={{
                                    color: 'downvoteBlue',
                                  }}
                                  _focus={{
                                    outline: 'none',
                                  }}
                                  onClick={() => {
                                    setVoteMode(voteMode === -1 ? 0 : -1);
                                    handleVote(voteMode === -1 ? 0 : -1);
                                  }}
                                  icon={
                                    <Icon
                                      as={voteMode === -1 ? ImArrowDown : BiDownvote}
                                      w={4}
                                      h={4}
                                    />
                                  }
                                />
                              </Flex>
                              <Link
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="50%"
                                _hover={{
                                  textDecor: 'none',
                                }}
                                _focus={{
                                  boxShadow: 'none',
                                }}
                                mr="10px"
                                border={`1px solid ${borderColor}`}
                                minW="32px"
                                height="32px"
                                flexShrink="0"
                              >
                                <Icon as={GoGift} height={5} width={5} />
                              </Link>
                              <Link
                                borderRadius="16px"
                                alignItems="center"
                                maxH=""
                                p="2px 8px"
                                width="auto"
                                maxWidth="100px"
                                minWidth="32px"
                                mr="10px"
                                flexShrink="0"
                                border={`1px solid ${borderColor}`}
                                display="flex"
                              >
                                <Icon as={BsChat} height={5} width={5} mr="5px" />
                                <Box>{detail?.replyCount}</Box>
                              </Link>
                              <CopyToClipboard
                                text={
                                  mode === 'http:'
                                    ? `demo.plebbit.eth.limo/#/p/${detail?.subplebbitAddress}/c/${detail?.cid}`
                                    : window?.location?.href
                                }
                                onCopy={() => {
                                  setCopied(true);
                                  setTimeout(() => {
                                    setCopied(false);
                                  }, 3000);
                                }}
                              >
                                <Link
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  borderRadius="50%"
                                  _hover={{
                                    textDecor: 'none',
                                  }}
                                  _focus={{
                                    boxShadow: 'none',
                                  }}
                                  ml="auto"
                                  border={`1px solid ${borderColor}`}
                                  minW="32px"
                                  height="32px"
                                  flexShrink="0"
                                  sx={{
                                    '@media (min-width: 1280px)': {},
                                    '@media (max-width: 1120px)': {
                                      display: 'none',
                                    },
                                  }}
                                >
                                  {copied ? 'Copied' : <Icon as={FiShare} height={5} width={5} />}
                                </Link>
                              </CopyToClipboard>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Box maxW="100%" bg={bg} mt="10px" padding="10px">
                        <Box padding="24px 40px">
                          <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                            Comment as {getUserName(profile?.author)}
                          </Box>
                          <Box
                            borderRadius="4px"
                            overflow="hidden auto"
                            padding="8px 16px"
                            resize="vertical"
                            minH="200px"
                          >
                            <Editor
                              setValue={setContent}
                              editorState={editorState}
                              setEditorState={setEditorState}
                              showSubmit
                              handleSubmit={handlePublishPost}
                            />
                          </Box>
                          <Box
                            fontSize="12px"
                            fontWeight="700"
                            lineHeight="16px"
                            marginTop="16px"
                            marginBottom="4px "
                          >
                            Sort By: Best
                          </Box>
                          <hr />
                        </Box>
                        {isReply && <Replies parent={replyParent} reply={reply} />}
                        {detail?.replies?.pages?.topAll?.comments.map((comment) => (
                          <Comment comment={comment} key={comment.cid} parentCid={detail?.cid} />
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
                      subscriptions={subscriptions}
                      detail={detail}
                      loading={loading}
                    />
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Box>
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
                        onClick={() => history.push(`/p/${detail?.subplebbitAddress}`, [])}
                      />
                      <Box
                        backgroundColor={mainMobileBg}
                        borderRadius="20px 20px 0 0"
                        position="relative"
                      >
                        <Icon
                          onClick={() => history.goBack()}
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
                            isLoaded={loading}
                            width="72px"
                            height="72px"
                            borderRadius="50%"
                            mb="8px"
                          >
                            <Avatar
                              width={72}
                              height={72}
                              avatar={subplebbit?.avatar}
                              badge
                              isOnline={getIsOnline(subplebbit?.updatedAt)}
                              mb="8px"
                            />
                          </Skeleton>
                          <Skeleton margin="5px" isLoaded={loading}>
                            <Box
                              onClick={() => history.push(`/p/${detail?.subplebbitAddress}`, [])}
                              fontWeight="700"
                              lineHeight="18px"
                              margin="5px"
                              textAlign="center"
                            >
                              {getSubName(subplebbit)}
                            </Box>
                          </Skeleton>
                        </Flex>
                      </Box>
                    </Box>
                    {edit ? (
                      <Box marginTop="8px" padding="10px">
                        <Editor
                          editorState={postEditorState}
                          setEditorState={setPostEditorState}
                          setValue={setEditPost}
                        />
                        <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                          <Button
                            borderRadius="999px"
                            border="transparent"
                            bg="transparent"
                            onClick={() => setEdit(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            borderRadius="999px"
                            padding="5px 10px"
                            minW="90px"
                            minH="27px"
                            onClick={() =>
                              handleEditPost(detail?.cid, editPost, detail?.subplebbitAddress)
                            }
                            isLoading={editLoading}
                          >
                            Save
                          </Button>
                        </Flex>
                      </Box>
                    ) : (
                      <Flex flexDir="column">
                        <Post
                          detail
                          post={detail}
                          mode={postStyle}
                          key={detail?.cid}
                          handleOption={handleOption}
                          loading={!loading}
                        />
                      </Flex>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box minH="calc(100vh - 48px)">
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
                        {detail?.replyCount} comment{detail?.replyCount === 1 ? '' : 's'}
                      </Box>
                    </Flex>
                  </Box>
                  {!showMEditor && (
                    <Flex alignItems="center" flexFlow="row nowrap" paddingTop="8px" width="100%">
                      <Image
                        h="24px"
                        verticalAlign="middle"
                        src={authorAvatarImageUrl}
                        alt="user-icon"
                        fallbackSrc={require('../../../assets/images/fallback.png')}
                        color="transparent"
                        borderRadius="50%"
                        w="24px"
                        mr="8px"
                      />
                      <Button
                        border={`1px solid ${borderColor2}`}
                        color="#818384"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        borderRadius="15px"
                        flex="1"
                        fontSize="14px"
                        height="30px"
                        lineHeight="17px"
                        textAlign="left"
                        padding="0 8px"
                        justifyContent="flex-start"
                        onClick={() => setShowMEditor(true)}
                      >
                        Leave a comment
                      </Button>
                    </Flex>
                  )}
                  {showMEditor && (
                    <Box margin="0 12px">
                      <Flex backgroundColor="inherit" color="inherit" margin="0" borderWidth="0">
                        <Box width="100%">
                          <Editor
                            setValue={setContent}
                            editorState={editorState}
                            setEditorState={setEditorState}
                            showSubmit
                            handleSubmit={handlePublishPost}
                            submitBtnText="Add Comment"
                            otherBtn={
                              <Button mr="auto" onClick={() => setShowMEditor(false)}>
                                X
                              </Button>
                            }
                          />
                        </Box>
                      </Flex>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box padding="16px" maxW="100%">
                {detail?.replies?.pages?.topAll?.comments.map((comment) => (
                  <Comment comment={comment} key={comment.cid} />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default PostDetail;
