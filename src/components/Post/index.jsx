import React, { useContext, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import {
  useAccountsActions,
  useAccountVote,
  useAuthorAvatarImageUrl,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import CardPost from './CardPost';
import ClassicPost from './ClassicPost';
import CompactPost from './CompactPost';
import logger from '../../utils/logger';
import { ProfileContext } from '../../store/profileContext';
import getIsOnline from '../../utils/getIsOnline';
import onError from '../../utils/onError';
import getChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import { useLocation } from 'react-router-dom';
import AddRemovalReason from './Modal/addRemovalReason';
import Swal from 'sweetalert2';

const Post = ({ type, post, mode, loading, detail, handleOption, allowedSpecial }) => {
  const { device, accountSubplebbits, profile } = useContext(ProfileContext);
  const pending = !post?.cid;
  const postVote = useAccountVote(post?.cid);
  const vote = postVote?.vote || 0;
  const [postVotes, setPostVotes] = useState(pending ? 0 : post?.upvoteCount - post?.downvoteCount);
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const { publishVote, publishCommentEdit } = useAccountsActions();
  const authorAvatarImageUrl = useAuthorAvatarImageUrl(post?.author);
  const { baseUrl } = useContext(ProfileContext);
  const getSub = useSubplebbit(post?.subplebbitAddress);
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
  const onChallengeVerification = (challengeVerification, comment) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    if (challengeVerification.challengeSuccess === true) {
      toast({
        title: 'Accepted.',
        description: 'Action accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      logger('challenge-success', challengeVerification, 'trace');
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challenge-failed',
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
    }

    logger('challenge-verified', { challengeVerification, comment }, 'trace');
  };
  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('vote:challeng', error, 'error');
      toast({
        title: 'Challenge Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      try {
        await comment.publishChallengeAnswers(challengeAnswers);
      } catch (error) {
        logger('challenge-failed', error?.message, 'error');
        toast({
          title: 'Publish Challenge Declined.',
          description: error?.stack.toString(),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleVoting = async (curr) => {
    setPostVotes((prev) => prev + curr);
    handleVote(curr);
  };

  const handleVote = async (curr) => {
    try {
      await publishVote({
        vote: curr,
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError: onError,
      });
    } catch (error) {
      logger('Voting-Declined', error, 'error');
      setPostVotes((prev) => prev - curr);
      toast({
        title: 'Voting Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const detailPath = !pending
    ? `/p/${post?.subplebbitAddress}/c/${post?.cid}`
    : `/profile/c/${post?.index}`;

  const sharePath = `${baseUrl}p/${post?.subplebbitAddress}/c/${post?.cid}`;
  const location = useLocation();

  const detailRoute = {
    pathname: detailPath,
    state: { detail: post, modal: true, location },
  };

  const handleEditPost = async (update, callBack, failedCallBack) => {
    try {
      await publishCommentEdit({
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError: onError,
        ...update,
      });
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
    } else if (val?.id === 'approved') {
      handleEditPost({ removed: false });
    } else if (val?.id === 'removed') {
      handleEditPost({ removed: true });
    } else handleEditPost({ [val?.id]: post[val?.id] ? false : true });
  };

  return (
    <>
      <Box>
        {/* card */}
        {mode === 'card' && (
          <CardPost
            vote={vote}
            postVotes={postVotes}
            handleVoting={!pending ? handleVoting : ''}
            type={type}
            post={post}
            loading={loading}
            detail={detail}
            handleOption={handleOption === undefined ? handleModOption : handleOption}
            copied={copied}
            setCopied={setCopied}
            location={sharePath}
            avatar={authorAvatarImageUrl}
            isOnline={isOnline}
            subPlebbit={getSub}
            handleCopy={handleCopy}
            pending={pending}
            detailRoute={detailRoute}
            allowedSpecial={isSpecial || allowedSpecial}
            handleEditPost={handleEditPost}
            openRemovalModal={openRemovalModal}
            owner={owner}
            showSpoiler={showSpoiler}
            setShowSpoiler={setShowSpoiler}
          />
        )}
        {/* classic */}
        {mode === 'classic' && (
          <ClassicPost
            vote={vote}
            postVotes={postVotes}
            handleVoting={!pending ? handleVoting : ''}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            detail={detail}
            handleOption={handleOption === undefined ? handleModOption : handleOption}
            copied={copied}
            setCopied={setCopied}
            location={sharePath}
            avatar={authorAvatarImageUrl}
            isOnline={isOnline}
            subPlebbit={getSub}
            handleCopy={handleCopy}
            pending={pending}
            detailRoute={detailRoute}
            allowedSpecial={isSpecial || allowedSpecial}
            handleEditPost={handleEditPost}
            openRemovalModal={openRemovalModal}
            owner={owner}
            showSpoiler={showSpoiler}
            setShowSpoiler={setShowSpoiler}
          />
        )}
        {/* compact */}
        {mode === 'compact' &&
          (device === 'pc' ? (
            <CompactPost
              vote={vote}
              postVotes={postVotes}
              handleVoting={!pending ? handleVoting : ''}
              showContent={showContent}
              setShowContent={setShowContent}
              type={type}
              post={post}
              loading={loading}
              detail={detail}
              handleOption={handleOption === undefined ? handleModOption : handleOption}
              copied={copied}
              setCopied={setCopied}
              location={sharePath}
              avatar={authorAvatarImageUrl}
              isOnline={isOnline}
              subPlebbit={getSub}
              handleCopy={handleCopy}
              detailRoute={detailRoute}
              pending={pending}
              allowedSpecial={isSpecial || allowedSpecial}
              handleEditPost={handleEditPost}
              openRemovalModal={openRemovalModal}
              owner={owner}
              showSpoiler={showSpoiler}
              setShowSpoiler={setShowSpoiler}
            />
          ) : (
            <ClassicPost
              vote={vote}
              postVotes={postVotes}
              handleVoting={!pending ? handleVoting : ''}
              showContent={showContent}
              setShowContent={setShowContent}
              type={type}
              post={post}
              loading={loading}
              detail={detail}
              handleOption={handleOption === undefined ? handleModOption : handleOption}
              copied={copied}
              setCopied={setCopied}
              location={sharePath}
              avatar={authorAvatarImageUrl}
              isOnline={isOnline}
              subPlebbit={getSub}
              handleCopy={handleCopy}
              pending={pending}
              detailRoute={detailRoute}
              allowedSpecial={isSpecial || allowedSpecial}
              handleEditPost={handleEditPost}
              openRemovalModal={openRemovalModal}
              owner={owner}
              showSpoiler={showSpoiler}
              setShowSpoiler={setShowSpoiler}
            />
          ))}
      </Box>
      {isRemovalModalOpen && (
        <AddRemovalReason
          handleRemove={handleEditPost}
          isOpen={isRemovalModalOpen}
          onClose={closeRemovalModal}
        />
      )}
    </>
  );
};
export default Post;
