import {
  Box,
  Button,
  Flex,
  Icon,
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
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEye, FaLock, FaUser } from 'react-icons/fa';
import CreatableMulti from '../../components/DropDown/creatableMulti';
import {
  usePublishSubplebbitEdit,
  useResolvedSubplebbitAddress,
  useSubplebbit,
} from '@plebbit/plebbit-react-hooks';
import getChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import { ProfileContext } from '../../store/profileContext';
import logger from '../../utils/logger';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import MobileView from './mobileView';
import SideBar from './sideBar';

const CommunitySettings = ({ match }) => {
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const location = useLocation();
  const subplebbit = useSubplebbit({ subplebbitAddress: match?.params?.subplebbitAddress });
  const page = new URLSearchParams(location.search).get('page') || 'community';
  const [data, setData] = useState({ ...subplebbit });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
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
    logger('challenge verified', { challengeVerification, subplebbitEdit }, 'error');
  };

  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('decline challenge', error, 'trace');
      toast({
        title: 'Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const editSubplebbitOptions = {
    title: data?.title,
    description: data?.description,
    address: data?.address,
    onChallenge,
    onChallengeVerification,
  };
  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions)

  const handleSaveChanges = async () => {

    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editComment', error, 'error');
      toast({
        title: 'Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const role = accountSubplebbits[subplebbit?.address]?.role?.role;
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

  useEffect(() => {
    setData({ ...subplebbit });
  }, [subplebbit]);

  return (
    <Layout
      name={ {
        label: subplebbit?.title || getAddress(subplebbit?.address),
        value: location?.pathname,
      } }
    >
      <>
        { device !== 'mobile' ? (
          <Flex bg={ layoutBg } flexDir="column" color={ mainColor } minH="100vh" overflowX="auto">
            <Flex
              fontSize="12px"
              fontWeight="700"
              letterSpacing="0.5px"
              textTransform="uppercase"
              lineHeight="24px"
              alignItems="center"
              bg={ mainBg }
              height="40px"
              paddingLeft="24px"
              position="fixed"
              width="100%"
              zIndex="30"
            >
              <Avatar width={ 20 } height={ 20 } mr="8px" />
              <Link to={ `/p/${data?.address}` }>
                <Flex alignItems="center" color={ linkColor } mr="4px">
                  { subplebbit?.title || getAddress(subplebbit?.address) } { '  ' }
                  <Box color={ mainColor } textTransform="uppercase">
                    / community settings
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Flex margin="40px 0">
              {/* sideBar */ }
              <SideBar device={ device } page={ page } />
              {/*Body */ }
              <Box paddingLeft="280px" boxSizing="border-box" width="100%">
                <Flex
                  alignItems="center"
                  background={ border1 }
                  height="48px"
                  justifyContent="flex-end"
                  left="280px"
                  padding="0 24px"
                  position="fixed"
                  right="0"
                  zIndex="3"
                >
                  <Button
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
                    onClick={ handleSaveChanges }
                    isLoading={ loading }
                    disabled={ !allowedSpecial }
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
                  { page === 'community' && (
                    <Box bg={ mainBg } borderRadius="4px" maxW="856px" padding="16px 24px">
                      <Box
                        fontSize="18px"
                        fontWeight="500"
                        lineHeight="22px"
                        color={ mainColor }
                        mb="16px"
                      >
                        Community settings
                      </Box>
                      <Box
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="12px"
                        letterSpacing=".5px"
                        color={ metaColor }
                        borderBottom={ `1px solid ${border1}` }
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
                          color={ mainColor }
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
                            value={ data?.title }
                            bg={ mainBg }
                            border={ `1px solid ${border1}` }
                            borderColor={ border1 }
                            height="48px"
                            mb="8px"
                            borderRadius="4px"
                            padding="12px 24px 4px 12px"
                            disabled={ loading }
                            onChange={ (e) => setData({ ...data, title: e.target.value }) }
                          />
                          <Box
                            color={ metaColor }
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            {/* 94 Characters remaining */ }
                          </Box>
                        </Flex>
                      </Flex>
                      <Flex flexDir="column" flexWrap="row wrap" mb="32px">
                        <Box
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="20px"
                          color={ mainColor }
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
                              value={ data?.address }
                              bg={ mainBg }
                              border={ `1px solid ${border1}` }
                              borderColor={ border1 }
                              height="48px"
                              mb="8px"
                              borderRadius="4px"
                              padding="12px 24px 4px 12px"
                              disabled={ loading || !allowedSpecial }
                              onChange={ (e) => setData({ ...data, address: e.target.value }) }
                            />
                          </InputGroup>
                          { resolvedAuthorAddress !== data?.signer?.address ? (
                            <Box
                              color={ metaColor }
                              pt="4px"
                              fontSize="12px"
                              fontWeight="400"
                              lineHeight="16px"
                            >
                              { data?.address } { '' }
                              has not been acquired by you yet !!!
                            </Box>
                          ) : (
                            <Box
                              color={ metaColor }
                              pt="4px"
                              fontSize="12px"
                              fontWeight="400"
                              lineHeight="16px"
                            >
                              {/* 94 Characters remaining */ }
                            </Box>
                          ) }
                          <UnorderedList mt={ 3 }>
                            <ListItem fontSize={ 12 }>
                              Go to{ ' ' }
                              <Lk
                                color={ linkColor }
                                href={ `https://app.ens.domains/name/${data?.address}` }
                                isExternal
                              >
                                { ' ' }
                                https://app.ens.domains/name/{ data?.address }
                              </Lk>
                            </ListItem>
                            <ListItem fontSize={ 12 }>Click ADD/EDIT RECORD</ListItem>
                            <ListItem fontSize={ 12 }>
                              Select "text", write in "key": "subplebbit-address", write in next
                              field: { data?.signer?.address }
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
                            color={ mainColor }
                            mb="4px"
                          >
                            Community topics
                          </Box>
                          <Box color={ metaColor } fontSize="12px" fontWeight="400" lineHeight="16px">
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
                            color={ mainColor }
                            mb="4px"
                          >
                            Community description
                          </Box>
                          <Box color={ metaColor } fontSize="12px" fontWeight="400" lineHeight="16px">
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
                            value={ data?.description }
                            bg={ mainBg }
                            border={ `1px solid ${border1}` }
                            borderColor={ border1 }
                            height="48px"
                            mb="0"
                            borderRadius="4px"
                            padding="8px"
                            resize="both"
                            disabled={ loading || !allowedSpecial }
                            onChange={ (e) => setData({ ...data, description: e.target.value }) }
                          />
                          <Box
                            color={ metaColor }
                            pt="4px"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="16px"
                          >
                            {/* 500 Characters remaining */ }
                          </Box>
                        </Flex>
                      </Flex>
                      <Box
                        fontSize="10px"
                        fontWeight="700"
                        lineHeight="12px"
                        letterSpacing=".5px"
                        color={ metaColor }
                        borderBottom={ `1px solid ${border1}` }
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
                          color={ mainColor }
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
                                      as={ FaUser }
                                      width="16px"
                                      height="16px"
                                      margin="0 4px"
                                      color={ iconColor }
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
                                      as={ FaLock }
                                      width="16px"
                                      height="16px"
                                      margin="0 4px"
                                      color={ iconColor }
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
                                      as={ FaEye }
                                      width="16px"
                                      height="16px"
                                      margin="0 4px"
                                      color={ iconColor }
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
                              color={ mainColor }
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
                          <Box color={ metaColor } fontSize="12px" fontWeight="400" lineHeight="16px">
                            When your community is marked as an 18+ community, users must be flagged
                            as 18+ in their user settings
                          </Box>
                        </Flex>
                        <Flex alignItems="center" flexGrow="1" justifyContent="flex-end">
                          <Switch colorScheme="gray" isDisabled />
                        </Flex>
                      </Flex>
                    </Box>
                  ) }
                </Box>
              </Box>
            </Flex>
          </Flex>
        ) : (
          <MobileView
            setShowSideBar={ setShowSideBar }
            showSidebar={ showSidebar }
            data={ data }
            subplebbit={ subplebbit }
            page={ page }
            handleSaveChanges={ handleSaveChanges }
            setData={ setData }
            loading={ loading }
            role={ role }
            allowedSpecial={ allowedSpecial }
            resolvedAuthorAddress={ resolvedAuthorAddress }
            device={ device }
          />
        ) }
      </>
    </Layout>
  );
};

export default CommunitySettings;
