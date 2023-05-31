import React, { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Text,

  useColorModeValue,
  IconButton,
  Icon,
  useToast,
  Tag,
} from '@chakra-ui/react';
import { usePublishComment, useAuthorAvatar, useAccountVote, useEditedComment } from '@plebbit/plebbit-react-hooks';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { EditorState } from 'draft-js';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsBookmark, BsChat, BsFlag, BsShield } from 'react-icons/bs';
import Editor from '../../Editor';
import Marked from '../../Editor/marked';
import dateToNow from '../../../utils/formatDate';
import numFormatter from '../../../utils/numberFormater';
import getUserName from '../../../utils/getUserName';
import logger from '../../../utils/logger';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';
import Avatar from '../../Avatar';
import onError from '../../../utils/onError';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ProfileContext } from '../../../store/profileContext';
import DropDown from '../../DropDown';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GoGift } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import useRepliesAndAccountReplies from '../../../hooks/useRepliesAndAccountReplies';
import usePublishUpvote from '../../../hooks/usePublishUpvote';
import usePublishDownvote from '../../../hooks/usePublishDownvote';
import useCommentEdit from '../../../hooks/useCommentEdit';
import onChallenge from '../../../utils/onChallenge';
import onChallengeVerification from '../../../utils/onChallengeVerification';
import EditLabel from '../../Label/editLabel';
import PendingLabel from '../../Label/pendingLabel';
import FlairLabel from '../../Label/flairLabel';
import Link from '../../Link';

