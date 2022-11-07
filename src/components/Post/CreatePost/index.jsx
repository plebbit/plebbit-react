import React, { useContext, useState } from 'react';
import {
  Flex,
  Box,
  Icon,
  Textarea,
  useColorMode,
  useColorModeValue,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useAccountsActions } from '@plebbit/plebbit-react-hooks';
import { LinkIcon } from '@chakra-ui/icons';
import { EditorState } from 'draft-js';
import { useHistory, useLocation } from 'react-router-dom';
import { MdStickyNote2 } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../../Button';
import SideBar from './createPostSideBar';
import Editor from '../../Editor';
import DropDown2 from '../../DropDown/DropDown2';
import getChallengeAnswersFromUser from '../../../utils/getChallengeAnswersFromUser';
import truncateString from '../../../utils/truncateString';
import { ProfileContext } from '../../../store/profileContext';
import logger from '../../../utils/logger';
import Layout from '../../layout';
import getIsOnline from '../../../utils/getIsOnline';
import Avatar from '../../Avatar';
import { getSubName } from '../../../utils/getUserName';
import onError from '../../../utils/onError';
import convertArrToObj from '../../../utils/convertArrToObj';
import Sort from '../../../utils/sort';
import AddFlair from './modal/addFlair';
import { BsChevronDown } from 'react-icons/bs';

