import { Box, Flex, Icon, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsFillShieldFill } from 'react-icons/bs';
import LeaveMod from './modal/leaveMod';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import ModRole from './modal/modRole';
import Moderators from './Moderator/subPlebbitModerators';
import AboutsideBar from './sideBar';
import { ProfileContext } from '../../store/profileContext';
import { HamburgerIcon } from '@chakra-ui/icons';
import Layout from '../../components/layout';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import Flair from './flair';
import UserFlair from './flair/userFlair';
import PostFlair from './flair/postFlair';

const About = ({ match }) => {
  const { device, accountSubplebbits, profile } = useContext(ProfileContext);
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const subPlebbit = useSubplebbit(match?.params?.subplebbitAddress);
  const page = match?.path.split('/').at(-1);
  const { isOpen: leaveModShow, onOpen: openLeaveMod, onClose: closeLeaveMod } = useDisclosure();
  const { isOpen: roleModShow, onOpen: openRoleMod, onClose: closeRoleMod } = useDisclosure();
  const [showSidebar, setShowSideBar] = useState(false);
  const role = accountSubplebbits[subPlebbit?.address]?.role?.role;
  const location = useLocation();

  return (
    <Layout
      name={{
        label: subPlebbit?.title || getAddress(subPlebbit?.address),
        value: location?.pathname,
      }}
    >
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
              <Avatar width={20} height={20} mr="8px" />

              <Link to={`/p/${subPlebbit?.address}`}>
                <Flex alignItems="center" color={linkColor} mr="4px">
                  {subPlebbit?.title || getAddress(subPlebbit?.address)} {'  '}
                  <Box color={mainColor}>
                    /{' '}
                    {page === 'modqueue'
                      ? 'mod queue'
                      : page === 'scheduledposts'
                      ? 'Scheduled posts'
                      : page === 'eventposts'
                      ? 'event posts'
                      : page.toUpperCase()}{' '}
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Flex margin="40px 0">
              {/* sideBar */}
              <AboutsideBar page={page} role={role} />
              {/*Body */}
              <Box paddingLeft="280px" boxSizing="border-box" width="100%">
                {page === '' && (
                  <Flex
                    alignItems="center"
                    bg={inputBg}
                    color={mainColor}
                    flexDirection="column"
                    justifyContent="center"
                    margin="30px"
                    padding="60px"
                  >
                    <Icon as={BsFillShieldFill} color={iconColor} width="30px" height="30px" />
                    <Box>Welcome to the mod tools for bydino</Box>
                  </Flex>
                )}
                {page === 'moderators' && (
                  <Moderators
                    subPlebbit={subPlebbit}
                    openLeaveMod={openLeaveMod}
                    openRoleMod={openRoleMod}
                    role={role}
                  />
                )}
                {page === 'flair' && <Flair role={role} />}
                {page === 'userflair' && <UserFlair role={role} />}
                {page === 'postflair' && <PostFlair role={role} />}
              </Box>
            </Flex>

            {leaveModShow && (
              <LeaveMod
                isOpen={leaveModShow}
                onClose={closeLeaveMod}
                subPlebbit={subPlebbit}
                profile={profile}
                role={role}
              />
            )}
            {roleModShow && (
              <ModRole
                role={role}
                isOpen={roleModShow}
                onClose={closeRoleMod}
                subPlebbit={subPlebbit}
              />
            )}
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
              position="fixed"
              width="100%"
              zIndex="30"
              padding="5px"
            >
              <IconButton
                onClick={() => setShowSideBar(!showSidebar)}
                variant="outline"
                icon={<HamburgerIcon />}
                mr="10px"
              />
              <Avatar width={20} height={20} mr="8px" />
              <Link to={`/p/${subPlebbit?.address}`}>
                <Flex alignItems="center" color={linkColor} mr="4px">
                  {subPlebbit?.title || getAddress(subPlebbit?.address)} {'  '}
                  <Box color={mainColor}>
                    /{' '}
                    {page === 'modqueue'
                      ? 'mod queue'
                      : page === 'scheduledposts'
                      ? 'Scheduled posts'
                      : page === 'eventposts'
                      ? 'event posts'
                      : page.toUpperCase()}{' '}
                  </Box>
                </Flex>
              </Link>
            </Flex>
            <Flex margin="40px 0">
              {/* sideBar */}
              {showSidebar && (
                <Box zIndex={28}>
                  <AboutsideBar page={page} role={role} />
                </Box>
              )}
              {/*Body */}
              <Box boxSizing="border-box" width="100%">
                {page === '' && (
                  <Flex
                    alignItems="center"
                    bg={inputBg}
                    color={mainColor}
                    flexDirection="column"
                    justifyContent="center"
                    margin="30px"
                    padding="60px"
                  >
                    <Icon as={BsFillShieldFill} color={iconColor} width="30px" height="30px" />
                    <Box>Welcome to the mod tools for bydino</Box>
                  </Flex>
                )}
                {page === 'moderators' && (
                  <Moderators
                    subPlebbit={subPlebbit}
                    openLeaveMod={openLeaveMod}
                    openRoleMod={openRoleMod}
                    role={role}
                  />
                )}
                {page === 'flair' && <Flair role={role} />}
                {page === 'userflair' && <UserFlair role={role} />}
                {page === 'postflair' && <PostFlair role={role} />}
              </Box>
            </Flex>

            {leaveModShow && (
              <LeaveMod
                isOpen={leaveModShow}
                onClose={closeLeaveMod}
                subPlebbit={subPlebbit}
                profile={profile}
              />
            )}
            {roleModShow && (
              <ModRole isOpen={roleModShow} onClose={closeRoleMod} subPlebbit={subPlebbit} />
            )}
          </Flex>
        )}
      </>
    </Layout>
  );
};

export default About;
