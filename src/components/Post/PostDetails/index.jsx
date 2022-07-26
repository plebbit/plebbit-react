import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  IconButton,
  Link,
  Image,
  Heading,
  Tag,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useAccountsActions, useComment } from '@plebbit/plebbit-react-hooks';
import Swal from 'sweetalert2';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { CloseIcon } from '@chakra-ui/icons';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import PdMenu from './pdMenu';
import { BsChat, BsBookmark, BsEyeSlash, BsPencil, BsFlag } from 'react-icons/bs';
import { GoGift } from 'react-icons/go';
import { FaShare } from 'react-icons/fa';
import { FiMoreHorizontal, FiShare, FiBell } from 'react-icons/fi';
import { CgNotes, CgClose } from 'react-icons/cg';
import SideBar from './postDetailSideBar';
import { dateToNow } from '../../../utils/formatDate';
import Comment from '../comment';
import Editor from '../../Editor';
import truncateString from '../../../utils/truncateString';
import { ProfileContext } from '../../../store/profileContext';
import { useHistory } from 'react-router-dom';
import getUserName from '../../../utils/getUserName';
import numFormatter from '../../../utils/numberFormater';
import Post from '..';
import DropDown from '../../DropDown';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function PostDetail() {
  const detail = useComment(
    window.location.hash?.substring(window.location.hash.lastIndexOf('/') + 1)
  );
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const detBg = useColorModeValue('#bbbdbf', '#030303');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const vote = detail?.upvoteCount - detail?.downvoteCount;
  const [voteMode, setVoteMode] = useState(0);
  const subPledditTextColor = useColorModeValue('lightText2', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const bg = useColorModeValue('white', 'darkNavBg');
  const bottomButtonHover = useColorModeValue('rgba(26, 26, 27, 0.1)', 'rgba(215, 218, 220, 0.1)');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const borderColor2 = useColorModeValue('#d3d6da', '#545452');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const mainMobileBg = useColorModeValue('white', 'black');
  const mobileColor = useColorModeValue('lightMobileText2', 'darkMobileText');
  const toast = useToast();
  const { publishVote, publishComment, publishCommentEdit, subscribe, unsubscribe } =
    useAccountsActions();
  const [subLoading, setSubLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPost, setEditPost] = useState(detail?.content);
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [postEditorState, setPostEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${editPost}</p>`))
    )
  );
  const { device, postStyle, profile, subscriptions } = useContext(ProfileContext);
  const history = useHistory();
  const [showMEditor, setShowMEditor] = useState(false);

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
    setEdit(false);
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
      commentCid: detail?.cid,
      subplebbitAddress: detail?.subplebbitAddress,
      onChallenge,
      onChallengeVerification,
    });
  };

  const handlePublishPost = async () => {
    await publishComment({
      content,
      postCid: detail?.cid, // the thread the comment is on
      parentCid: detail?.cid, // if top level reply to a post, same as postCid
      subplebbitAddress: detail?.subplebbitAddress,
      onChallenge,
      onChallengeVerification,
    });
  };
  const handleEditPost = async (cid, content, address) => {
    setEditLoading(true);
    await publishCommentEdit({
      commentCid: cid,
      content: content,
      subplebbitAddress: address,
      onChallenge,
      onChallengeVerification,
    });
    setEditLoading(false);
  };

  const handleSubscribe = async () => {
    setSubLoading(true);
    await subscribe(detail?.subplebbitAddress);
    toast({
      title: 'Subscribed.',
      description: 'Joined successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const handleUnSubscribe = async () => {
    setSubLoading(true);
    await unsubscribe(detail?.subplebbitAddress);

    toast({
      title: 'Unsubscribed.',
      description: 'Unsubscribed successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleOption = (option) => {
    if (option?.id === 'Edit') {
      setEdit(true);
    }
  };

  return (
    <Box maxWidth="100%">
      {device !== 'mobile' ? (
        <Box>
          <Box
            top="48px"
            backgroundColor="rgba(28,28,28,.9)"
            bottom="0"
            height="100%"
            left="0"
            position="fixed"
            right="0"
            width="100%"
            zIndex="50"
            _after={{
              background: detBg,
              bottom: '0',
              height: '100%',
              content: `" "`,
              left: '0',
              margin: '0 auto',
              maxWidth: '1280px',
              position: 'fixed',
              right: '0',
              width: 'calc(100% - 160px)',
              top: '0',
            }}
          >
            <Box
              top="48px"
              bottom="0"
              height="100%"
              left="0"
              position="fixed"
              backfaceVisibility="hidden"
              right="0"
              width="100%"
              zIndex="50"
            >
              <Box
                height="100%"
                overflowY="auto"
                position="relative"
                width="100%"
                willChange="transform"
                sx={{
                  contain: 'layout style size',
                }}
              >
                {/* head */}
                <Box
                  background="#030303"
                  height="48px"
                  left="0"
                  margin="0 auto"
                  maxW="1280px"
                  position="sticky"
                  right="0"
                  top="0"
                  transition="top .3s ease"
                  width="calc(100% -160px)"
                  zIndex="70"
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
                      <Flex alignItems="center" margin="0" padding="0 2px">
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
                          color={voteMode === 1 ? 'upvoteOrange' : iconColor}
                          w="24px"
                          h="24px"
                          bg="none"
                          minW="24px"
                          minH="24px"
                          border="none"
                          borderRadius="2px"
                          _hover={{
                            bg: iconBg,
                            color: 'upvoteOrange',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === 1 ? 0 : 1);
                            handleVote(voteMode === 1 ? 0 : 1);
                          }}
                          icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                        />
                        <Text
                          fontSize="12px"
                          fontWeight="700"
                          lineHeight="16px"
                          pointerEvents="none"
                          color="#D7DADC"
                        >
                          {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
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
                            bg: iconBg,
                            color: 'downvoteBlue',
                          }}
                          _focus={{
                            outline: 'none',
                          }}
                          onClick={() => {
                            setVoteMode(voteMode === -1 ? 0 : -1);
                            handleVote(voteMode === -1 ? 0 : -1);
                          }}
                          icon={
                            <Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />
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
                      <Icon as={CgNotes} mr="8px" color="#D7DADC" />

                      <Text
                        color="#D7DADC"
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="18px"
                        minWidth="0"
                        ml="2px"
                        paddingRight="5px"
                        sx={{
                          '@media (max-width: 768px)': {
                            display: 'none',
                          },
                        }}
                        isTruncated
                      >
                        {detail?.title}
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
                      <CloseIcon mr="5px" onClick={() => history.goBack()} cursor="pointer" />
                      <Box onClick={() => history.goBack()} cursor="pointer">
                        Close
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
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
                    {/* Main */}
                    <Flex width="100%" bg={bg} borderRadius="4px">
                      {/* vote column */}
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
                          sx={{
                            '@media (max-width: 960px)': {
                              display: 'none',
                            },
                          }}
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
                              bg: iconBg,
                              color: 'upvoteOrange',
                            }}
                            _focus={{
                              outline: 'none',
                            }}
                            onClick={() => {
                              setVoteMode(voteMode === 1 ? 0 : 1);
                              handleVote(voteMode === 1 ? 0 : 1);
                            }}
                            icon={<Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />}
                          />
                          <Text
                            fontSize="12px"
                            fontWeight="700"
                            lineHeight="16px"
                            pointerEvents="none"
                            color=""
                          >
                            {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
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
                              bg: iconBg,
                              color: 'downvoteBlue',
                            }}
                            _focus={{
                              outline: 'none',
                            }}
                            onClick={() => {
                              setVoteMode(voteMode === -1 ? 0 : -1);
                              handleVote(voteMode === -1 ? 0 : -1);
                            }}
                            icon={
                              <Icon as={voteMode === -1 ? ImArrowDown : BiDownvote} w={4} h={4} />
                            }
                          />
                        </Flex>
                      </Flex>
                      {/* post Details */}
                      <Flex flexDir="column" paddingTop="8px" flex="1">
                        {/* post Head */}
                        <Flex
                          alignItems="start"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                          margin="0 8px 8px"
                          position="relative"
                        >
                          <Image
                            fallbackSrc={require('../../../assets/images/fallback.png')}
                            src="https://place-hold.it/100x100"
                            width="20px"
                            height="20px"
                            marginRight="4px"
                            borderRadius="100%"
                            verticalAlign="middle"
                          />
                          <Flex
                            alignItems="center"
                            flexWrap="wrap"
                            flex="1 1 auto"
                            justifyContent="space-between"
                            position="relative"
                          >
                            <Box display="inline">
                              <Box display="inline-block" flex="0 0 auto">
                                <Link
                                  color={subPledditTextColor}
                                  fontSize="12px"
                                  fontWeight="700"
                                  display="inline"
                                  lineHeight="20px"
                                  textDecoration="none"
                                >
                                  p/{truncateString(detail?.subplebbitAddress, 10, '...')}
                                </Link>
                              </Box>
                              <Text
                                color={separatorColor}
                                as="span"
                                verticalAlign="middle"
                                fontSize="6px"
                                lineHeight="20px"
                                margin="0 4px"
                              >
                                •
                              </Text>
                              <Text as="span" marginRight="3px">
                                Posted By
                              </Text>

                              <Link marginRight="3px">{getUserName(detail?.author)}</Link>

                              <Link>{dateToNow(parseInt(detail?.timestamp * 1000))} ago</Link>
                            </Box>
                            <Icon
                              sx={{
                                '@media (min-width: 1280px)': {},
                                '@media (max-width: 1120px)': {
                                  display: 'none',
                                },
                              }}
                              as={FiBell}
                              height="16px"
                              width="16px"
                            />
                            <PdMenu />
                          </Flex>
                        </Flex>
                        {/* post Title */}
                        <Flex margin="0 8px" display="flex" alignItems="center">
                          <Heading
                            color={titleColor}
                            fontSize="18px"
                            fontWeight="500"
                            lineHeight="22px"
                            paddingRight="5px"
                            wordBreak="break-word"
                          >
                            {detail?.title}{' '}
                            {detail?.flair?.text && (
                              <Tag
                                borderRadius="20px"
                                p="2px 8px"
                                mr="5px"
                                background={detail?.flair?.backgroundColor}
                                color={detail?.flair?.textColor}
                              >
                                {detail?.flair.text}
                              </Tag>
                            )}
                          </Heading>
                        </Flex>
                        {/* post Body */}
                        {edit ? (
                          <Box marginTop="8px" padding="10px">
                            <Editor
                              editorState={postEditorState}
                              setEditorState={setPostEditorState}
                              setValue={setEditPost}
                            />
                            <Flex alignItems="center" mt="8px" justifyContent="flex-end">
                              <Button
                                borderRadius="999px"
                                border="transparent"
                                bg="transparent"
                                onClick={() => setEdit(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                borderRadius="999px"
                                padding="5px 10px"
                                minW="90px"
                                minH="27px"
                                onClick={() =>
                                  handleEditPost(detail?.cid, editPost, detail?.subplebbitAddress)
                                }
                                isLoading={editLoading}
                              >
                                Save
                              </Button>
                            </Flex>
                          </Box>
                        ) : (
                          <Box marginTop="8px">
                            {detail?.content ? (
                              <Box
                                color={subPledditTextColor}
                                padding="5px 8px 10px"
                                fontFamily="Noto sans, Arial, sans-serif"
                                fontSize="14px"
                                fontWeight="400"
                                lineHeight="21px"
                                wordBreak="break-word"
                                overflow="hidden"
                              >
                                {detail?.content}
                              </Box>
                            ) : (
                              <Box display="flex" justifyContent="center">
                                <Image
                                  fallbackSrc="https://via.placeholder.com/150"
                                  src={detail?.link}
                                />
                              </Box>
                            )}
                          </Box>
                        )}
                        {/* Post Bottom Bar */}
                        <Flex
                          sx={{
                            '@media (max-width: 960px)': {
                              display: 'none',
                            },
                          }}
                          flexDirection="row"
                          alignItems="center"
                          paddingRight="10px"
                          overflowY="visible"
                          mb="2px"
                        >
                          <Flex
                            flexDirection="row"
                            alignItems="stretch"
                            flexGrow={1}
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
                              _hover={{
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                            >
                              <Icon as={BsChat} height={5} width={5} mr="5px" />
                              <Box>{detail?.replyCount} Comments</Box>
                            </Link>
                            <Link
                              display="flex"
                              alignItems="center"
                              borderRadius="2px"
                              padding="8px"
                              marginRight="4px"
                              _hover={{
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                            >
                              <Icon as={GoGift} height={5} width={5} mr="5px" />
                              <Box>Award</Box>
                            </Link>
                            <Link
                              display="flex"
                              alignItems="center"
                              borderRadius="2px"
                              padding="8px"
                              marginRight="4px"
                              _hover={{
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                            >
                              <Icon as={FaShare} height={5} width={5} mr="5px" />
                              <Box>share</Box>
                            </Link>

                            <Link
                              display="flex"
                              alignItems="center"
                              borderRadius="2px"
                              padding="8px"
                              marginRight="4px"
                              _hover={{
                                textDecor: 'none',
                                outline: 'none',
                                bg: bottomButtonHover,
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                            >
                              <Icon as={BsBookmark} height={5} width={5} mr="5px" />
                              <Box>save</Box>
                            </Link>

                            {profile?.author?.address !== detail?.author?.address ? (
                              <Link
                                display="flex"
                                alignItems="center"
                                borderRadius="2px"
                                padding="8px"
                                marginRight="4px"
                                _hover={{
                                  textDecor: 'none',
                                  outline: 'none',
                                  bg: bottomButtonHover,
                                }}
                                _focus={{
                                  boxShadow: 'none',
                                }}
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
                                        as={FiMoreHorizontal}
                                        color={iconColor}
                                        h="20px"
                                        w="20px"
                                      />
                                    </Flex>
                                  }
                                  options={[
                                    {
                                      label: 'Edit Post',
                                      icon: BsPencil,
                                      id: 'Edit',
                                    },
                                    {
                                      label: 'Save',
                                      icon: BsBookmark,
                                      id: 'Save',
                                    },
                                    {
                                      label: 'Hide',
                                      icon: BsEyeSlash,
                                      id: 'Hide',
                                    },
                                    {
                                      label: 'Delete',
                                      icon: MdOutlineDeleteOutline,
                                      id: 'Delete',
                                    },
                                  ]}
                                  render={(item) => (
                                    <Flex
                                      alignItems="center"
                                      padding="8px"
                                      fontSize="14px"
                                      lineHeight="18px"
                                      fontWeight="500"
                                      color={iconColor}
                                      borderTop={`1px solid ${border2}`}
                                      textTransform="capitalize"
                                      _hover={{
                                        bg: bottomButtonHover,
                                      }}
                                      onClick={() => handleOption(item)}
                                    >
                                      <Icon as={item?.icon} w="20px" h="20px" mr="6px" />
                                      <Box>{item?.label}</Box>
                                    </Flex>
                                  )}
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
                                  _hover={{
                                    textDecor: 'none',
                                    outline: 'none',
                                    bg: bottomButtonHover,
                                  }}
                                  _focus={{
                                    boxShadow: 'none',
                                  }}
                                >
                                  <Icon as={BsEyeSlash} height={5} width={5} mr="5px" />
                                  <Box>Hide</Box>
                                </Link>
                                <Link
                                  display="flex"
                                  alignItems="center"
                                  borderRadius="2px"
                                  padding="8px"
                                  marginRight="4px"
                                  _hover={{
                                    textDecor: 'none',
                                    outline: 'none',
                                    bg: bottomButtonHover,
                                  }}
                                  _focus={{
                                    boxShadow: 'none',
                                  }}
                                >
                                  <Icon as={BsFlag} height={5} width={5} mr="5px" />
                                  <Box>Report</Box>
                                </Link>
                              </>
                            )}
                          </Flex>
                        </Flex>

                        <Flex
                          flexDirection="row"
                          alignItems="center"
                          overflowY="visible"
                          mb="2px"
                          paddingBottom="12px"
                          paddingTop="8px"
                          sx={{
                            '@media (min-width: 960px)': {
                              display: 'none',
                            },
                          }}
                        >
                          <Flex
                            flexDirection="row"
                            alignItems="stretch"
                            flexGrow={1}
                            padding="0 8px 0 8px"
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="16px"
                            overflow="hidden"
                          >
                            <Flex
                              borderRadius="16px"
                              alignItems="center"
                              maxH=""
                              p=""
                              width="auto"
                              maxWidth="110px"
                              minWidth="32px"
                              mr="10px"
                              flexShrink="0"
                              border={`1px solid ${borderColor}`}
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
                                }}
                                _focus={{
                                  outline: 'none',
                                }}
                                onClick={() => {
                                  setVoteMode(voteMode === 1 ? 0 : 1);
                                  handleVote(voteMode === 1 ? 0 : 1);
                                }}
                                icon={
                                  <Icon as={voteMode === 1 ? ImArrowUp : BiUpvote} w={4} h={4} />
                                }
                              />
                              <Text
                                fontSize="12px"
                                fontWeight="700"
                                lineHeight="16px"
                                pointerEvents="none"
                                color=""
                              >
                                {vote + voteMode === 0 ? 'vote' : numFormatter(vote + voteMode)}
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
                                }}
                                _focus={{
                                  outline: 'none',
                                }}
                                onClick={() => {
                                  setVoteMode(voteMode === -1 ? 0 : -1);
                                  handleVote(voteMode === -1 ? 0 : -1);
                                }}
                                icon={
                                  <Icon
                                    as={voteMode === -1 ? ImArrowDown : BiDownvote}
                                    w={4}
                                    h={4}
                                  />
                                }
                              />
                            </Flex>
                            <Link
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="50%"
                              _hover={{
                                textDecor: 'none',
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                              mr="10px"
                              border={`1px solid ${borderColor}`}
                              minW="32px"
                              height="32px"
                              flexShrink="0"
                            >
                              <Icon as={GoGift} height={5} width={5} />
                            </Link>
                            <Link
                              borderRadius="16px"
                              alignItems="center"
                              maxH=""
                              p="2px 8px"
                              width="auto"
                              maxWidth="100px"
                              minWidth="32px"
                              mr="10px"
                              flexShrink="0"
                              border={`1px solid ${borderColor}`}
                              display="flex"
                            >
                              <Icon as={BsChat} height={5} width={5} mr="5px" />
                              <Box>{detail?.replyCount}</Box>
                            </Link>
                            <Link
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              borderRadius="50%"
                              _hover={{
                                textDecor: 'none',
                              }}
                              _focus={{
                                boxShadow: 'none',
                              }}
                              ml="auto"
                              border={`1px solid ${borderColor}`}
                              minW="32px"
                              height="32px"
                              flexShrink="0"
                              sx={{
                                '@media (min-width: 1280px)': {},
                                '@media (max-width: 1120px)': {
                                  display: 'none',
                                },
                              }}
                            >
                              <Icon as={FiShare} height={5} width={5} />
                            </Link>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Box maxW="100%" bg={bg} mt="10px" padding="10px">
                      <Box padding="24px 40px">
                        <Box fontSize="12px" fontWeight="400" lineHeight="18px" mb="4px">
                          Comment As {getUserName(profile?.author)}
                        </Box>
                        <Box
                          borderRadius="4px"
                          overflow="hidden auto"
                          padding="8px 16px"
                          resize="vertical"
                          minH="200px"
                        >
                          <Editor
                            setValue={setContent}
                            editorState={editorState}
                            setEditorState={setEditorState}
                            showSubmit
                            handleSubmit={handlePublishPost}
                          />
                        </Box>
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
                      </Box>
                      {detail?.replies?.pages?.topAll?.comments.map((comment) => (
                        <Comment comment={comment} key={comment.cid} parentCid={detail?.cid} />
                      ))}
                    </Box>
                  </Box>
                  <SideBar
                    margin="32px 0"
                    borderRadius="4px"
                    padding="0"
                    right="0"
                    top="0"
                    width="312px"
                    sx={{
                      '@media (max-width: 1120px)': {
                        display: 'none',
                      },
                    }}
                    handleSubscribe={handleSubscribe}
                    handleUnSubscribe={handleUnSubscribe}
                    subLoading={subLoading}
                    setSubLoading={setSubLoading}
                    subscriptions={subscriptions}
                    detail={detail}
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box>
            <Box position="relative" bg={mainMobileBg}>
              <Box pointerEvents="none" position="relative">
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
                      bottom="0"
                      left="0"
                      pos="absolute"
                      right="0"
                      top="0"
                      onClick={() => history.push(`p/${detail?.subplebbitAddress}`)}
                    />
                    <Box
                      backgroundColor={mainMobileBg}
                      borderRadius="20px 20px 0 0"
                      position="relative"
                      onClick={() => history.goBack()}
                    >
                      <Icon
                        as={CgClose}
                        color={mobileColor}
                        fill={mobileColor}
                        width={6}
                        height={6}
                        lineHeight="20px"
                        verticalAlign="middle"
                        bg="#efefed"
                        position="absolute"
                        borderRadius="50%"
                        right="16px"
                        top="16px"
                        pointerEvents="all"
                        _before={{
                          verticalAlign: 'inherit',
                        }}
                      />
                      <Flex alignItems="center" flexFlow="column nowrap">
                        <Box
                          height="72px"
                          marginBottom="8px"
                          marginTop="-36px"
                          width="72px"
                          backgroundColor="#24a0ed"
                          borderRadius="50%"
                          position="relative"
                        >
                          <Image
                            backgroundColor="#0079d3"
                            borderRadius="50%"
                            height="100%"
                            objectPosition="0 0"
                            width="100%"
                            src={require('../../../assets/images/plebbit-logo.png')}
                          />
                        </Box>
                        <Box fontWeight="700" lineHeight="18px" margin="0">
                          {`p/${detail?.subplebbitAddress}`}
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Post post={detail} mode={postStyle} key={detail?.cid} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box minH="calc(100vh - 48px)">
            <Box padding="8px 16px 4px">
              <Box
                _before={{
                  content: `" "`,
                  display: 'table',
                }}
                _after={{
                  content: `" "`,
                  display: 'table',
                  clear: 'both',
                }}
              >
                <Box w="100%" lineHeight="1.5" mr="0" maxW="100%" padding="4px 0">
                  <Flex alignItems="center" flexFlow="row nowrap">
                    <Box>{detail?.replyCount} comments</Box>
                  </Flex>
                </Box>
                {!showMEditor && (
                  <Flex alignItems="center" flexFlow="row nowrap" paddingTop="8px" width="100%">
                    <Image
                      h="24px"
                      verticalAlign="middle"
                      src="https://picsum.photos/200?random=1"
                      alt="user-icon"
                      fallbackSrc={require('../../../assets/images/fallback.png')}
                      color="transparent"
                      borderRadius="50%"
                      w="24px"
                      mr="8px"
                    />
                    <Button
                      border={`1px solid ${borderColor2}`}
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
                      onClick={() => setShowMEditor(true)}
                    >
                      Leave a comment
                    </Button>
                  </Flex>
                )}
                {showMEditor && (
                  <Box margin="0 12px">
                    <Flex backgroundColor="inherit" color="inherit" margin="0" borderWidth="0">
                      <Box width="100%">
                        <Editor
                          setValue={setContent}
                          editorState={editorState}
                          setEditorState={setEditorState}
                          showSubmit
                          handleSubmit={handlePublishPost}
                          submitBtnText="Add Comment"
                          otherBtn={
                            <Button mr="auto" onClick={() => setShowMEditor(false)}>
                              X
                            </Button>
                          }
                        />
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Box>
            <Box padding="16px" maxW="100%">
              {detail?.replies?.pages?.topAll?.comments.map((comment) => (
                <Comment comment={comment} key={comment.cid} parentCid={detail?.cid} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PostDetail;
