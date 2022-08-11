import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Textarea,
  UnorderedList,
  useColorModeValue,
  useToast,
  Link as Lk,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaEye, FaLock, FaUser } from 'react-icons/fa';
import CreatableMulti from '../../components/DropDown/creatableMulti';
import {
  useAccountsActions,
  useResolvedSubplebbitAddress,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import getChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import { ProfileContext } from '../../store/profileContext';
import { HamburgerIcon } from '@chakra-ui/icons';
import logger from '../../utils/logger';

const CommunitySettings = ({ match }) => {
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const location = useLocation();
  const subplebbit = useSubplebbit(match?.params?.subplebbitAddress);
  const page = new URLSearchParams(location.search).get('page') || 'community';
  const [data, setData] = useState({ ...subplebbit });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { publishSubplebbitEdit } = useAccountsActions();
  const resolvedAuthorAddress = useResolvedSubplebbitAddress(data ? data?.address : '');
  const { device, accountSubplebbits } = useContext(ProfileContext);
  const [showSidebar, setShowSideBar] = useState(false);

  const onChallengeVerification = (challengeVerification, subplebbitEdit) => {
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
    setLoading(false);
    logger('challenge verified', challengeVerification, subplebbitEdit);
  };

  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger(error);
      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit(subplebbit?.address, {
        title: data?.title,
        description: data?.description,
        address: data?.address,
        onChallenge,
        onChallengeVerification,
      });
      setLoading(false);
    } catch (error) {
      console.log('editComm', error);
      toast({
        title: 'Declined.',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const role = accountSubplebbits[subplebbit?.address]?.role?.role;

  useEffect(() => {
    setData({ ...subplebbit });
  }, [subplebbit]);

  console.log(resolvedAuthorAddress, data);

  return (
    <>
      {device !== 'mobile' ? (
        <Flex bg={layoutBg} flexDir="column" color={mainColor} minH="100vh" overflowX="auto">
          <Flex
            fontSize="12px"
            fontWeight="700"
            letterSpacing="0.5px"
            textTransform="uppercase"
            lineHeight="24px"
            alignItems="center"
            bg={mainBg}
            height="40px"
            paddingLeft="24px"
            position="fixed"
            width="100%"
            zIndex="30"
          >
            <Image
              fallbackSrc={require('../../assets/images/fallback.png')}
              src=""
              width="20px"
              height="20px"
              mr="8px"
              borderRadius="999px"
            />
            <Link to={`/p/${data?.address}`}>
              <Flex alignItems="center" color={linkColor} mr="4px">
                {subplebbit?.title || subplebbit?.address} {'  '}
                <Box color={mainColor} textTransform="uppercase">
                  / community settings
                </Box>
              </Flex>
            </Link>
          </Flex>
          <Flex margin="40px 0">
            {/* sideBar */}
            <Box
              bg={inputBg}
              bottom="0"
              boxSizing="border-box"
              color={mainColor}
              overflow="auto"
              paddingTop="16px"
              paddingBottom="32px"
              position="fixed"
              top="88px"
              width="280px"
              zIndex="30"
            >
              <Box
                mb="10px"
                _after={{
                  borderBottom: `1px solid ${border1}`,
                  content: `" "`,
                  margin: '0 24px',
                }}
              >
                <Link to="modqueue">
                  <Flex
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="20px"
                    alignItems="center"
                    padding="0 24px 10px"
                    color={mainColor}
                  >
                    <Icon as={FaChevronLeft} mr="4px" />
                    <Box>Back to mod tools</Box>
                  </Flex>
                </Link>
              </Box>
              <Link to="edit?page=community">
                <Flex
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="18px"
                  alignItems="center"
                  padding="8px 24px"
                  borderLeft={page === 'community' && `4px solid #1a1a1b `}
                  bg={page === 'community' && border1}
                >
                  Community
                </Flex>
              </Link>
              <Link to="edit?page=safety">
                <Flex
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="18px"
                  alignItems="center"
                  padding="8px 24px"
                  borderLeft={page === 'safety' && `4px solid #1a1a1b `}
                  bg={page === 'safety' && border1}
                >
                  Safety and Privacy
                </Flex>
              </Link>
              <Link to="edit?page=posts">
                <Flex
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="18px"
                  alignItems="center"
                  padding="8px 24px"
                  borderLeft={page === 'posts' && `4px solid #1a1a1b `}
                  bg={page === 'posts' && border1}
                >
                  Posts and Comments
                </Flex>
              </Link>
              <Link to="edit?page=wikis">
                <Flex
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="18px"
                  alignItems="center"
                  padding="8px 24px"
                  borderLeft={page === 'wikis' && `4px solid #1a1a1b `}
                  bg={page === 'wikis' && border1}
                >
                  Wikis
                </Flex>
              </Link>
              <Link to="edit?page=notifications">
                <Flex
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="18px"
                  alignItems="center"
                  padding="8px 24px"
                  borderLeft={page === 'notifications' && `4px solid #1a1a1b `}
                  bg={page === 'notifications' && border1}
                >
                  Notifications
                </Flex>
              </Link>
            </Box>
            {/*Body */}
            <Box paddingLeft="280px" boxSizing="border-box" width="100%">
              <Flex
                alignItems="center"
                background={border1}
                height="48px"
                justifyContent="flex-end"
                left="280px"
                padding="0 24px"
                position="fixed"
                right="0"
                zIndex="3"
              >
                <Button
                  colorScheme="blackAlpha"
                  position="relative"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="17px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  width="auto"
                  borderRadius="999px"
                  padding="4px 16px"
                  height="32px"
                  onClick={handleSaveChanges}
                  isLoading={loading}
                  disabled={role !== ('owner' || 'admin' || 'moderator')}
                >
                  Save changes
                </Button>
              </Flex>
              <Box
                ml="24px"
                mr="24px"
                paddingTop="64px"
                borderRadius="0 0 4px 4px"
                overflow="hidden"
              >
                {page === 'community' && (
                  <Box bg={mainBg} borderRadius="4px" maxW="856px" padding="16px 24px">
                    <Box
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="22px"
                      color={mainColor}
                      mb="16px"
                    >
                      Community settings
                    </Box>
                    <Box
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      letterSpacing=".5px"
                      color={metaColor}
                      borderBottom={`1px solid ${border1}`}
                      mb="32px"
                      paddingBottom="6px"
                    >
                      COMMUNITY PROFILE
                    </Box>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Community name
                      </Box>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Input
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          value={data?.title}
                          bg={mainBg}
                          border={`1px solid ${border1}`}
                          borderColor={border1}
                          height="48px"
                          mb="8px"
                          borderRadius="4px"
                          padding="12px 24px 4px 12px"
                          disabled={loading}
                          onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                        <Box
                          color={metaColor}
                          pt="4px"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                        >
                          94 Characters remaining
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Community address
                      </Box>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <InputGroup>
                          <Input
                            fontSize="14px"
                            fontWeight="400"
                            lineHeight="21px"
                            value={data?.address}
                            bg={mainBg}
                            border={`1px solid ${border1}`}
                            borderColor={border1}
                            height="48px"
                            mb="8px"
                            borderRadius="4px"
                            padding="12px 24px 4px 12px"
                            disabled={loading || role !== ('owner' || 'admin' || 'moderator')}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                          />
                        </InputGroup>
                        {resolvedAuthorAddress !== data?.signer?.address ? (
                          <Box
                            color={metaColor}
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            94
                            {data?.address}
                            has not been acquired by you yet !!!
                          </Box>
                        ) : (
                          <Box
                            color={metaColor}
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            94 Characters remaining
                          </Box>
                        )}
                        <UnorderedList mt={3}>
                          <ListItem fontSize={12}>
                            Go to{' '}
                            <Lk
                              color={linkColor}
                              href={`https://app.ens.domains/name/${data?.address}`}
                              isExternal
                            >
                              {' '}
                              https://app.ens.domains/name/{data?.address}
                            </Lk>
                          </ListItem>
                          <ListItem fontSize={12}>Click ADD/EDIT RECORD</ListItem>
                          <ListItem fontSize={12}>
                            Select "text", write in "key": "subplebbit-address", write in next
                            field: {data?.signer?.address}
                          </ListItem>
                        </UnorderedList>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px">
                        <Box
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={mainColor}
                          mb="4px"
                        >
                          Community topics
                        </Box>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          This will help plebbit recommend your community to relevant users and
                          other discovery experiences.
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Select disabled variant="flushed" border="none" value="">
                          <option value="">Select Topic</option>
                          <option value="activism">Activism</option>
                          <option value="addictionSupport">Addiction Support</option>
                          <option value="animals">Animals And Pet</option>
                          <option value="anime">Anime</option>
                          <option value="art">Art</option>
                          <option value="beauty">Beauty and Makeup</option>
                          <option value="crypto">Crypto</option>
                          <option value="food">Food</option>
                          <option value="none">None Of These Topics</option>
                        </Select>
                        <Box w="100%">
                          <CreatableMulti placeholder="select subtopic" disabled />
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px">
                        <Box
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={mainColor}
                          mb="4px"
                        >
                          Community description
                        </Box>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          This is how new members come to understand your community.
                        </Box>
                      </Flex>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Textarea
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          value={data?.description}
                          bg={mainBg}
                          border={`1px solid ${border1}`}
                          borderColor={border1}
                          height="48px"
                          mb="0"
                          borderRadius="4px"
                          padding="8px"
                          resize="both"
                          disabled={loading || role !== ('owner' || 'moderator')}
                          onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                        <Box
                          color={metaColor}
                          pt="4px"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                        >
                          500 Characters remaining
                        </Box>
                      </Flex>
                    </Flex>
                    <Box
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      letterSpacing=".5px"
                      color={metaColor}
                      borderBottom={`1px solid ${border1}`}
                      mb="32px"
                      paddingBottom="6px"
                    >
                      COMMUNITY TYPE
                    </Box>
                    <Flex flexDirection="column" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Type of Community
                      </Box>
                      <Flex flexDirection="column" mt="12px" alignItems="flex-start">
                        <RadioGroup value="public">
                          <Stack direction="column">
                            <Radio value="public" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaUser}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>

                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Public
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Anyone can view, post, and comment to this community
                                </Box>
                              </Flex>
                            </Radio>
                            <Radio value="private" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaLock}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>
                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Private
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Only approved users can view and submit to this community
                                </Box>
                              </Flex>
                            </Radio>
                            <Radio value="restricted" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaEye}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>
                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Restricted
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Anyone can view this community, but only approved users can post
                                </Box>
                              </Flex>
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Flex>
                    </Flex>
                    <Flex flexFlow="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px" maxW="80%">
                        <Flex alignItems="center">
                          <Box
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="20px"
                            mb="4px"
                            color={mainColor}
                          >
                            18+ year old community
                          </Box>
                          <Box
                            bg="#ff585b"
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="16px"
                            margin="0 4px 0 8px"
                            padding="0 4px"
                            color="#fff"
                          >
                            NSFW
                          </Box>
                        </Flex>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          When your community is marked as an 18+ community, users must be flagged
                          as 18+ in their user settings
                        </Box>
                      </Flex>
                      <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                        <Switch colorScheme="gray" isDisabled />
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Flex bg={layoutBg} flexDir="column" color={mainColor} minH="100vh" overflowX="auto">
          <Flex
            fontSize="12px"
            fontWeight="700"
            letterSpacing="0.5px"
            textTransform="uppercase"
            lineHeight="24px"
            alignItems="center"
            bg={mainBg}
            height="48px"
            padding="5px"
            position="fixed"
            width="100%"
            zIndex="25"
          >
            <IconButton
              onClick={() => setShowSideBar(!showSidebar)}
              variant="outline"
              icon={<HamburgerIcon />}
              mr="10px"
            />
            <Image
              fallbackSrc={require('../../assets/images/fallback.png')}
              src=""
              width="20px"
              height="20px"
              mr="8px"
              borderRadius="999px"
            />
            <Link to={`/p/${data?.address}`}>
              <Flex alignItems="center" color={linkColor} mr="4px">
                {subplebbit?.title || subplebbit?.address} {'  '}
                <Box color={mainColor} textTransform="uppercase">
                  / community settings
                </Box>
              </Flex>
            </Link>
          </Flex>
          <Flex margin="40px 0">
            {/* sideBar */}
            {showSidebar && (
              <Box
                bg={inputBg}
                bottom="0"
                boxSizing="border-box"
                color={mainColor}
                overflow="auto"
                paddingTop="16px"
                paddingBottom="32px"
                position="fixed"
                top="88px"
                width="280px"
                zIndex="28"
              >
                <Box
                  mb="10px"
                  _after={{
                    borderBottom: `1px solid ${border1}`,
                    content: `" "`,
                    margin: '0 24px',
                  }}
                >
                  <Link to="modqueue">
                    <Flex
                      fontSize="16px"
                      fontWeight="500"
                      lineHeight="20px"
                      alignItems="center"
                      padding="0 24px 10px"
                      color={mainColor}
                    >
                      <Icon as={FaChevronLeft} mr="4px" />
                      <Box>Back to mod tools</Box>
                    </Flex>
                  </Link>
                </Box>
                <Link to="edit?page=community">
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === 'community' && `4px solid #1a1a1b `}
                    bg={page === 'community' && border1}
                  >
                    Community
                  </Flex>
                </Link>
                <Link to="edit?page=safety">
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === 'safety' && `4px solid #1a1a1b `}
                    bg={page === 'safety' && border1}
                  >
                    Safety and Privacy
                  </Flex>
                </Link>
                <Link to="edit?page=posts">
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === 'posts' && `4px solid #1a1a1b `}
                    bg={page === 'posts' && border1}
                  >
                    Posts and Comments
                  </Flex>
                </Link>
                <Link to="edit?page=wikis">
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === 'wikis' && `4px solid #1a1a1b `}
                    bg={page === 'wikis' && border1}
                  >
                    Wikis
                  </Flex>
                </Link>
                <Link to="edit?page=notifications">
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === 'notifications' && `4px solid #1a1a1b `}
                    bg={page === 'notifications' && border1}
                  >
                    Notifications
                  </Flex>
                </Link>
              </Box>
            )}
            {/*Body */}
            <Box boxSizing="border-box" width="100%">
              <Flex
                alignItems="center"
                background={border1}
                height="48px"
                justifyContent="flex-end"
                padding="0 24px"
                position="fixed"
                right="0"
                left="0"
                zIndex="3"
              >
                <Button
                  colorScheme="blackAlpha"
                  position="relative"
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="17px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  width="auto"
                  borderRadius="999px"
                  padding="4px 16px"
                  height="24px"
                  onClick={handleSaveChanges}
                  isLoading={loading}
                  disabled={loading || role !== ('owner' || 'moderator')}
                  mt="6px"
                >
                  Save changes
                </Button>
              </Flex>
              <Box
                ml="24px"
                mr="24px"
                paddingTop="64px"
                borderRadius="0 0 4px 4px"
                overflow="hidden"
              >
                {page === 'community' && (
                  <Box bg={mainBg} borderRadius="4px" maxW="856px" padding="16px 24px">
                    <Box
                      fontSize="18px"
                      fontWeight="500"
                      lineHeight="22px"
                      color={mainColor}
                      mb="16px"
                    >
                      Community settings
                    </Box>
                    <Box
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      letterSpacing=".5px"
                      color={metaColor}
                      borderBottom={`1px solid ${border1}`}
                      mb="32px"
                      paddingBottom="6px"
                    >
                      COMMUNITY PROFILE
                    </Box>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Community name
                      </Box>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Input
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          value={data?.title}
                          bg={mainBg}
                          border={`1px solid ${border1}`}
                          borderColor={border1}
                          height="48px"
                          mb="8px"
                          borderRadius="4px"
                          padding="12px 24px 4px 12px"
                          disabled={loading || role !== ('owner' || 'admin' || 'moderator')}
                          onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                        <Box
                          color={metaColor}
                          pt="4px"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                        >
                          94 Characters remaining
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Community address
                      </Box>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <InputGroup>
                          <Input
                            fontSize="14px"
                            fontWeight="400"
                            lineHeight="21px"
                            value={data?.address}
                            placeholder="Input public key (optional)"
                            bg={mainBg}
                            border={`1px solid ${border1}`}
                            borderColor={border1}
                            height="48px"
                            mb="8px"
                            borderRadius="4px"
                            padding="12px 24px 4px 12px"
                            disabled={loading || role !== ('owner' || 'admin' || 'moderator')}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                          />
                        </InputGroup>
                        {resolvedAuthorAddress !== data?.signer.address ? (
                          <Box
                            color={metaColor}
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            94
                            {data?.address} has not been acquired by you yet !!!
                          </Box>
                        ) : (
                          <Box
                            color={metaColor}
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            94 Characters remaining
                          </Box>
                        )}
                        <UnorderedList mt={3}>
                          <ListItem fontSize={12}>
                            Go to{' '}
                            <Lk
                              color={linkColor}
                              href={`https://app.ens.domains/name/${data?.address}`}
                              isExternal
                            >
                              {' '}
                              https://app.ens.domains/name/{data?.address}{' '}
                            </Lk>
                          </ListItem>
                          <ListItem fontSize={12}>Click ADD/EDIT RECORD</ListItem>
                          <ListItem fontSize={12}>
                            Select "text", write in "key": "subplebbit-address", write in next
                            field:{data?.signer?.address}
                          </ListItem>
                        </UnorderedList>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px">
                        <Box
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={mainColor}
                          mb="4px"
                        >
                          Community topics
                        </Box>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          This will help plebbit recommend your community to relevant users and
                          other discovery experiences.
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Select disabled variant="flushed" border="none" value="">
                          <option value="">Select Topic</option>
                          <option value="activism">Activism</option>
                          <option value="addictionSupport">Addiction Support</option>
                          <option value="animals">Animals And Pet</option>
                          <option value="anime">Anime</option>
                          <option value="art">Art</option>
                          <option value="beauty">Beauty and Makeup</option>
                          <option value="crypto">Crypto</option>
                          <option value="food">Food</option>
                          <option value="none">None Of These Topics</option>
                        </Select>
                        <Box w="100%">
                          <CreatableMulti placeholder="select subtopic" disabled />
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px">
                        <Box
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={mainColor}
                          mb="4px"
                        >
                          Community description
                        </Box>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          This is how new members come to understand your community.
                        </Box>
                      </Flex>
                      <Flex
                        alignItems="flex-start"
                        mt="12px"
                        flexDirection="column"
                        flexGrow="1"
                        justifyContent="flex-end"
                      >
                        <Textarea
                          fontSize="14px"
                          fontWeight="400"
                          lineHeight="21px"
                          value={data?.description}
                          bg={mainBg}
                          border={`1px solid ${border1}`}
                          borderColor={border1}
                          height="48px"
                          mb="0"
                          borderRadius="4px"
                          padding="8px"
                          resize="both"
                          disabled={loading || role !== ('owner' || 'moderator')}
                          onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                        <Box
                          color={metaColor}
                          pt="4px"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="16px"
                        >
                          500 Characters remaining
                        </Box>
                      </Flex>
                    </Flex>
                    <Box
                      fontSize="10px"
                      fontWeight="700"
                      lineHeight="12px"
                      letterSpacing=".5px"
                      color={metaColor}
                      borderBottom={`1px solid ${border1}`}
                      mb="32px"
                      paddingBottom="6px"
                    >
                      COMMUNITY TYPE
                    </Box>
                    <Flex flexDirection="column" mb="32px">
                      <Box
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="20px"
                        color={mainColor}
                        mb="4px"
                      >
                        Type of Community
                      </Box>
                      <Flex flexDirection="column" mt="12px" alignItems="flex-start">
                        <RadioGroup value="public">
                          <Stack direction="column">
                            <Radio value="public" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaUser}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>

                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Public
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Anyone can view, post, and comment to this community
                                </Box>
                              </Flex>
                            </Radio>
                            <Radio value="private" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaLock}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>
                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Private
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Only approved users can view and submit to this community
                                </Box>
                              </Flex>
                            </Radio>
                            <Radio value="restricted" colorScheme="gray" color="gray" isDisabled>
                              <Flex alignItems="center">
                                <Box>
                                  <Icon
                                    as={FaEye}
                                    width="16px"
                                    height="16px"
                                    margin="0 4px"
                                    color={iconColor}
                                  />
                                </Box>
                                <Box fontWeight="500" lineHeight="18px" fontSize="14px">
                                  Restricted
                                </Box>
                                <Box mx="1" fontSize="12px" fontWeight="400" lineHeight="16px">
                                  Anyone can view this community, but only approved users can post
                                </Box>
                              </Flex>
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Flex>
                    </Flex>
                    <Flex flexFlow="row wrap" mb="32px">
                      <Flex flexDir="column" mr="8px" maxW="80%">
                        <Flex alignItems="center">
                          <Box
                            fontSize="16px"
                            fontWeight="500"
                            lineHeight="20px"
                            mb="4px"
                            color={mainColor}
                          >
                            18+ year old community
                          </Box>
                          <Box
                            bg="#ff585b"
                            fontSize="12px"
                            fontWeight="500"
                            lineHeight="16px"
                            margin="0 4px 0 8px"
                            padding="0 4px"
                            color="#fff"
                          >
                            NSFW
                          </Box>
                        </Flex>
                        <Box color={metaColor} fontSize="12px" fontWeight="400" lineHeight="16px">
                          When your community is marked as an 18+ community, users must be flagged
                          as 18+ in their user settings
                        </Box>
                      </Flex>
                      <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                        <Switch colorScheme="gray" isDisabled />
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CommunitySettings;
