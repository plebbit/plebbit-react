import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  Icon,
  Tag,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuthorAvatar, useAccountVote, useEditedComment, useAccountComment, useAuthorAddress, useAccountSubplebbits, useAccount } from '@plebbit/plebbit-react-hooks';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { EditorState } from 'draft-js';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsBookmark, BsChat, BsFlag, BsShield } from 'react-icons/bs';
import Editor from '../../Editor';
import Marked from '../../Editor/marked';
import dateToNow from '../../../utils/formatDate';
import numFormatter from '../../../utils/numberFormater';
import getUserName from '../../../utils/getUserName';
import Avatar from '../../Avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DropDown from '../../DropDown';
import { FiMoreHorizontal } from 'react-icons/fi';
import { GoGift } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import useRepliesAndAccountReplies from '../../../hooks/useRepliesAndAccountReplies';
import usePublishUpvote from '../../../hooks/usePublishUpvote';
import usePublishDownvote from '../../../hooks/usePublishDownvote';
import EditLabel from '../../Label/editLabel';
import PendingLabel from '../../Label/pendingLabel';
import FlairLabel from '../../Label/flairLabel';
import Link from '../../Link';
import useStateString from '../../../hooks/useStateString';
import StateString from '../../Label/stateString';
import usePublishComment from '../../../hooks/usePublishComment';
import ConfirmDelete from '../Modal/confirmDelete';
import AddRemovalReason from '../Modal/addRemovalReason';
import useStore from '../../../store/useStore';

const Comment = ({ comment: data, disableReplies, singleComment, loading, type }) => {
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
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: comment?.author });
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { baseUrl } = useStore(state => state);
  const [copied, setCopied] = useState(false);
  const commentPending = comment?.state === 'pending';
  const commentFailed = comment?.state === 'failed';
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(comment?.subplebbitAddress);
  const {
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
    isOpen: isDeleteModalOpen,
  } = useDisclosure();
  const {
    onOpen: openRemovalModal,
    onClose: closeRemovalModal,
    isOpen: isRemovalModalOpen,
  } = useDisclosure();
  const { authorAddress, shortAuthorAddress } = useAuthorAddress({ comment })


  const owner =
    profile?.author?.address === authorAddress ||
    profile?.signer?.address === authorAddress;

  const upVote = usePublishUpvote(comment)
  const downVote = usePublishDownvote(comment)
  //options needed to publish a comment


  const { publishComment } = usePublishComment(content, comment)

  const accountComment = useAccountComment({ commentIndex: comment?.index })


  const handlePublishPost = async () => {
    await publishComment(() => {
      setContent('');
      setEditorState(EditorState.createEmpty());
    }, () => {

    });
  };


  const handleOption = (val) => {
    if (val?.id === 'delete') {
      openDeleteModal()
    } else {
      openRemovalModal()
    }
  };

  const oneComment = (
    <Comment
      key={ singleComment?.cid }
      comment={ singleComment }
      type="singleComment"
      loading={ loading }
    />
  );





  // comment replies
  const firstComment = (<Comment
    key={ replies[0]?.cid }
    comment={ replies[0] }
    type={ replies[0]?.cid === singleComment?.cid ? 'singleComment' : 'child' }
    loading={ loading }
  />)

  const repliesComponent = (replies?.slice(1) || []).map((data) => {
    return (
      <Comment
        key={ data?.cid }
        comment={ data }
        type={ data?.cid === singleComment?.cid ? 'singleComment' : 'child' }
        loading={ loading }
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

  const stateString = useStateString(accountComment)


  return (
    <Flex marginTop="15px" bg={ type === 'singleComment' && commentBg } padding="8px 0 0 8px">
      <Flex marginRight="8px" flexDir="column" alignItems="center">
        <Avatar loading={ loading } width={ 28 } height={ 28 } avatar={ authorAvatarImageUrl } mb="10px" />

        { !loading && <Box borderRight="2px solid #edeff1" width="0" height="100%" /> }
      </Flex>

      <Flex flexDir="column" flexGrow={ 1 }>
        <Flex flexDir="column" mb="6px">
          <Flex mr="4px" height={ loading && '20px' } width={ loading && "50%" } as={ loading && Skeleton } fontWeight="400" fontSize="12px">
            <Box mr='5px' isTruncated as={ Link } to={ authorPath }>{ getUserName(comment?.author) } </Box>
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
              fontSize="6px"
              lineHeight="20px"
              margin="0 4px"
              color={ iconColor }
            >
              •
            </Box>
            <Box color={ iconColor } >
              { dateToNow(comment?.timestamp * 1000) }
            </Box>
            { commentPending && <StateString stateString={ stateString } textSx={ {
              fontWeight: "400 !important",
              fontSize: "12px !important",

            } } /> }
            { comment?.flair?.text && (
              <Box ml='4px'>

                <FlairLabel flair={ comment?.flair } />
              </Box>
            ) }
          </Flex>


        </Flex>
        <Skeleton height={ loading && "120px" } isLoaded={ !loading }>
          <Box padding="2px 0" fontSize="14px" fontWeight="400" lineHeight="21px" mb="6px" word>
            <Marked content={ comment?.content || '' } />
          </Box>
        </Skeleton>
        {/* footer */ }
        { (loading || commentPending || commentFailed) ? (
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
                onClick={ disableReplies ? null : upVote }
                disabled={ disableReplies }
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
                onClick={ disableReplies ? null : downVote }
                icon={ <Icon as={ voteMode === -1 ? ImArrowDown : BiDownvote } w="20px" h="20px" /> }
                disabled={ disableReplies }
              />
            </Flex>
            { !disableReplies && <Box
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
            </Box> }

            <CopyToClipboard
              text={ `${baseUrl}p/${comment?.subplebbitAddress}/c/${comment?.cid}/` }
              onCopy={ () => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 3000);
              } }
            >
              <Box
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
              </Box>
            </CopyToClipboard>
            <Flex justifyContent="center">
              <DropDown
                onChange={ (val) => handleOption(val?.id) }
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
                  onChange={ (val) => handleOption(val?.id) }
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
            resize='none'
          >

            <Editor
              setValue={ setContent }
              editorState={ editorState }
              setEditorState={ setEditorState }
              showSubmit
              handleSubmit={ handlePublishPost }
              value={ content }
            />
          </Box>
        ) : (
          ''
        ) }
        {/* when visiting a neested reply from link */ }
        { singleComment && oneComment }
        {/* show replies button */ }
        { !loading && !showReplies && (commentCount - 1) > 0 && <Box
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

      {
        isDeleteModalOpen && <ConfirmDelete
          isOpen={ isDeleteModalOpen }
          onClose={ closeDeleteModal }
          post={ comment }
          title="Delete comment"
          message="Are you sure you want to delete your comment?"
          cancelText="Keep"

        />
      }

      { isRemovalModalOpen && (
        <AddRemovalReason
          isOpen={ isRemovalModalOpen }
          onClose={ closeRemovalModal }
          post={ comment }
          hideList={ ['pinned', 'reason'] }
        />
      ) }
    </Flex>
  );
};

export default Comment;


