import React, { useMemo, useState, } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import {
  useAccountVote,
  useAuthorAvatar,
  useBlock,
  useEditedComment,
  useSubplebbit,
  useAuthorAddress,
  useAccount,
  useAccountSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import CardPost from './CardPost/cardPost2';
import ClassicPost from './ClassicPost/ClassicPost2';
import CompactPost from './CompactPost/CompactPost2';
import getIsOnline from '../../utils/getIsOnline';
import AddRemovalReason from './Modal/addRemovalReason';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import usePublishUpvote from '../../hooks/usePublishUpvote';
import usePublishDownvote from '../../hooks/usePublishDownvote';
import ConfirmDelete from './Modal/confirmDelete';
import youtube_parser from '../../utils/youtubeParser';
import useStore from '../../store/useStore';
import { canEmbed } from '../Embed';

const Post = ({ type, post: data, mode, loading, detail, handleOption, allowedSpecial, stateString }) => {
  const profile = useAccount();
  const { device } = useStore(state => state);
  let post = data
  const pending = !post?.cid;
  const accountVote = useAccountVote({ commentCid: post?.cid });
  const vote = accountVote?.vote || 0
  const [postVotes] = useState(pending ? 0 : post?.upvoteCount || 0 - post?.downvoteCount || 0);
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: post?.author });
  const { baseUrl } = useStore(state => state);
  const getSub = useSubplebbit({ subplebbitAddress: post?.subplebbitAddress });
  const { authorAddress } = useAuthorAddress({ comment: post })
  const isOnline = getIsOnline(getSub?.updatedAt);
  const [showSpoiler, setShowSpoiler] = useState(post?.spoiler);
  const owner =
    profile?.author?.address === authorAddress ||
    profile?.signer?.address === authorAddress;
  const { accountSubplebbits } = useAccountSubplebbits()
  const isSpecial = Object.keys(accountSubplebbits || {})?.includes(post?.subplebbitAddress);
  const { blocked, unblock, block } = useBlock({ cid: post?.cid })
  const { blocked: muted, unblock: unMute, block: mute } = useBlock({ address: post?.subplebbitAddress })
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

  const isYoutube = () => {
    try {
      const parsedUrl = new URL(post?.link)
      if (canEmbed(parsedUrl)) {
        return canEmbed(parsedUrl)
      }
    }
    catch (e) { }
    return;
  }


  const mediaInfo = post && getCommentMediaInfo(post);
  const hasThumbnail = !post?.removed && post?.thumbnailUrl && !mediaInfo && !isYoutube()


  const upVote = usePublishUpvote(post)
  const downVote = usePublishDownvote(post)


  const detailPath = loading ? '' : !pending
    ? `/p/${post?.subplebbitAddress}/c/${post?.cid}/`
    : `/profile/c/${post?.index}`;

  const sharePath = `${baseUrl}p/${post?.subplebbitAddress}/c/${post?.cid}/`;
  const authorPath = owner ? "/profile/" : `/u/${post?.author?.address}/c/${post?.cid}/`

  const detailRoute = detailPath




  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleModOption = (val) => {
    if (val?.id === 'delete') {
      openDeleteModal()
    }
    else if (val?.id === 'block') {
      blocked ? unblock() : block()
    }
    else if (val?.id === 'unknown') {
      return;
    }
    else if (val?.id === 'copy') {
      handleCopy()
    }
    else if (val?.id === 'mute') {
      muted ? unMute() : mute()
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
            upVote={ post?.locked ? null : upVote }
            downVote={ post?.locked ? null : downVote }
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
            blocked={ blocked }
            muted={ muted }


          />
        ) }
        {/* classic */ }
        { mode === 'classic' && (
          <ClassicPost
            vote={ vote }
            postVotes={ postVotes }
            upVote={ post?.locked ? null : upVote }
            downVote={ post?.locked ? null : downVote }
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
            blocked={ blocked }
            muted={ muted }


          />
        ) }
        {/* compact */ }
        { mode === 'compact' &&
          (device === 'pc' ? (
            <CompactPost
              vote={ vote }
              postVotes={ postVotes }
              upVote={ post?.locked ? null : upVote }
              downVote={ post?.locked ? null : downVote }
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
              blocked={ blocked }
              muted={ muted }
              isYoutube={ isYoutube }


            />
          ) : (
            <ClassicPost
              vote={ vote }
              postVotes={ postVotes }
              upVote={ post?.locked ? null : upVote }
              downVote={ post?.locked ? null : downVote }
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
              blocked={ blocked }
              muted={ muted }

            />
          )) }
      </Box>
      { isRemovalModalOpen && (
        <AddRemovalReason
          isOpen={ isRemovalModalOpen }
          onClose={ closeRemovalModal }
          post={ post }
        />
      ) }
      {
        isDeleteModalOpen && <ConfirmDelete
          isOpen={ isDeleteModalOpen }
          onClose={ closeDeleteModal }
          post={ post }
        />
      }
    </>
  );
};
export default Post;
