import React, { useContext, useState } from 'react';
import { Box } from '@chakra-ui/react';
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

const Post = ({ type, post, mode, loading, detail, handleOption }) => {
  const postVote = useAccountVote(post?.cid);
  const vote = postVote?.vote || 0;
  const [postVotes, setPostVotes] = useState(post?.upvoteCount - post?.downvoteCount);
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const { publishVote } = useAccountsActions();
  const authorAvatarImageUrl = useAuthorAvatarImageUrl(post?.author);
  const { mode: location } = useContext(ProfileContext);
  const getSub = useSubplebbit(post?.subplebbitAddress);

  const isOnline = getIsOnline(getSub?.updatedAt);
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

    toast({
      title: 'Accepted.',
      description: 'Action accepted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

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
        description: error?.message,
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
          description: error?.message,
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
      toast({
        title: 'Voting Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box>
        {/* card */}
        {mode === 'card' && (
          <CardPost
            vote={vote}
            postVotes={postVotes}
            handleVoting={handleVoting}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
            copied={copied}
            setCopied={setCopied}
            location={`${
              location === 'http:' ? 'demo.plebbit.eth.limo/#/' : window.location.href
            }p/${post?.subplebbitAddress}/c/${post?.cid}`}
            avatar={authorAvatarImageUrl}
            isOnline={isOnline}
            subPlebbit={getSub}
          />
        )}
        {/* classic */}
        {mode === 'classic' && (
          <ClassicPost
            vote={vote}
            postVotes={postVotes}
            handleVoting={handleVoting}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
            copied={copied}
            setCopied={setCopied}
            location={`${
              location === 'http:' ? 'demo.plebbit.eth.limo/#/' : window.location.href
            }p/${post?.subplebbitAddress}/c/${post?.cid}`}
            avatar={authorAvatarImageUrl}
            isOnline={isOnline}
            subPlebbit={getSub}
          />
        )}
        {/* compact */}
        {mode === 'compact' && (
          <CompactPost
            vote={vote}
            postVotes={postVotes}
            handleVoting={handleVoting}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
            copied={copied}
            setCopied={setCopied}
            location={`${
              location === 'http:' ? 'demo.plebbit.eth.limo/#/' : window.location.href
            }p/${post?.subplebbitAddress}/c/${post?.cid}`}
            avatar={authorAvatarImageUrl}
            isOnline={isOnline}
            subPlebbit={getSub}
          />
        )}
      </Box>
    </Box>
  );
};
export default Post;
