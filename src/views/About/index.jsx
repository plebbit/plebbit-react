import { Box, Flex, IconButton, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { usePublishSubplebbitEdit, useSubplebbit } from '@plebbit/plebbit-react-hooks';
import AboutsideBar from './sideBar';
import { ProfileContext } from '../../store/profileContext';
import { HamburgerIcon } from '@chakra-ui/icons';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import logger from '../../utils/logger';
import getChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import Content from './content';

const About = () => {
  const { device, accountSubplebbits } = useContext(ProfileContext);
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const location = useLocation();
  const { subplebbitAddress } = useParams();
  const subPlebbit = useSubplebbit({ subplebbitAddress: subplebbitAddress });
  const page = location.pathname.split('/').at(-1);
  const [showSidebar, setShowSideBar] = useState(false);
  const role = accountSubplebbits[subPlebbit?.address]?.role?.role;
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';

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
    // ...data,
    onChallenge,
    onChallengeVerification,
  }

  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions)

  const handleSubPlebbitedit = async () => {

    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      logger('editSubplebbit', error, 'error');
      toast({
        title: 'Declined.',
        description: error?.stack.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Layout
      name={ {
        label: subPlebbit?.title || getAddress(subPlebbit?.address),
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

              <Link to={ `/p/${subPlebbit?.address}` }>
                <Flex alignItems="center" color={ linkColor } mr="4px">
                  { subPlebbit?.title || getAddress(subPlebbit?.address) } { '  ' }
                  <Box color={ mainColor }>
                    /{ ' ' }
                    { page === 'modqueue'
                      ? 'mod queue'
                      : page === 'scheduledposts'
                        ? 'Scheduled posts'
                        : page === 'eventposts'
                          ? 'event posts'
                          : page.toUpperCase() }{ ' ' }
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Flex margin="40px 0">
              {/* sideBar */ }
              <AboutsideBar
                page={ page }
                allowedSpecial={ allowedSpecial }
                role={ role }
                subPlebbit={ subPlebbit }
              />
              {/*Body */ }
              <Box paddingLeft="280px" boxSizing="border-box" width="100%">
                <Content
                  page={ page }
                  subPlebbit={ subPlebbit }
                  role={ role }
                  allowedSpecial={ allowedSpecial }
                  handleSubPlebbitedit={ handleSubPlebbitedit }
                  loading={ loading }
                />
              </Box>
            </Flex>
          </Flex>
        ) : (
          <Flex bg={ layoutBg } flexDir="column" color={ mainColor } minH="100vh" overflowX="auto">
            <Flex
              fontSize="12px"
              fontWeight="700"
              letterSpacing="0.5px"
              textTransform="uppercase"
              lineHeight="24px"
              alignItems="center"
              bg={ mainBg }
              height="48px"
              position="fixed"
              width="100%"
              zIndex="30"
              padding="5px"
            >
              <IconButton
                onClick={ () => setShowSideBar(!showSidebar) }
                variant="outline"
                icon={ <HamburgerIcon /> }
                mr="10px"
              />
              <Avatar width={ 20 } height={ 20 } mr="8px" />
              <Link to={ `/p/${subPlebbit?.address}` }>
                <Flex alignItems="center" color={ linkColor } mr="4px">
                  { subPlebbit?.title || getAddress(subPlebbit?.address) } { '  ' }
                  <Box color={ mainColor }>
                    /{ ' ' }
                    { page === 'modqueue'
                      ? 'mod queue'
                      : page === 'scheduledposts'
                        ? 'Scheduled posts'
                        : page === 'eventposts'
                          ? 'event posts'
                          : page.toUpperCase() }{ ' ' }
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Flex margin="40px 0">
              {/* sideBar */ }
              { showSidebar && (
                <Box zIndex={ 28 }>
                  <AboutsideBar
                    allowedSpecial={ allowedSpecial }
                    page={ page }
                    role={ role }
                    subPlebbit={ subPlebbit }
                  />
                </Box>
              ) }
              {/*Body */ }
              <Box boxSizing="border-box" width="100%">
                <Content
                  page={ page }
                  subPlebbit={ subPlebbit }
                  role={ role }
                  allowedSpecial={ allowedSpecial }
                  handleSubPlebbitedit={ handleSubPlebbitedit }
                  loading={ loading }
                />
              </Box>
            </Flex>
          </Flex>
        ) }
      </>
    </Layout>
  );
};

export default About;
