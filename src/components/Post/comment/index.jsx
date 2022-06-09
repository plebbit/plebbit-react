import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  useColorModeValue,
  IconButton,
  Icon,
  useToast,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { EditorState } from 'draft-js';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { BsChat } from 'react-icons/bs';
import Editor from '../../Editor';
import { dateToNow } from '../../../utils/formatDate';
import numFormatter from '../../../utils/numberFormater';

const Comment = ({ comment, parentCid }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const [vote] = useState(+comment?.upvoteCount - +comment?.downvoteCount);
  const [voteMode, setVoteMode] = useState(0);
  const [reply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const toast = useToast();
  const { publishVote, publishComment } = useAccountsActions();
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
    setContent('');
    setEditorState(EditorState.createEmpty());

    console.log('challenge verified', challengeVerification, comment);
  };
  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      console.log(error);
      toast({
        title: 'Declined.',
        description: 'Action Declined',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    console.log(challengeAnswers, comment);
    if (challengeAnswers) {
      await comment.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleVote = (vote) => {
    publishVote({
      vote,
      commentCid: comment?.cid,
      subplebbitAddress: comment?.subplebbitAddress,
      onChallenge,
      onChallengeVerification,
    });
  };

  const handlePublishPost = () => {
    publishComment({
      content,
      parentCid: parentCid, // if top level reply to a post, same as postCid
      subplebbitAddress: comment?.subplebbitAddress,
      onChallenge,
      onChallengeVerification,
    });
  };

  const nestedComments = (comment?.replies?.pages?.topAll?.comments || []).map((comment) => {
    return <Comment key={comment?.cid} comment={comment} type="child" parentCid={comment?.cid} />;
  });
  return (
    <Flex marginTop="15px">
      <Flex marginRight="8px" flexDir="column" alignItems="center">
        <Image
          src="https://styles.redditmedia.com/t5_1yz875/styles/profileIcon_klqlly9fc4l41.png?width=256&height=256&crop=256:256,smart&s=94486fc13b9ca9e154e9e8926e3d8c43ccc80be3"
          rounded
          height="28px"
          maxW="28px"
          mb="10px"
        />
        <Box borderRight="2px solid #edeff1" width="0" height="100%" />
      </Flex>

      <Flex flexDir="column" flexGrow={1}>
        <Flex flexDir="column" mb="6px">
          <Flex alignItems="center" fontWeight="400" fontSize="12px">
            <Box maxW="50%" mr="5px">
              <Text isTruncated>{comment?.author?.displayName} </Text>{' '}
            </Box>
            <Flex alignItems="center">
              <Image
                mr="5px"
                rounded
                height="16px"
                width="16px"
                src="https://www.redditstatic.com/desktop2x/img/communityPoints/tokens/cryptocurrency/moon_yellow.svg"
              />
              <Box>{numFormatter(Math.floor(Math.random() * (1000 - 0 + 1)) + 0)}</Box>
            </Flex>
            <Text
              as="span"
              verticalAlign="middle"
              fontWeight="800"
              fontSize="10px"
              lineHeight="20px"
              margin="0 4px"
            >
              •
            </Text>
            <Box>{dateToNow(comment?.timestamp)} ago</Box>
          </Flex>
          {comment?.flair?.text && (
            <Box
              backgroundColor={comment?.flair?.color}
              color="#fff"
              width="fit-content"
              padding="0 4px"
              fontWeight="400"
              fontSize="12px"
              mt="2px"
              borderRadius="2px"
            >
              {comment?.flair?.text}
            </Box>
          )}
        </Flex>
        <Box
          padding="2px 0"
          fontSize="14px"
          fontWeight="400"
          lineHeight="21px"
          wordBreak="break-word"
          mb="6px"
        >
          {comment?.content}
        </Box>
        <Flex>
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
                bg: bottomButtonHover,
              }}
              _focus={{
                outline: 'none',
              }}
              onClick={() => {
                setVoteMode(voteMode === 1 ? 0 : 1);
                handleVote(voteMode === 1 ? 0 : 1);
              }}
              icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w="20px" h="20px" />}
            />
            <Text fontSize="14px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              {numFormatter(vote + voteMode) === 0 ? 'vote' : numFormatter(vote + voteMode)}
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
                bg: bottomButtonHover,
              }}
              _focus={{
                outline: 'none',
              }}
              onClick={() => {
                setVoteMode(voteMode === -1 ? 0 : -1);
                handleVote(voteMode === -1 ? 0 : -1);
              }}
              icon={<Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w="20px" h="20px" />}
            />
          </Flex>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="2px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            onClick={() => setShowReply(!reply)}
          >
            <Icon as={BsChat} height="20px" width="20px" mr="5px" />
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Reply
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="4px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Give Award
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="4px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Share
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="4px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Report
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="4px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Save
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            borderRadius="2px"
            padding="4px"
            marginRight="4px"
            _hover={{
              textDecor: 'none',
              outline: 'none',
              bg: bottomButtonHover,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            sx={{
              '@media (min-width: 1280px)': {},
              '@media (max-width: 1120px)': {
                display: 'none',
              },
            }}
          >
            <Text fontSize="12px" fontWeight="700" lineHeight="16px" pointerEvents="none" color="">
              Follow
            </Text>
          </Link>
        </Flex>
        {reply ? (
          <Box
            minH="150px"
            borderRadius="4px"
            overflow="hidden auto"
            padding="8px 16px"
            resize="vertical"
          >
            <Editor
              setValue={setContent}
              editorState={editorState}
              setEditorState={setEditorState}
              showSubmit
              handleSubmit={handlePublishPost}
            />
          </Box>
        ) : (
          ''
        )}
        {showReplies ? (
          nestedComments
        ) : comment?.replies?.pages?.topAll?.comments.length !== 0 ? (
          <Box
            onClick={() => setShowReplies(true)}
            fontSize="12px"
            fontWeight="700"
            lineHeight="16px"
            color="#a4a4a4"
            ml="4px"
            pl="4px"
            cursor="pointer"
          >
            {comment?.replyCount} more repl{comment?.replyCount > 1 ? 'ies' : 'y'}
          </Box>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
};

export default Comment;