const CreatePost = () => {
  const { accountSubplebbits, subPlebbitData, subscriptions, subPlebbitDefData } =
    useContext(ProfileContext);
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const borderColor = useColorModeValue('borderLight', 'borderDark');
  const bg = useColorModeValue('white', 'darkNavBg');
  const { colorMode } = useColorMode();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mode, setMode] = useState('post');
  const [spoiler, setSpoiler] = useState(false);
  const toast = useToast();
  const mySubplebbits = Object.keys(accountSubplebbits)?.length
    ? Object.keys(accountSubplebbits)?.map((pages) => ({
        label: truncateString(accountSubplebbits[pages]?.title),
        value: pages,
        ...accountSubplebbits[pages],
      }))
    : [];
  const subs = subscriptions?.length
    ? subscriptions?.map((x) => ({ ...x, value: x?.address, label: x?.title }))
    : '';

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { publishComment } = useAccountsActions();
  const location = useLocation();
  const options = Sort(
    convertArrToObj(
      [
        ...mySubplebbits,
        ...subs,
        [
          subPlebbitData.map((x) => ({
            ...x,
            label: getSubName(x),
            value: x?.address,
          })),
          subPlebbitDefData
            ?.filter((x) => x !== undefined)
            .map((x) => ({
              ...x,
              label: getSubName(x),
              value: x?.address,
            })),
        ].flat(),
      ]
        ?.filter((x) => x !== undefined)
        .flat(),
      'value',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  let potentialSubPlebbitAddress = null;
  if (location?.pathname) {
    const matches = location?.pathname.match(/p\/(.*)\/submit/);
    if (matches?.length > 1) {
      potentialSubPlebbitAddress = matches[1];
    }
  }
  const [address, setAddress] = useState(
    options.find((x) => x.address === potentialSubPlebbitAddress)
  );

  const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('challengeAnswer-error', error, 'error');

      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
      setLoading(false);
    }
    logger('challengeAndcomment', { challengeAnswers, comment }, 'trace');
    if (challengeAnswers) {
      history.push(`/p/${address?.value}`);
      const res = await comment.publishChallengeAnswers(challengeAnswers);
      logger('publish_challenge_answer', res, 'trace');
    }
  };

  const onChallengeVerification = (challengeVerification) => {
    if (challengeVerification.challengeSuccess === true) {
      toast({
        title: 'Accepted.',
        description: 'Action accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      setAddress(null);
      setTitle('');
      setContent('');
      setEditorState(EditorState.createEmpty());
      logger('challenge success', { publishedCid: challengeVerification.publication.cid }, 'trace');
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challenge failed',
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
      setLoading(false);
    }
  };

  const handlePublishPost = async () => {
    try {
      setLoading(true);
      const res = await publishComment({
        content: content ? content : undefined,
        title,
        link: link ? link : undefined,
        spoiler: spoiler ? spoiler : undefined,
        subplebbitAddress: address?.value,
        onChallenge,
        onChallengeVerification,
        onError: onError,
      });
      logger('create-post', res, 'error');
    } catch (error) {
      logger('create-post', error, 'error');
      setLoading(false);
      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  console.log(mode);
  return (
    <Layout name={{ label: 'Create Post', value: location?.pathname }}>
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
                  options={options}
                  onChange={(value) => setAddress(value)}
                  value={address}
                  render={(data) => (
                    <Flex
                      alignItems="center"
                      _hover={{
                        bg: '#DEEBFF',
                      }}
                      padding="8px 12px"
                      textTransform="capitalize"
                      fontWeight="400"
                      fontSize="14px"
                    >
                      <Avatar
                        width={20}
                        height={20}
                        mr="8px"
                        avatar={data?.avatar}
                        badge
                        isOnline={getIsOnline(data?.updatedAt)}
                      />

                      <Box>{data?.label ? data?.label : truncateString(data?.address, 20)}</Box>
                    </Flex>
                  )}
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
                    borderBottom={mode === 'post' && '3px solid #a4a4a4'}
                    onClick={() => {
                      setMode('post');
                      setLink('');
                    }}
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
                    borderBottom={mode === 'link' && '3px solid #a4a4a4'}
                    borderRadius="0"
                    justifyContent="center"
                    alignItems="center"
                    whiteSpace="nowrap"
                    padding="15px 17px"
                    onClick={() => {
                      setMode('link');
                      setContent('');
                    }}
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
                  <Box borderRadius="4px" position="relative">
                    <Box
                      borderRadius="4px"
                      minH={mode === 'post' && '300px'}
                      overflow="hidden auto"
                      resize="vertical"
                    >
                      {mode === 'post' ? (
                        <Editor
                          setValue={setContent}
                          editorState={editorState}
                          setEditorState={setEditorState}
                          placeholder="Text (Optional)"
                        />
                      ) : (
                        <Textarea
                          placeholder="Url"
                          onChange={(e) => setLink(e.target.value)}
                          value={link}
                          color={color}
                        />
                      )}
                      {/* <Editor
                          setValue={setLink}
                          editorState={editorState}
                          setEditorState={setEditorState}
                          placeholder="Url"
                        /> */}
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
                      backgroundColor={spoiler && '#3293db'}
                      border="1px solid #878a8c"
                      color={spoiler ? '#fff' : '#878a8c'}
                      fill="#878a8c"
                      position="relative"
                      fontSize="14px"
                      fontWeight="700"
                      lineHeight="17px"
                      minHeight="32px"
                      alignItems="center"
                      borderRadius="30px"
                      justifyContent="center"
                      width="auto"
                      onClick={() => setSpoiler(!spoiler)}
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
                      display="flex"
                      sx={{
                        padding: '4px 16px',
                      }}
                      onClick={onOpen}
                      disabled
                      content={
                        <>
                          <Box padding="0 8px 0 0"> FLAIR</Box>
                          <Icon
                            as={BsChevronDown}
                            display="inline-block"
                            height={5}
                            width={5}
                            fontSize="20px"
                            lineHeight="20px"
                            fontWeight="400"
                            verticalAlign="middle"
                          />
                        </>
                      }
                    />
                  </Flex>
                </Flex>
                <hr width="100%" border="0" borderTop="1px solid #edeff1" />
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
                        color={
                          colorMode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,27,0.5)'
                        }
                        fill="rgba(255,255,255,0.5)"
                        width="100%"
                        sx={{
                          tabIndex: '0',
                          filter: 'grayscale(1)',
                        }}
                        disabled={!content || !title || !address || loading}
                        content="Post"
                        onClick={handlePublishPost}
                        loading={loading}
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
            </Box>
          </Flex>
        </Box>

        <SideBar />
      </Flex>
      {isOpen && <AddFlair isOpen={isOpen} onClose={onClose} />}
    </Layout>
  );
};

export default CreatePost;