const Comment = ({ comment: data, disableReplies, singleComment, type }) => {
  let comment = data
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const commentBg = useColorModeValue('rgba(0,121,211,0.05)', 'rgba(215,218,220,0.05)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const replies = useRepliesAndAccountReplies(comment)
  const [vote] = useState(+comment?.upvoteCount || 0 - +comment?.downvoteCount || 0);
  const postVote = useAccountVote({ commentCid: comment?.cid });
  const voteMode = postVote?.vote || 0;
  const [reply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const toast = useToast();
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: comment?.author });
  const { baseUrl, profile, accountSubplebbits } = useContext(ProfileContext);
  const [copied, setCopied] = useState(false);
  const commentPending = comment?.state === 'pending';
  const commentFailed = comment?.state === 'failed';
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(comment?.subplebbitAddress);


  const owner =
    profile?.author?.address === comment?.author?.address ||
    profile?.signer?.address === comment?.author?.address;

  const upVote = usePublishUpvote(comment)
  const downVote = usePublishDownvote(comment)
  //options needed to publish a comment
  const publishCommentOptions = {
    content,
    parentCid: comment?.cid, // if top level reply to a post, same as postCid
    subplebbitAddress: comment?.subplebbitAddress,
    onChallenge,
    onChallengeVerification: (challengeVerification, comment) => onChallengeVerification(challengeVerification, comment, () => {
      setContent('');
      setEditorState(EditorState.createEmpty());
    }),
    onError,
  }

  const { publishComment } = usePublishComment(publishCommentOptions)


  const handlePublishPost = () => {
    try {
      publishComment();
    } catch (error) {
      logger('create:comment:response', error, 'error');
      toast({
        title: 'Comment Declined.',
        description: error?.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setContent('')
  };




  const commentEdit = useCommentEdit(comment)
  const handleEditPost = async (val, callBack, failedCallBack) => {
    await commentEdit(val, callBack, failedCallBack)
  };
  const handleOption = (val) => {
    if (val?.id === 'delete') {
      Swal.fire({
        title: 'Do you want to delete this post?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonColor: '#d33',
        confirmButtonColor: 'grey',
        icon: 'warning',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleEditPost({ deleted: true });
        }
      });
    }
  };

  const oneComment = (
    <Comment
      key={ singleComment?.cid }
      comment={ singleComment }
      type="singleComment"

    />
  );





  // comment replies
  const firstComment = (<Comment
    key={ replies[0]?.cid }
    comment={ replies[0] }
    type={ replies[0]?.cid === singleComment?.cid ? 'singleComment' : 'child' }

  />)

  const repliesComponent = (replies?.slice(1) || []).map((data) => {
    return (
      <Comment
        key={ data?.cid }
        comment={ data }
        type={ data?.cid === singleComment?.cid ? 'singleComment' : 'child' }

      />
    );
  });




  const commentCount = replies?.length


  const { state: editedCommentState, editedComment } = useEditedComment({ comment: comment })

  if (editedComment) {
    comment = editedComment
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
  const authorPath = owner ? "/profile" : `/u/${comment?.author?.address}/c/${comment?.cid}`




  return (
    <Flex marginTop="15px" bg={ type === 'singleComment' && commentBg } padding="8px 0 0 8px">
      <Flex marginRight="8px" flexDir="column" alignItems="center">
        <Avatar width={ 28 } height={ 28 } avatar={ authorAvatarImageUrl } mb="10px" />

        <Box borderRight="2px solid #edeff1" width="0" height="100%" />
      </Flex>

      <Flex flexDir="column" flexGrow={ 1 }>
        <Flex flexDir="column" mb="6px">
          <Flex alignItems="center" fontWeight="400" fontSize="12px">
            <Box maxW="50%" mr="5px">
              <Box isTruncated as={ Link } to={ authorPath }>{ getUserName(comment?.author) } </Box>
            </Box>

            { commentPending && (
              <PendingLabel />
            ) }
            { commentFailed && (
              <Tag size="sm" colorScheme="red" variant="outline">
                Failed
              </Tag>
            ) }
            {/* edit status */ }
            <EditLabel editLabel={ editLabel } post={ comment } />

            <Box
              as="span"
              verticalAlign="middle"
              fontWeight="800"
              fontSize="10px"
              lineHeight="20px"
              margin="0 4px"
            >
              •
            </Box>
            <Box color={ iconColor }>
              <i> { dateToNow(comment?.timestamp * 1000) }</i>
            </Box>
          </Flex>
          { comment?.flair?.text && (
            <FlairLabel flair={ comment?.flair } />
          ) }
        </Flex>
        <Box padding="2px 0" fontSize="14px" fontWeight="400" lineHeight="21px" mb="6px" word>
          <Marked content={ comment?.content || '' } />

        </Box>
        {/* footer */ }
        { (commentPending || commentFailed) ? (
          <Flex />
        ) : (
          <Flex color={ iconColor }>
            <Flex
              alignItems="center"
              maxH=""
              p="4px"
              width="auto"
              maxWidth="110px"
              minWidth="32px"
              mr="10px"
              flexShrink="0"
            >
              <IconButton
                aria-label="Upvote Post"
                color={ voteMode === 1 ? 'upvoteOrange' : iconColor }
                w="24px"
                h="24px"
                bg="none"
                minW="24px"
                minH="24px"
                border="none"
                borderRadius="2px"
                _hover={ {
                  color: 'upvoteOrange',
                  bg: bottomButtonHover,
                } }
                _focus={ {
                  outline: 'none',
                } }
                onClick={ upVote }
                icon={ <Icon as={ voteMode === 1 ? ImArrowUp : BiUpvote } w="20px" h="20px" /> }
              />
              <Box fontSize="14px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
                { numFormatter(vote + voteMode) === 0 ? 'vote' : numFormatter(vote + voteMode) || 0 }
              </Box>
              <IconButton
                aria-label="Downvote Post"
                color={ voteMode === -1 ? 'downvoteBlue' : iconColor }
                w="24px"
                h="24px"
                minW="24px"
                minH="24px"
                border="none"
                bg="none"
                borderRadius="2px"
                _hover={ {
                  color: 'downvoteBlue',
                  bg: bottomButtonHover,
                } }
                _focus={ {
                  outline: 'none',
                } }
                onClick={ downVote }
                icon={ <Icon as={ voteMode === -1 ? ImArrowDown : BiDownvote } w="20px" h="20px" /> }
              />
            </Flex>
            { !disableReplies && <Link
              display="flex"
              alignItems="center"
              borderRadius="2px"
              padding="2px"
              marginRight="4px"
              _hover={ {
                textDecor: 'none',
                outline: 'none',
                bg: bottomButtonHover,
              } }
              _focus={ {
                boxShadow: 'none',
              } }
              onClick={ () => setShowReply(!reply) }
            >
              <Icon as={ BsChat } height="20px" width="20px" mr="5px" />
              <Text
                fontSize="12px"
                fontWeight="700"
                lineHeight="16px"
                pointerEvents="none"
                color=""
              >
                Reply
              </Text>
            </Link> }

            <CopyToClipboard
              text={ `${baseUrl}p/${comment?.subplebbitAddress}/c/${comment?.cid}` }
              onCopy={ () => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 3000);
              } }
            >
              <Link
                display="flex"
                alignItems="center"
                borderRadius="2px"
                padding="4px"
                marginRight="4px"
                _hover={ {
                  textDecor: 'none',
                  outline: 'none',
                  bg: bottomButtonHover,
                } }
                _focus={ {
                  boxShadow: 'none',
                } }
                sx={ {
                  '@media (min-width: 1280px)': {},
                  '@media (max-width: 1120px)': {
                    display: 'none',
                  },
                } }
              >
                <Text
                  fontSize="12px"
                  fontWeight="700"
                  lineHeight="16px"
                  pointerEvents="none"
                  color=""
                >
                  { copied ? 'Copied' : 'share' }
                </Text>
              </Link>
            </CopyToClipboard>
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
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    } }
                  >
                    <Icon as={ FiMoreHorizontal } color={ iconColor } h="20px" w="20px" />
                  </Flex>
                }
                options={ [
                  {
                    label: 'Give Award',
                    icon: GoGift,
                    id: 'award',
                  },
                  {
                    label: 'Report',
                    icon: BsFlag,
                    id: 'award',
                    disabled: owner,
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
                ] }
                rightOffset={ 0 }
                leftOffset="none"
                topOffset="34px"
              />
            </Flex>
            { isSpecial && (
              <Flex justifyContent="center">
                <DropDown
                  onChange={ (val) => handleEditPost({ [val?.id]: comment[val?.id] ? false : true }) }
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
                        color: 'downvoteBlue',
                        bg: bottomButtonHover,
                      } }
                      _focus={ {
                        outline: 'none',
                      } }
                    >
                      <Icon as={ BsShield } color={ iconColor } h="20px" w="20px" />
                    </Flex>
                  }
                  options={ [
                    {
                      label: !comment?.removed ? 'Approved' : 'Approve',
                      id: 'removed',
                      color: !comment?.removed ? ' green' : 'red',
                    },
                    {
                      label: 'Lock Comments',
                      id: 'locked',
                      color: comment?.locked && 'red',
                    },
                  ] }
                  rightOffset={ 0 }
                  leftOffset="none"
                  topOffset="34px"
                />
              </Flex>
            ) }
          </Flex>
        ) }
        { reply ? (
          <Box
            minH="150px"
            borderRadius="4px"
            overflow="hidden auto"
            padding="8px 16px"
            resize="vertical"
          >

            <Editor
              setValue={ setContent }
              editorState={ editorState }
              setEditorState={ setEditorState }
              showSubmit
              handleSubmit={ handlePublishPost }


            />
          </Box>
        ) : (
          ''
        ) }
        {/* when visiting a neested reply from link */ }
        { singleComment && oneComment }
        {/* show replies button */ }
        { !showReplies && (commentCount - 1) > 0 && <Box
          onClick={ () => setShowReplies(true) }
          fontSize="12px"
          fontWeight="700"
          lineHeight="16px"
          color="#a4a4a4"
          ml="4px"
          pl="4px"
          cursor="pointer"
        >
          { commentCount - 1 }
          { (commentCount - 1) > 0 ? ' more' : '' } repl{ (commentCount - 1) > 1 ? 'ies' : 'y' }
        </Box> }

        {/* nested comments */ }
        { replies[0] && firstComment }
        {
          showReplies && repliesComponent
        }
      </Flex>
    </Flex>
  );
};

export default Comment;


