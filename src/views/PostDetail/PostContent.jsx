import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Link,
  Tag,
  useToast,
  Button,
  Skeleton,
  Textarea,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import {
  useAccountComments,
  usePublishComment, useSubscribe,
  useAccountVote,
  useComment,
  useSubplebbit,
  useEditedComment,
} from '@plebbit/plebbit-react-hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { CloseIcon, LinkIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsChat, BsBookmark, BsEyeSlash, BsPencil, BsChatSquare, BsShield } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiBell, FiExternalLink } from 'react-icons/fi';
import { CgNotes, CgClose } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import Comment from '../../components/Post/comment'
import Editor from '../../components/Editor';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import getUserName, { getSubName } from '../../utils/getUserName';
import numFormatter from '../../utils/numberFormater';
import Post from '../../components/Post';
import DropDown from '../../components/DropDown';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdOutlineDeleteOutline,
  MdStickyNote2,
} from 'react-icons/md';
import logger from '../../utils/logger';
import Marked from '../../components/Editor/marked';
import getIsOnline from '../../utils/getIsOnline';
import Avatar from '../../components/Avatar';
import onError from '../../utils/onError';
import Replies from '../../components/Post/comment/replies';
import { HiLockClosed, HiOutlineCheckCircle } from 'react-icons/hi';
import { TiDeleteOutline } from 'react-icons/ti';
import AddRemovalReason from '../../components/Post/Modal/addRemovalReason';
import { DeletedMessage, LockedMessage, RemovedMessage } from '../../components/Card/ModMessage';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import useRepliesAndAccountReplies from '../../hooks/useRepliesAndAccountReplies';
import usePublishUpvote from '../../hooks/usePublishUpvote';
import usePublishDownvote from '../../hooks/usePublishDownvote';
import useCommentEdit from '../../hooks/useCommentEdit';
import Label from '../../components/Label';
import Image from '../../components/Image';
import { dateToNow } from '../../utils/formatDate';
import { ProfileContext } from '../../store/profileContext';
import onChallenge from '../../utils/onChallenge';
import onChallengeVerification from '../../utils/onChallengeVerification';
import EditLabel from "../../components/Label/editLabel";
import PendingLabel from "../../components/Label/pendingLabel";
import SpoilerLabel from "../../components/Label/spoilerLabel";
import FlairLabel from '../../components/Label/flairLabel';

