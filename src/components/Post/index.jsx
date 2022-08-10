import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useToast } from '@chakra-ui/react';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';
import CardPost from './CardPost';
import ClassicPost from './ClassicPost';
import CompactPost from './CompactPost';
import logger from '../../utils/logger';

const Post = ({ type, post, mode, loading, detail, handleOption }) => {
  const vote = post?.upvoteCount - post?.downvoteCount;
  const [voteMode, setVoteMode] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const toast = useToast();
  const { publishVote } = useAccountsActions();

  const getChallengeAnswersFromUser = async (challenges) => {
    const { value } = await Swal.fire({
      background: '#eff4f7',
      input: 'text',
      text: 'Complete the challenge',
      imageUrl: `data:image/png;base64,  ${challenges?.challenges[0].challenge}`,
      imageWidth: '80%',
    });
    if (value) {
      return value;
    }
  };

  const onChallengeVerification = (challengeVerification, comment) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    toast({
      title: 'Accepted.',
      description: 'Action accepted',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    logger('challenge verified', challengeVerification, comment);
  };
  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('post:challeng', error);
      toast({
        title: 'Challenge Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await comment.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleVote = (vote) => {
    try {
      publishVote({
        vote,
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
      });
    } catch (error) {
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
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
          />
        )}
        {/* classic */}
        {mode === 'classic' && (
          <ClassicPost
            vote={vote}
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
          />
        )}
        {/* compact */}
        {mode === 'compact' && (
          <CompactPost
            vote={vote}
            voteMode={voteMode}
            setVoteMode={setVoteMode}
            showContent={showContent}
            setShowContent={setShowContent}
            type={type}
            post={post}
            loading={loading}
            handleVote={handleVote}
            detail={detail}
            handleOption={handleOption}
          />
        )}
      </Box>
    </Box>
  );
};
export default Post;
