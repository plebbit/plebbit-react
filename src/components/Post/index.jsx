import React, { useContext, useState, } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import {
  useAccountVote,
  useAuthorAvatar,
  useEditedComment,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import CardPost from './CardPost';
import ClassicPost from './ClassicPost';
import CompactPost from './CompactPost';
import { ProfileContext } from '../../store/profileContext';
import getIsOnline from '../../utils/getIsOnline';
import { useLocation } from 'react-router-dom';
import AddRemovalReason from './Modal/addRemovalReason';
import Swal from 'sweetalert2';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import usePublishUpvote from '../../hooks/usePublishUpvote';
import usePublishDownvote from '../../hooks/usePublishDownvote';
import useCommentEdit from '../../hooks/useCommentEdit';
import useStateString from '../../hooks/useStateString';

const Post = ({ type, post: data, mode, loading, detail, handleOption, allowedSpecial, stateString }) => {
  const { device, accountSubplebbits, profile } = useContext(ProfileContext);
  let post = data
  const pending = !post?.cid;
  const accountVote = useAccountVote({ commentCid: post?.cid });
  const vote = accountVote?.vote || 0
  const [postVotes] = useState(pending ? 0 : post?.upvoteCount || 0 - post?.downvoteCount || 0);
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: post?.author });
  const { baseUrl } = useContext(ProfileContext);
  const getSub = useSubplebbit({ subplebbitAddress: post?.subplebbitAddress });
  const isOnline = getIsOnline(getSub?.updatedAt);
  const [showSpoiler, setShowSpoiler] = useState(post?.spoiler);
  const owner =
    profile?.author?.address === post?.author?.address ||
    profile?.signer?.address === post?.author?.address;
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(post?.subplebbitAddress);
  const {
    onOpen: openRemovalModal,
    onClose: closeRemovalModal,
    isOpen: isRemovalModalOpen,
  } = useDisclosure();


  const mediaInfo = post && getCommentMediaInfo(post);
  const hasThumbnail = !post?.removed && post?.thumbnailUrl && !mediaInfo


  const upVote = usePublishUpvote(post)
  const downVote = usePublishDownvote(post)


  const detailPath = !pending
    ? `/p/${post?.subplebbitAddress}/c/${post?.cid}`
    : `/profile/c/${post?.index}`;

  const sharePath = `${baseUrl}p/${post?.subplebbitAddress}/c/${post?.cid}`;
  const authorPath = owner ? "/profile" : `/u/${post?.author?.address}/c/${post?.cid}`
  const location = useLocation();

  const detailRoute = {
    pathname: detailPath,
    state: {
      detail: true,
      modal: true, location
    },
  };

  const commentEdit = useCommentEdit(post)
  const handleEditPost = async (val, callBack, failedCallBack) => {
    await commentEdit(val, callBack, failedCallBack)

  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleModOption = (val) => {
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
    } else openRemovalModal();

  };

  const commentCount = post?.replyCount


  const { state: editedCommentState, editedComment } = useEditedComment({ comment: post })

  if (editedComment) {
    post = editedComment
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







  return (
    <>
      <Box>
        {/* card */ }
        { mode === 'card' && (
          <CardPost
            vote={ vote }
            postVotes={ postVotes }
            upVote={ upVote }
            downVote={ downVote }
            type={ type }
            post={ post }
            loading={ loading }
            detail={ detail }
            handleOption={ handleOption === undefined ? handleModOption : handleOption }
            copied={ copied }
            setCopied={ setCopied }
            location={ sharePath }
            avatar={ authorAvatarImageUrl }
            isOnline={ isOnline }
            subPlebbit={ getSub }
            handleCopy={ handleCopy }
            pending={ pending }
            detailRoute={ detailRoute }
            allowedSpecial={ isSpecial || allowedSpecial }
            handleEditPost={ handleEditPost }
            openRemovalModal={ openRemovalModal }
            owner={ owner }
            showSpoiler={ showSpoiler }
            setShowSpoiler={ setShowSpoiler }
            mediaInfo={ mediaInfo }
            hasThumbnail={ hasThumbnail }
            commentCount={ commentCount }
            editLabel={ editLabel }
            authorPath={ authorPath }
            stateString={ stateString }

          />
        ) }
        {/* classic */ }
        { mode === 'classic' && (
          <ClassicPost
            vote={ vote }
            postVotes={ postVotes }
            upVote={ upVote }
            downVote={ downVote }
            showContent={ showContent }
            setShowContent={ setShowContent }
            type={ type }
            post={ post }
            loading={ loading }
            detail={ detail }
            handleOption={ handleOption === undefined ? handleModOption : handleOption }
            copied={ copied }
            setCopied={ setCopied }
            location={ sharePath }
            avatar={ authorAvatarImageUrl }
            isOnline={ isOnline }
            subPlebbit={ getSub }
            handleCopy={ handleCopy }
            pending={ pending }
            detailRoute={ detailRoute }
            allowedSpecial={ isSpecial || allowedSpecial }
            handleEditPost={ handleEditPost }
            openRemovalModal={ openRemovalModal }
            owner={ owner }
            showSpoiler={ showSpoiler }
            setShowSpoiler={ setShowSpoiler }
            mediaInfo={ mediaInfo }
            hasThumbnail={ hasThumbnail }
            commentCount={ commentCount }
            editLabel={ editLabel }
            authorPath={ authorPath }
            stateString={ stateString }

          />
        ) }
        {/* compact */ }
        { mode === 'compact' &&
          (device === 'pc' ? (
            <CompactPost
              vote={ vote }
              postVotes={ postVotes }
              upVote={ upVote }
              downVote={ downVote }
              showContent={ showContent }
              setShowContent={ setShowContent }
              type={ type }
              post={ post }
              loading={ loading }
              detail={ detail }
              handleOption={ handleOption === undefined ? handleModOption : handleOption }
              copied={ copied }
              setCopied={ setCopied }
              location={ sharePath }
              avatar={ authorAvatarImageUrl }
              isOnline={ isOnline }
              subPlebbit={ getSub }
              handleCopy={ handleCopy }
              detailRoute={ detailRoute }
              pending={ pending }
              allowedSpecial={ isSpecial || allowedSpecial }
              handleEditPost={ handleEditPost }
              openRemovalModal={ openRemovalModal }
              owner={ owner }
              showSpoiler={ showSpoiler }
              setShowSpoiler={ setShowSpoiler }
              mediaInfo={ mediaInfo }
              hasThumbnail={ hasThumbnail }
              commentCount={ commentCount }
              editLabel={ editLabel }
              authorPath={ authorPath }
              stateString={ stateString }

            />
          ) : (
            <ClassicPost
              vote={ vote }
              postVotes={ postVotes }
              upVote={ upVote }
              downVote={ downVote }
              showContent={ showContent }
              setShowContent={ setShowContent }
              type={ type }
              post={ post }
              loading={ loading }
              detail={ detail }
              handleOption={ handleOption === undefined ? handleModOption : handleOption }
              copied={ copied }
              setCopied={ setCopied }
              location={ sharePath }
              avatar={ authorAvatarImageUrl }
              isOnline={ isOnline }
              subPlebbit={ getSub }
              handleCopy={ handleCopy }
              pending={ pending }
              detailRoute={ detailRoute }
              allowedSpecial={ isSpecial || allowedSpecial }
              handleEditPost={ handleEditPost }
              openRemovalModal={ openRemovalModal }
              owner={ owner }
              showSpoiler={ showSpoiler }
              setShowSpoiler={ setShowSpoiler }
              mediaInfo={ mediaInfo }
              hasThumbnail={ hasThumbnail }
              commentCount={ commentCount }
              editLabel={ editLabel }
              authorPath={ authorPath }
              stateString={ stateString }

            />
          )) }
      </Box>
      { isRemovalModalOpen && (
        <AddRemovalReason
          handleRemove={ handleEditPost }
          isOpen={ isRemovalModalOpen }
          onClose={ closeRemovalModal }
          post={ post }
        />
      ) }
    </>
  );
};
export default Post;