const PostContent = ({ setDetail, setSubplebbit }) => {
  const {
    onOpen: openRemovalModal,
    onClose: closeRemovalModal,
    isOpen: isRemovalModalOpen,
  } = useDisclosure();
  const location = useLocation();
  const postDetailModal = location?.state?.modal && location?.state?.detail;
  const params = useParams();
  const feedFromProfile = location?.pathname.includes('/profile/c');
  const myPostLocation = params?.index;
  const { accountComments: myPost } = useAccountComments();
  const profilePost = myPost && myPostLocation && myPost[Number(myPostLocation)];
  // post from link or link address
  const commentFromCid = useComment({ commentCid: !feedFromProfile ? params?.commentCid : undefined });
  // const commentFromFeed = location?.state?.detail;
  // applicable if coming from feeds, if posts takes time to load uses feeds post props
  const comment = feedFromProfile
    ? profilePost
    : commentFromCid;
  let detail;
  let reply;
  let replyParent;
  let replyPost = useComment(
    { commentCid: feedFromProfile ? comment?.postCid || comment?.parentCid : comment?.postCid }
  ); // if comment is a reply, this is what you replied to
  const isReply =
    Boolean((feedFromProfile && profilePost?.parentCid) || (comment?.parentCid && comment?.depth !== 0));
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
  const loading = detail?.state === "fetching-ipfs" || !detail?.timestamp;
  const detailPending = !detail?.cid;
  const subplebbit =
    sub === undefined ? { ...detail?.subplebbit, address: detail?.subplebbitAddress } : sub;



  const mediaInfo = getCommentMediaInfo(detail);
  const hasThumbnail = detail?.thumbnailUrl && !mediaInfo
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const [postVotes] = useState(detail?.upvoteCount || 0 - detail?.downvoteCount || 0);
  const accountVote = useAccountVote({ commentCid: detail?.cid });
  const vote = accountVote?.vote || 0
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
  const postBg = useColorModeValue(
    "lightCommunityThemePost",
    "darkCommunityThemePost"
  );
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mainMobileBg = useColorModeValue('white', 'black');
  const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
  const toast = useToast();

  const [subLoading, setSubLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(detail?.content ? 'post' : 'link');
  const [editPost, setEditPost] = useState(editMode === 'post' ? detail?.content : detail?.link);
  const [copied, setCopied] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [postEditorState, setPostEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${editPost}</p>`))
    )
  );
  const [showSpoiler, setShowSpoiler] = useState(detail?.spoiler);
  const {
    device,
    profile,
    accountSubplebbits,
    baseUrl,
    authorAvatarImageUrl,
  } = useContext(ProfileContext);
  const history = useHistory();
  const [showMEditor, setShowMEditor] = useState(false);
  const [showFullComments, setShowFullComments] = useState(!isReply);





  const upVote = usePublishUpvote(detail)
  const downVote = usePublishDownvote(detail)

  const publishCommentOptions = {
    content,
    postCid: detail?.cid, // the thread the comment is on
    parentCid: detail?.cid, // if top level reply to a post, same as postCid
    subplebbitAddress: detail?.subplebbitAddress,
    onChallenge,
    onChallengeVerification: (challengeVerification, comment) => onChallengeVerification(challengeVerification, comment, () => {
      setContent('');
      setEdit(false);
      setEditorState(EditorState.createEmpty());
    }, () => { setEdit(false); }),
    onError,
  }

  const { publishComment } = usePublishComment(publishCommentOptions)

  const handlePublishPost = async () => {
    try {
      await publishComment();
    } catch (error) {
      toast({
        title: 'Comment Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      logger('post:comment:response:', error);
    }
    setContent('');

  };

  const commentEdit = useCommentEdit(detail)
  const handleEditPost = async (update, callBack, failedCallBack) => {
    await commentEdit(update, callBack, failedCallBack)

  };

  const { subscribe, unsubscribe, subscribed } = useSubscribe({ subplebbitAddress: detail?.subplebbitAddress })

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
          handleEditPost({ deleted: true })
        }
      });
    } else if (option?.id === 'saveEdit') {
      handleEditPost({
        link: editMode === 'link' ? editPost : undefined,
        content: editMode === 'post' ? editPost : undefined,
      });
    } else openRemovalModal();
  };

  logger('feed:detail', {
    address: params?.commentCid,
    detail,
  });

  const sharePath = `${baseUrl}p/${detail?.subplebbitAddress}/c/${detail?.cid}`;
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(detail?.subplebbitAddress);

  useEffect(() => {
    if (feedFromProfile && comment?.cid) {
      history.push(`/p/${comment?.subplebbitAddress}/c/${comment?.cid}`);
    }
  }, [comment?.cid]);

  const owner =
    profile?.author?.address === detail?.author?.address ||
    profile?.signer?.address === detail?.author?.address;

  const comments = useRepliesAndAccountReplies(detail)



  const detailCommentCount = detail?.replyCount || 0


  const { state: editedCommentState, editedComment } = useEditedComment({ comment: detail })

  if (editedComment) {
    detail = editedComment
  }

  let editLabel
  if (editedCommentState === 'succeeded') {
    editLabel = { text: 'edited', color: 'green' }
  }
  if (editedCommentState === 'pending') {
    editLabel = { text: 'pending edit', color: 'orange' }
  }
  if (editedCommentState === 'failed') {
    editLabel = { text: 'failed edit', color: 'red' }
  }

  useEffect(() => {
    setDetail({ ...detail })
    setSubplebbit({ ...subplebbit })


  }, [detail, subplebbit])

  return (
    <>

      { device !== 'mobile' ? (
        <>

          {/* head  Start*/ }
          {
            postDetailModal ?
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
                    <Skeleton mr="4px" isLoaded={ !loading }>
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
                          color={ vote === 1 ? 'upvoteOrange' : iconColor }
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'upvoteOrange',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ upVote }
                          icon={ <Icon as={ vote === 1 ? ImArrowUp : BiUpvote } w={ 4 } h={ 4 } /> }
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color="#D7DADC"
                          textAlign="center"
                        >
                          <Skeleton isLoaded={ !loading }>
                            { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
                          </Skeleton>
                        </Text>
                        <IconButton
                          aria-label="Downvote Post"
                          color={ vote === -1 ? 'downvoteBlue' : iconColor }
                          w="24px"
                          h="24px"
                          minW="24px"
                          minH="24px"
                          border="none"
                          bg="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'downvoteBlue',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ downVote }
                          icon={ <Icon as={ vote === -1 ? ImArrowDown : BiDownvote } w={ 4 } h={ 4 } /> }
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
                    <Skeleton isLoaded={ !loading }>
                      <Icon as={ CgNotes } mr="8px" color="#D7DADC" />
                    </Skeleton>

                    <Text
                      color="#D7DADC"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      minWidth="0"
                      ml="2px"
                      paddingRight="5px"
                      sx={ {
                        '@media (max-width: 768px)': {
                          display: 'none',
                        },
                      } }
                      isTruncated
                    >
                      { detail?.title }
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
                    <CloseIcon mr="5px" onClick={ () => history.goBack() } cursor="pointer" />
                    <Box onClick={ () => history.goBack() } cursor="pointer">
                      Close
                    </Box>
                  </Flex>
                </Flex>
              </Box> :
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
                    <Skeleton mr="4px" isLoaded={ !loading }>
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
                          color={ vote === 1 ? 'upvoteOrange' : iconColor }
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'upvoteOrange',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ upVote }
                          icon={ <Icon as={ vote === 1 ? ImArrowUp : BiUpvote } w={ 4 } h={ 4 } /> }
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color="#D7DADC"
                          textAlign="center"
                        >
                          <Skeleton isLoaded={ !loading }>
                            { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
                          </Skeleton>
                        </Text>
                        <IconButton
                          aria-label="Downvote Post"
                          color={ vote === -1 ? 'downvoteBlue' : iconColor }
                          w="24px"
                          h="24px"
                          minW="24px"
                          minH="24px"
                          border="none"
                          bg="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'downvoteBlue',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ downVote
                          }
                          icon={
                            <Icon as={ vote === -1 ? ImArrowDown : BiDownvote } w={ 4 } h={ 4 } />
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
                    <Skeleton isLoaded={ !loading }>
                      <Icon as={ CgNotes } mr="8px" color="#D7DADC" />
                    </Skeleton>

                    <Text
                      color="#D7DADC"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      minWidth="0"
                      ml="2px"
                      paddingRight="5px"
                      sx={ {
                        '@media (max-width: 768px)': {
                          display: 'none',
                        },
                      } }
                      isTruncated
                    >
                      { detail?.title }
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
                    <CloseIcon mr="5px" onClick={ () => history.goBack() } cursor="pointer" />
                    <Box onClick={ () => history.goBack() } cursor="pointer">
                      Close
                    </Box>
                  </Flex>
                </Flex>
              </Box>
          }
          {/* head  End */ }

          {/* body */ }
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
              {/* Main */ }
              <Flex width="100%" bg={ bg } borderRadius="4px">
                {/* vote column */ }
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
                    sx={ {
                      '@media (max-width: 960px)': {
                        display: 'none',
                      },
                    } }
                  >
                    <Skeleton isLoaded={ !loading }>
                      <>
                        <IconButton
                          aria-label="Upvote Post"
                          color={ vote === 1 ? 'upvoteOrange' : iconColor }
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'upvoteOrange',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ upVote }
                          icon={ <Icon as={ vote === 1 ? ImArrowUp : BiUpvote } w={ 4 } h={ 4 } /> }
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color=""
                          textAlign="center"
                        >
                          { postVotes === 0 ? 'vote' : numFormatter(postVotes) }
                        </Text>
                        <IconButton
                          aria-label="Downvote Post"
                          color={ vote === -1 ? 'downvoteBlue' : iconColor }
                          w="24px"
                          h="24px"
                          minW="24px"
                          minH="24px"
                          border="none"
                          bg="none"
                          borderRadius="2px"
                          _hover={ {
                            bg: iconBg,
                            color: 'downvoteBlue',
                          } }
                          _focus={ {
                            outline: 'none',
                          } }
                          onClick={ () => {
                            downVote
                          } }
                          icon={
                            <Icon as={ vote === -1 ? ImArrowDown : BiDownvote } w={ 4 } h={ 4 } />
                          }
                        />
                      </>
                    </Skeleton>
                  </Flex>
                </Flex>
                {/* post Details */ }
                <Flex flexDir="column" paddingTop="8px" flex="1">
                  {/* post Head */ }

                  <Flex
                    alignItems="start"
                    fontSize="12px"
                    fontWeight="400"
                    lineHeight="16px"
                    margin="0 8px 8px"
                  >
                    <Skeleton
                      isLoaded={ !loading }
                      mr="8px"
                      width="20px"
                      height="20px"
                      borderRadius="50%"
                    >
                      <Avatar
                        width={ 20 }
                        height={ 20 }
                        mr="8px"
                        badge
                        isOnline={ getIsOnline(subplebbit?.updatedAt) }
                      />
                    </Skeleton>
                    <Skeleton isLoaded={ !loading }>
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
                              color={ subPledditTextColor }
                              fontSize="12px"
                              fontWeight="700"
                              display="inline"
                              lineHeight="20px"
                              textDecoration="none"
                              onClick={ () =>
                                history.push(`/p/${detail?.subplebbitAddress}`, [])
                              }
                            >
                              { getSubName(subplebbit) }
                            </Box>
                          </Box>
                          <Text
                            color={ separatorColor }
                            as="span"
                            verticalAlign="middle"
                            fontSize="6px"
                            lineHeight="20px"
                            margin="0 4px"
                          >
                            •
                          </Text>
                          <Text color={ misCol } as="span" marginRight="3px">
                            Posted By
                          </Text>

                          <Link
                            fontWeight="400"
                            mr="3px"
                            textDecor="none"
                            fontSize="12px"
                            lineHeight="16px"
                            color={ misCol }
                            marginRight="3px"
                          >
                            { getUserName(detail?.author) }
                          </Link>

                          { detail?.author?.flair && (
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
                                { detail?.author?.flair?.text }
                              </Text>
                            </Box>
                          ) }
                          <Link color={ misCol }>
                            { dateToNow(parseInt(detail?.timestamp * 1000)) } ago
                          </Link>
                        </Box>
                        { detail?.locked && <Icon as={ HiLockClosed } color={ lockColor } /> }
                        { detail?.removed && (
                          <Flex
                            cursor="pointer"
                            color={ removeColor }
                            alignItems="center"
                            onClick={ () =>
                              !detail?.reason ? openRemovalModal() : {}
                            }
                          >
                            <Icon as={ TiDeleteOutline } color={ removeColor } />
                            { !detail?.reason ? (
                              isSpecial && <Box mx="3px">Add A removal reason</Box>
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
                                  { detail?.reason }
                                </Text>
                              </Tooltip>
                            ) }
                          </Flex>
                        ) }

                        {/* <PdMenu /> */ }
                      </Flex>
                    </Skeleton>
                    <Flex ml="auto">
                      <Skeleton isLoaded={ !loading }>
                        <Icon
                          sx={ {
                            '@media (min-width: 1280px)': {},
                            '@media (max-width: 1120px)': {
                              display: 'none',
                            },
                          } }
                          as={ FiBell }
                          height="16px"
                          width="16px"
                        />
                      </Skeleton>
                    </Flex>
                  </Flex>
                  {/* post Title */ }
                  <Flex margin="0 8px" display="flex" alignItems="center">
                    <Text
                      color={ titleColor }
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="22px"
                      paddingRight="5px"
                      wordBreak="break-word"
                    >
                      { detail?.title }{ ' ' }

                      { detail?.flair?.text ? (
                        <FlairLabel flair={ detail?.flair } />

                      ) : null }
                      { detail?.spoiler && (
                        <SpoilerLabel />
                      ) }
                      { detailPending && (
                        <Skeleton isLoaded={ !loading } my="4px">
                          <PendingLabel />
                        </Skeleton>
                      ) }
                      {/* edit status */ }
                      <EditLabel editLabel={ editLabel } post={ detail } />

                    </Text>
                  </Flex>
                  {/* post Body */ }
                  { edit ? (
                    <Box marginTop="8px" padding="10px">
                      <Flex alignItems="stretch">
                        <Flex
                          color={ color }
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
                          borderBottom={ editMode === 'post' && '3px solid #a4a4a4' }
                          onClick={ () => {
                            setEditMode('post');
                          } }
                        >
                          <Icon
                            as={ MdStickyNote2 }
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
                          color={ color }
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
                          borderBottom={ editMode === 'link' && '3px solid #a4a4a4' }
                          borderRadius="0"
                          justifyContent="center"
                          alignItems="center"
                          whiteSpace="nowrap"
                          padding="15px 17px"
                          onClick={ () => {
                            setEditMode('link');
                          } }
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
                      { editMode === 'post' ? (
                        <Editor
                          editorState={ postEditorState }
                          setEditorState={ setPostEditorState }
                          setValue={ setEditPost }
                        />
                      ) : (
                        <Textarea
                          placeholder="Url"
                          onChange={ (e) => setEditPost(e.target.value) }
                          value={ editPost }
                          color={ color }
                        />
                      ) }
                      <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                        <Button
                          borderRadius="999px"
                          border="transparent"
                          bg="transparent"
                          onClick={ () => setEdit(false) }
                        >
                          Cancel
                        </Button>
                        <Button
                          borderRadius="999px"
                          padding="5px 10px"
                          minW="90px"
                          minH="27px"
                          onClick={ () => handleOption({ id: 'saveEdit' }) }
                          isLoading={ editLoading }
                        >
                          Save
                        </Button>
                      </Flex>
                    </Box>
                  ) : detail?.removed ? (
                    <RemovedMessage subplebbit={ subplebbit } />
                  ) : detail?.deleted ? (
                    <DeletedMessage />
                  ) : showSpoiler ? (
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
                    <Box marginTop="8px">
                      { detail?.content ? (
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
                          <Skeleton isLoaded={ !loading }>
                            <Marked content={ detail?.content } />
                          </Skeleton>
                        </Box>
                      ) : (
                        <Box width="100%" display="flex" justifyContent="center">
                          <Skeleton width="100%" isLoaded={ !loading }>
                            <Box w="100%">
                              <Box w="100%" mt="0" textAlign="left">
                                { hasThumbnail && (
                                  <Link
                                    fontSize="12px"
                                    fontWeight="400"
                                    lineHeight="16px"
                                    margin="4px 8px"
                                    whiteSpace="nowrap"
                                    color="mainBlue"
                                    display="flex"
                                    href={ detail?.link }
                                    alignItems="flex-end"
                                    isExternal={ !detail?.thumbnailUrl }
                                  >
                                    <Box>{ detail?.link?.substring(0, 20) + "..." }</Box>
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
                              </Box>

                              { mediaInfo?.type === "image" && (
                                <Image
                                  maxH="512px"
                                  margin="0 auto"
                                  maxW="100%"
                                  overflow="hidden"
                                  bg={ postBg }
                                  src={ detail?.link }
                                  onError={ (event) =>
                                    (event.target.style.display = "none")
                                  }
                                />
                              ) }

                              { mediaInfo?.type === "video" && (
                                <Box
                                  bg="black"
                                  maxHeight="512px"
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
                                    <source src={ detail?.link } />
                                  </video>
                                </Box>
                              ) }

                              { mediaInfo?.type === "audio" && (
                                <Box maxW="100%" color="#fff" margin="4px 8px">
                                  <audio
                                    preload="auto"
                                    src={ detail?.link }
                                    onError={ (event) =>
                                      (event.target.style.display = "none")
                                    }
                                    controls
                                    style={ {
                                      width: "100%",
                                    } }
                                  >
                                    <source src={ detail?.link } />
                                  </audio>
                                </Box>
                              ) }
                            </Box>
                          </Skeleton>
                        </Box>
                      ) }
                    </Box>
                  ) }
                  {/* Post Bottom Bar */ }
                  { detailPending ? (
                    !loading && <Flex />
                  ) : isSpecial ? (
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      paddingRight="10px"
                      overflowY="visible"
                      mb="2px"
                      color={ iconColor }
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="stretch"
                        flexGrow={ 1 }
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
                          _hover={ {
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          } }
                          _focus={ {
                            boxShadow: 'none',
                          } }
                        >
                          <Icon as={ BsChatSquare } height={ 5 } width={ 5 } mr="5px" />
                          <Box>{ detailCommentCount }</Box>
                        </Link>
                        <Flex
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={ {
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          } }
                          _focus={ {
                            boxShadow: 'none',
                          } }
                        >
                          <Icon as={ GoGift } height={ 5 } width={ 5 } mr="5px" />
                          <Box>Award</Box>
                        </Flex>
                        <CopyToClipboard text={ sharePath } onCopy={ handleCopy }>
                          <Link
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
                          >
                            <Icon as={ FaShare } height={ 5 } width={ 5 } mr="5px" />
                            <Box>{ copied ? 'Copied' : 'Share' }</Box>
                          </Link>
                        </CopyToClipboard>

                        { detail?.removed ? (
                          <Flex
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
                            onClick={ () => handleOption({ id: 'approved' }) }
                            color={ iconColor }
                          >
                            <Icon as={ HiOutlineCheckCircle } height={ 5 } width={ 5 } mr="5px" />
                            <Box>Approve</Box>
                          </Flex>
                        ) : (
                          <Flex
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
                            color={ iconColor }
                            onClick={ () => handleOption({ id: 'removed' }) }
                          >
                            <Icon as={ TiDeleteOutline } height={ 5 } width={ 5 } mr="5px" />
                            <Box>Remove</Box>
                          </Flex>
                        ) }

                        <Flex justifyContent="center">
                          <DropDown
                            onChange={ (val) => handleOption(val) }
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
                            ] }
                            rightOffset={ 0 }
                            leftOffset="none"
                            topOffset="34px"
                          />
                        </Flex>

                        { owner ? (
                          <Link
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
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
                                    as={ FiMoreHorizontal }
                                    color={ iconColor }
                                    h="20px"
                                    w="20px"
                                  />
                                </Flex>
                              }
                              options={ [
                                {
                                  label: 'Edit Post',
                                  icon: BsPencil,
                                  id: 'edit',
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
                                },
                              ] }
                              render={ (item) => (
                                <Flex
                                  alignItems="center"
                                  padding="8px"
                                  fontSize="14px"
                                  lineHeight="18px"
                                  fontWeight="500"
                                  color={ iconColor }
                                  borderTop={ `1px solid ${border2}` }
                                  textTransform="capitalize"
                                  _hover={ {
                                    bg: bottomButtonHover,
                                  } }
                                  onClick={ () => handleOption(item) }
                                >
                                  <Icon as={ item?.icon } w="20px" h="20px" mr="6px" />
                                  <Box>{ item?.label }</Box>
                                </Flex>
                              ) }
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
                              _hover={ {
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              } }
                              _focus={ {
                                boxShadow: 'none',
                              } }
                            >
                              <Icon as={ BsEyeSlash } height={ 5 } width={ 5 } mr="5px" />
                              <Box>Block Author</Box>
                            </Link>
                          </>
                        ) }
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      paddingRight="10px"
                      overflowY="visible"
                      mb="2px"
                      color={ iconColor }
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="stretch"
                        flexGrow={ 1 }
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
                          _hover={ {
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          } }
                          _focus={ {
                            boxShadow: 'none',
                          } }
                        >
                          <Icon as={ BsChat } height={ 5 } width={ 5 } mr="5px" />
                          <Box>
                            { detailCommentCount } Comment
                            { detailCommentCount === 1 ? '' : 's' }
                          </Box>
                        </Link>
                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={ {
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          } }
                          _focus={ {
                            boxShadow: 'none',
                          } }
                        >
                          <Icon as={ GoGift } height={ 5 } width={ 5 } mr="5px" />
                          <Box>Award</Box>
                        </Link>
                        <CopyToClipboard text={ sharePath } onCopy={ handleCopy }>
                          <Link
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
                          >
                            <Icon as={ FaShare } height={ 5 } width={ 5 } mr="5px" />
                            <Box>{ copied ? 'Copied' : 'Share' }</Box>
                          </Link>
                        </CopyToClipboard>

                        <Link
                          display="flex"
                          alignItems="center"
                          borderRadius="2px"
                          padding="8px"
                          marginRight="4px"
                          _hover={ {
                            textDecor: 'none',
                            outline: 'none',
                            bg: bottomButtonHover,
                          } }
                          _focus={ {
                            boxShadow: 'none',
                          } }
                        >
                          <Icon as={ BsBookmark } height={ 5 } width={ 5 } mr="5px" />
                          <Box>save</Box>
                        </Link>

                        { owner ? (
                          <Link
                            display="flex"
                            alignItems="center"
                            borderRadius="2px"
                            padding="8px"
                            marginRight="4px"
                            _hover={ {
                              textDecor: 'none',
                              outline: 'none',
                              bg: bottomButtonHover,
                            } }
                            _focus={ {
                              boxShadow: 'none',
                            } }
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
                                    as={ FiMoreHorizontal }
                                    color={ iconColor }
                                    h="20px"
                                    w="20px"
                                  />
                                </Flex>
                              }
                              options={ [
                                {
                                  label: 'Edit Post',
                                  icon: BsPencil,
                                  id: 'edit',
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
                                },
                              ] }
                              render={ (item) => (
                                <Flex
                                  alignItems="center"
                                  padding="8px"
                                  fontSize="14px"
                                  lineHeight="18px"
                                  fontWeight="500"
                                  color={ iconColor }
                                  borderTop={ `1px solid ${border2}` }
                                  textTransform="capitalize"
                                  _hover={ {
                                    bg: bottomButtonHover,
                                  } }
                                  onClick={ () => handleOption(item) }
                                >
                                  <Icon as={ item?.icon } w="20px" h="20px" mr="6px" />
                                  <Box>{ item?.label }</Box>
                                </Flex>
                              ) }
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
                              _hover={ {
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              } }
                              _focus={ {
                                boxShadow: 'none',
                              } }
                            >
                              <Icon as={ BsEyeSlash } height={ 5 } width={ 5 } mr="5px" />
                              <Box>Block Author</Box>
                            </Link>
                          </>
                        ) }
                      </Flex>
                    </Flex>
                  ) }
                </Flex>
              </Flex>
              <Box maxW="100%" bg={ bg } mt="10px" padding="10px">
                <Box padding="24px 40px">
                  { detail?.locked ? (
                    <LockedMessage subplebbit={ subplebbit } />
                  ) : (
                    <>
                      <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                        Comment as { getUserName(profile?.author) }
                      </Box>
                      <Box
                        borderRadius="4px"
                        overflow="hidden auto"
                        padding="8px 16px"
                        resize="vertical"
                        minH="200px"
                      >
                        <Editor
                          setValue={ setContent }
                          editorState={ editorState }
                          setEditorState={ setEditorState }
                          showSubmit
                          handleSubmit={ handlePublishPost }
                        />
                      </Box>
                    </>
                  ) }

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
                  { isReply ? (
                    <Box
                      fontSize="12px"
                      fontWeight="700"
                      my="8px"
                      _hover={ {
                        textDecoration: 'underline',
                      } }
                      onClick={ () => setShowFullComments(!showFullComments) }
                    >
                      View all comments
                    </Box>
                  ) : null }
                </Box>
                { isReply ? <Replies parent={ replyParent } reply={ reply } /> : null }
                { showFullComments &&
                  comments?.map((comment) => (
                    <Comment comment={ comment } key={ comment.cid } parentCid={ detail?.cid } />
                  )) }
              </Box>
            </Box>
            <SideBar
              margin="32px 0"
              borderRadius="4px"
              padding="0"
              right="0"
              top="0"
              width="312px"
              sx={ {
                '@media (max-width: 1120px)': {
                  display: 'none',
                },
              } }
              handleSubscribe={ handleSubscribe }
              handleUnSubscribe={ handleUnSubscribe }
              subLoading={ subLoading }
              setSubLoading={ setSubLoading }
              subscribed={ subscribed }
              detail={ detail }
              loading={ loading }
              subplebbit={ subplebbit }
            />
          </Flex>

        </>
      ) : (
        <Box>
          <Box>
            <Box position="relative" bg={ mainMobileBg }>
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
                      onClick={ () => history.push(`/p/${detail?.subplebbitAddress}`, []) }
                    />
                    <Box
                      backgroundColor={ mainMobileBg }
                      borderRadius="20px 20px 0 0"
                      position="relative"
                    >
                      <Icon
                        onClick={ () => history.goBack() }
                        as={ CgClose }
                        color={ mobileColor }
                        fill={ mobileColor }
                        width={ 6 }
                        height={ 6 }
                        lineHeight="20px"
                        verticalAlign="middle"
                        bg="#efefed"
                        position="absolute"
                        borderRadius="50%"
                        right="16px"
                        top="16px"
                        pointerEvents="all"
                        _before={ {
                          verticalAlign: 'inherit',
                        } }
                      />
                      <Flex alignItems="center" flexFlow="column nowrap">
                        <Skeleton
                          isLoaded={ !loading }
                          width="72px"
                          height="72px"
                          borderRadius="50%"
                          mb="8px"
                        >
                          <Avatar
                            width={ 72 }
                            height={ 72 }
                            avatar={ subplebbit?.avatar }
                            badge
                            isOnline={ getIsOnline(subplebbit?.updatedAt) }
                            mb="8px"
                          />
                        </Skeleton>
                        <Skeleton margin="5px" isLoaded={ !loading }>
                          <Box
                            onClick={ () => history.push(`/p/${detail?.subplebbitAddress}`, []) }
                            fontWeight="700"
                            lineHeight="18px"
                            margin="5px"
                            textAlign="center"
                          >
                            { getSubName(subplebbit) }
                          </Box>
                        </Skeleton>
                      </Flex>
                    </Box>
                  </Box>
                  { edit ? (
                    <Box marginTop="8px" padding="10px">
                      { editMode === 'post' ? (
                        <Editor
                          editorState={ postEditorState }
                          setEditorState={ setPostEditorState }
                          setValue={ setEditPost }
                        />
                      ) : (
                        <Textarea
                          placeholder="Url"
                          onChange={ (e) => setEditPost(e.target.value) }
                          value={ editPost }
                          color={ color }
                        />
                      ) }
                      <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                        <Button
                          borderRadius="999px"
                          border="transparent"
                          bg="transparent"
                          onClick={ () => setEdit(false) }
                        >
                          Cancel
                        </Button>
                        <Button
                          borderRadius="999px"
                          padding="5px 10px"
                          minW="90px"
                          minH="27px"
                          onClick={ () => handleOption({ id: 'saveEdit' }) }
                          isLoading={ editLoading }
                        >
                          Save
                        </Button>
                      </Flex>
                    </Box>
                  ) : (
                    <Flex flexDir="column">
                      <Post
                        detail
                        post={ detail }
                        mode="card"
                        key={ detail?.cid }
                        handleOption={ handleOption }
                        loading={ loading }
                      />
                    </Flex>
                  ) }
                </Box>
              </Box>
            </Box>
          </Box>
          <Box minH="calc(100vh - 48px)">
            <Box padding="8px 16px 4px">
              <Box
                _before={ {
                  content: `" "`,
                  display: 'table',
                } }
                _after={ {
                  content: `" "`,
                  display: 'table',
                  clear: 'both',
                } }
              >
                <Box w="100%" lineHeight="1.5" mr="0" maxW="100%" padding="4px 0">
                  <Flex alignItems="center" flexFlow="row nowrap">
                    <Box>
                      { detailCommentCount } comment{ detailCommentCount > 1 ? 's' : '' }
                    </Box>
                  </Flex>
                </Box>

                { detail?.locked ? (
                  <LockedMessage />
                ) : (
                  <>
                    { showMEditor ? (
                      <Box margin="0 12px">
                        <Flex
                          backgroundColor="inherit"
                          color="inherit"
                          margin="0"
                          borderWidth="0"
                        >
                          <Box width="100%">
                            <Editor
                              setValue={ setContent }
                              editorState={ editorState }
                              setEditorState={ setEditorState }
                              showSubmit
                              handleSubmit={ handlePublishPost }
                              submitBtnText="Add Comment"
                              otherBtn={
                                <Button mr="auto" onClick={ () => setShowMEditor(false) }>
                                  <MdClose />
                                </Button>
                              }
                            />
                          </Box>
                        </Flex>
                      </Box>
                    ) : (
                      <Flex
                        alignItems="center"
                        flexFlow="row nowrap"
                        paddingTop="8px"
                        width="100%"
                      >
                        <Image
                          h="24px"
                          verticalAlign="middle"
                          src={ authorAvatarImageUrl }
                          alt="user-icon"
                          color="transparent"
                          borderRadius="50%"
                          w="24px"
                          mr="8px"
                        />
                        <Button
                          border={ `1px solid ${borderColor2}` }
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
                          onClick={ () => setShowMEditor(true) }
                        >
                          Leave a comment
                        </Button>
                      </Flex>
                    ) }
                  </>
                ) }
              </Box>
            </Box>
            <Box padding="16px" maxW="100%">
              { isReply ? (
                <Box
                  fontSize="12px"
                  fontWeight="700"
                  my="8px"
                  _hover={ {
                    textDecoration: 'underline',
                  } }
                  onClick={ () => setShowFullComments(!showFullComments) }
                >
                  View all comments
                </Box>
              ) : null }
              { isReply ? <Replies parent={ replyParent } reply={ reply } /> : null }
              { showFullComments &&
                comments.map((comment) => (
                  <Comment comment={ comment } key={ comment.cid } />
                )) }
            </Box>
          </Box>
        </Box>
      )
      }


      { isRemovalModalOpen && (
        <AddRemovalReason
          handleRemove={ handleEditPost }
          isOpen={ isRemovalModalOpen }
          onClose={ closeRemovalModal }
          post={ detail }
        />
      ) }
    </>
  );
}

export default PostContent;