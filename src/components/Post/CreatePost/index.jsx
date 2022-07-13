import React, { useState } from 'react';
import {
  Flex,
  Box,
  Icon,
  Textarea,
  useColorMode,
  Checkbox,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';
import { LinkIcon } from '@chakra-ui/icons';
import { EditorState } from 'draft-js';
import { useHistory } from 'react-router-dom';
import { MdStickyNote2 } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../../Button';
import SideBar from './createPostSideBar';
import Editor from '../../Editor';
import DropDown2 from '../../DropDown/DropDown2';
import subPlebbitData from '../../data/subPlebbits';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';

const CreatePost = () => {
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const borderColor = useColorModeValue('borderLight', 'borderDark');
  const bg = useColorModeValue('white', 'darkNavBg');
  const { colorMode } = useColorMode();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toast = useToast();

  const history = useHistory();

  const { publishComment } = useAccountsActions();

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
    setAddress(null);
    setTitle('');
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
      history.push(`/p/${address?.value}`);
      await comment.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handlePublishPost = () => {
    publishComment({
      content,
      title,
      subplebbitAddress: address?.value,
      onChallenge,
      onChallengeVerification,
    });
  };

  return (
    <Flex maxWidth="100%" justifyContent="center" margin="0 auto !important" height="100vh">
      <Box width="740px">
        <Flex flexDirection="column">
          <Flex
            justifyContent="space-between"
            margin="16px 0"
            borderBottom={
              colorMode === 'light' ? '1px solid #edeff1' : '1px solid rgba(255, 255, 255, 0.16)'
            }
          >
            <Box fontSize="18px" fontWeight="500" lineHeight="22px" flex="1">
              Create Post
            </Box>
            <Flex
              alignItems="center"
              fontSize="12px"
              fontWeight="700"
              letterSpacing=".5px"
              lineHeight="24px"
              textTransform="uppercase"
              marginLeft="10px"
            >
              <Box>DRAFTS</Box>
              <Box
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                background="#ccc"
                borderRadius="2px"
                marginLeft="4px"
                padding="1px 3px"
              >
                0
              </Box>
            </Flex>
          </Flex>
          <Flex marginBottom="8px" alignItems="center">
            <Box
              minW="300px"
              borderRadius="4px"
              transition="box-shadow .2s ease"
              boxShadow="0 0 0 0 #a4a4a4"
              backgroundColor={bg}
              zIndex="2"
            >
              <DropDown2
                options={subPlebbitData}
                onChange={(value) => setAddress(value)}
                value={address}
              />
            </Box>
          </Flex>
          <Box bg={bg} marginBottom="15px" borderRadius="5px">
            <Box margin="0 0 12px" overflow="auto">
              <Flex alignItems="stretch">
                <Flex
                  color={color}
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="18px"
                  cursor="pointer"
                  outline="none"
                  zIndex="1"
                  width="25%"
                  position="relative"
                  textAlign="center"
                  borderColor="#a4a4a4"
                  borderStyle="solid"
                  borderWidth="0 1px 1px 0"
                  borderRadius="0"
                  justifyContent="center"
                  alignItems="center"
                  whiteSpace="nowrap"
                  padding="15px 17px"
                  borderBottom="2px solid #a4a4a4"
                >
                  <Icon
                    as={MdStickyNote2}
                    fontSize="20px"
                    fontWeight="400"
                    height="20px"
                    lineHeight="20px"
                    verticalAlign="middle"
                    width="20px"
                    marginRight="8px"
                  />
                  Post
                </Flex>
                <Flex
                  color={color}
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="18px"
                  cursor="pointer"
                  outline="none"
                  zIndex="1"
                  width="25%"
                  position="relative"
                  textAlign="center"
                  borderColor="#a4a4a4"
                  borderStyle="solid"
                  borderWidth="0 1px 1px 0"
                  borderRadius="0"
                  justifyContent="center"
                  alignItems="center"
                  whiteSpace="nowrap"
                  padding="15px 17px"
                >
                  <LinkIcon
                    fontSize="20px"
                    fontWeight="400"
                    height="20px"
                    lineHeight="20px"
                    verticalAlign="middle"
                    width="20px"
                    marginRight="8px"
                  />
                  Link
                </Flex>
              </Flex>
            </Box>
            <Box margin="16px">
              <Box marginBottom="8px">
                <Box position="relative">
                  <Textarea
                    maxLength="300"
                    placeholder="Title"
                    rows="1"
                    overflowX="hidden"
                    overflowWrap="break-word"
                    height="39px"
                    color={color}
                    padding="8px 68px 8px 16px"
                    backgroundColor="transparent"
                    resize="none"
                    width="100%"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="21px"
                    fontFamily="inherit"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Box
                    fontSize="10px"
                    fontWeight="700"
                    letterSpacing=".5px"
                    lineHeight="12px"
                    textTransform="uppercase"
                    bottom="12px"
                    color={color}
                    position="absolute"
                    right="12px"
                    pointerEvents="none"
                  >
                    {`${title.length}/300`}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  borderRadius="4px"
                  border={
                    colorMode === 'light'
                      ? '1px solid #edeff1'
                      : '1px solid rgba(255, 255, 255, 0.16)'
                  }
                  position="relative"
                >
                  <Box
                    borderRadius="4px"
                    minH="300px"
                    overflow="hidden auto"
                    padding="8px 16px"
                    resize="vertical"
                  >
                    <Editor
                      setValue={setContent}
                      editorState={editorState}
                      setEditorState={setEditorState}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Flex
              flexDir="column"
              alignItems="flex-start"
              justifyContent="space-between"
              padding="0 16px 16px"
            >
              <Flex flexFlow="column nowrap" maxW="100%" minW="0">
                <Flex flexWrap="wrap" maxWidth="530px" alignItems="center">
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> OC</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> SPOILER</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> NSFW</span>
                      </>
                    }
                  />
                  <Button
                    overflow="visible"
                    mb="8px"
                    mr="4px"
                    zIndex="1"
                    position="relative"
                    border="1px solid #878a8c"
                    color="#878a8c"
                    fill="#878a8c"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="17px"
                    minHeight="32px"
                    alignItems="center"
                    borderRadius="30px"
                    justifyContent="center"
                    width="auto"
                    disabled={true}
                    display="flex"
                    sx={{
                      padding: '4px 16px',
                    }}
                    content={
                      <>
                        <Icon
                          as={AiOutlinePlus}
                          display="inline-block"
                          height={8}
                          width={8}
                          fontSize="20px"
                          lineHeight="20px"
                          fontWeight="400"
                          verticalAlign="middle"
                          padding="0 8px 0 0"
                        />
                        <span> FLAIR</span>
                      </>
                    }
                  />
                </Flex>
              </Flex>
              <hr width="100%" border="0" borderY="1px solid #edeff1" />
              <Box position="relative" width="100%" marginTop="8px">
                <Flex flexDir="row-reverse" paddingTop="8px" alignItems="center">
                  <Flex
                    sx={{
                      '@media (min-width: 189px)': {
                        marginLeft: '8px',
                      },
                    }}
                  >
                    <Button
                      backgroundColor={colorMode === 'light' ? '#3293db' : '#dfe1e3'}
                      color={colorMode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,27,0.5)'}
                      fill="rgba(255,255,255,0.5)"
                      width="100%"
                      sx={{
                        tabIndex: '0',
                        filter: 'grayscale(1)',
                      }}
                      disabled={!content || !title || !address}
                      content="Post"
                      onClick={handlePublishPost}
                    />
                  </Flex>
                  <Flex>
                    <Button
                      border={borderColor}
                      color={
                        colorMode === 'light' ? 'rgba(0,121,211,0.5)' : 'rgba(215,218,220,0.5)'
                      }
                      width="100%"
                      sx={{
                        tabIndex: '0',
                        filter: 'grayscale(1)',
                      }}
                      content="Save Draft"
                    />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex
              backgroundColor={bg}
              borderRadius="0 0 6px 6px"
              flexFlow="column"
              padding="8px 16px 21px"
              position="relative"
            >
              <Flex marginTop="8px" width="100%">
                <Flex flexFlow="column" marginRight="auto" alignSelf="flex-start">
                  <Flex alignItems="center">
                    <Flex
                      marginBottom="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      color="#1c1c1c"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Checkbox colorScheme="gray" defaultChecked>
                        <Box
                          marginRight="4px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={color}
                        >
                          Send me post reply notifications
                        </Box>
                      </Checkbox>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center">
                    <Flex
                      marginBottom="8px"
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="18px"
                      color="#1c1c1c"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Checkbox colorScheme="gray" defaultChecked>
                        <Box
                          marginRight="4px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={color}
                        >
                          Share this post on Twitter
                        </Box>
                      </Checkbox>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flexFlow="column"></Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <SideBar />
    </Flex>
  );
};

export default CreatePost;
