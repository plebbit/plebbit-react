import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  useColorModeValue,
  IconButton,
  Icon,
  useToast,
  Tag,
} from '@chakra-ui/react';
import { usePublishVote, usePublishComment, usePublishCommentEdit, useAuthorAvatar, useAccountVote } from '@plebbit/plebbit-react-hooks';
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

const Comment = ({ comment, disableReplies, singleComment, type }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const commentBg = useColorModeValue('rgba(0,121,211,0.05)', 'rgba(215,218,220,0.05)');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const [vote, setVote] = useState(+comment?.upvoteCount - +comment?.downvoteCount);
  const { vote: postVote } = useAccountVote({ commentCid: comment?.cid });
  const [voteMode, setVoteMode] = useState(postVote === undefined ? 0 : postVote);
  const [reply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const toast = useToast();

  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: comment?.author });
  const { baseUrl, profile, accountSubplebbits } = useContext(ProfileContext);
  const [copied, setCopied] = useState(false);
  const [loader, setLoader] = useState(false);
  const commentPending = !comment?.cid;
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(comment?.subplebbitAddress);

  const [update, setUpdate] = useState({})

  const owner =
    profile?.author?.address === comment?.author?.address ||
    profile?.signer?.address === comment?.author?.address;

  //function to verify challenge
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
      setEditorState(EditorState.createEmpty());
      setLoader(false);

      logger('challenge-success', { challengeVerification }, 'trace');
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challenge-failed',
        {
          reason: challengeVerification.reason,
          errors: challengeVerification.challengeErrors,
        },
        'trace'
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
      setLoader(false);

    }
  };


  //challenge function for user
  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('declined Challenge', error, 'trace');
      toast({
        title: 'Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    logger('challenge-answer', { challengeAnswers, comment }, 'trace');
    if (challengeAnswers) {
      const res = await comment.publishChallengeAnswers(challengeAnswers);
      logger('create:comment:response', res, 'trace');
    }
  };

  const publishVoteOptions = {
    vote: voteMode,
    commentCid: comment?.cid,
    subplebbitAddress: comment?.subplebbitAddress,
    onChallenge,
    onChallengeVerification,
    onError: onError,
  }
  const { publishVote } = usePublishVote(publishVoteOptions)


  const handleVote = (curr) => {
    setVoteMode(curr)
    try {
      publishVote();
    } catch (error) {
      logger('voting-declined', error, 'error');
      toast({
        title: 'Voting Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };


  useEffect(() => {
    setVote(+comment?.upvoteCount - +comment?.downvoteCount);
    setVoteMode(comment?.vote)
  }, [comment?.vote])

  //options needed to publish a comment
  const publishCommentOptions = {
    content,
    parentCid: comment?.cid, // if top level reply to a post, same as postCid
    subplebbitAddress: comment?.subplebbitAddress,
    onChallenge,
    onChallengeVerification,
    onError: onError,
  }

  const { publishComment } = usePublishComment(publishCommentOptions)


  const handlePublishPost = () => {
    try {
      setLoader(true);
      publishComment();
    } catch (error) {
      logger('create:comment:response', error, 'error');
      toast({
        title: 'Comment Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };



  const publishCommentEditOptions = {
    commentCid: comment?.cid,
    subplebbitAddress: comment?.subplebbitAddress,
    ...update,
    onChallenge,
    onChallengeVerification,
    onError: onError,
  }
  const { publishCommentEdit } = usePublishCommentEdit(publishCommentEditOptions)

  const handleEditPost = async (val, callBack, failedCallBack) => {
    setUpdate({ ...val })
    try {
      await publishCommentEdit();
      callBack ? callBack() : '';
    } catch (error) {
      logger('edit:comment:response:', error, 'error');
      toast({
        title: 'Comment Edit Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      failedCallBack ? failedCallBack() : '';
    }
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
      parentCid={ singleComment?.cid }
    />
  );

  const nestedComments = (comment?.replies?.pages?.topAll?.comments || []).map((data) => {
    return (
      <Comment
        key={ data?.cid }
        comment={ data }
        type={ data?.cid === singleComment?.cid ? 'singleComment' : 'child' }
        parentCid={ data?.cid }
      />
    );
  });
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
              <Box isTruncated>{ getUserName(comment?.author) } </Box>
            </Box>

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
            <Box
              backgroundColor={ comment?.flair?.color }
              color="#fff"
              width="fit-content"
              padding="0 4px"
              fontWeight="400"
              fontSize="12px"
              mt="2px"
              borderRadius="2px"
            >
              { comment?.flair?.text }
            </Box>
          ) }
        </Flex>
        <Box padding="2px 0" fontSize="14px" fontWeight="400" lineHeight="21px" mb="6px" word>
          <Marked content={ comment?.content || '' } />
          { commentPending && (
            <Tag size="sm" colorScheme="yellow" variant="outline">
              Pending
            </Tag>
          ) }
        </Box>
        {/* footer */ }
        { commentPending ? (
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
                onClick={ () => {
                  setVoteMode(voteMode === 1 ? 0 : 1);
                  handleVote(voteMode === 1 ? 0 : 1);
                } }
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
                onClick={ () => {
                  setVoteMode(voteMode === -1 ? 0 : -1);
                  handleVote(voteMode === -1 ? 0 : -1);
                } }
                icon={ <Icon as={ voteMode === -1 ? ImArrowDown : BiDownvote } w="20px" h="20px" /> }
              />
            </Flex>
            <Link
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
            </Link>

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
              loading={ loader }
            />
          </Box>
        ) : (
          ''
        ) }
        { singleComment && oneComment }
        { !disableReplies && showReplies ? (
          nestedComments
        ) : comment?.replies?.pages?.topAll?.comments.length > 0 ? (
          <Box
            onClick={ () => setShowReplies(true) }
            fontSize="12px"
            fontWeight="700"
            lineHeight="16px"
            color="#a4a4a4"
            ml="4px"
            pl="4px"
            cursor="pointer"
          >
            { comment?.replyCount }
            { comment?.replyCount > 0 ? ' more' : '' } repl{ comment?.replyCount === 1 ? 'y' : 'ies' }
          </Box>
        ) : (
          ''
        ) }
      </Flex>
    </Flex>
  );
};

export default Comment;
