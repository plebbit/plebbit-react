import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillShieldFill } from 'react-icons/bs';
import LeaveMod from './modal/leaveMod';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import ModRole from './modal/modRole';
import Moderators from './subPlebbitModerators';
import AboutsideBar from './sideBar';
import { ProfileContext } from '../../store/profileContext';
import { HamburgerIcon } from '@chakra-ui/icons';

const About = ({ match }) => {
  const { device, accountSubplebbits } = useContext(ProfileContext);
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
            <Link to={`/p/${subPlebbit?.address}`}>
              <Flex alignItems="center" color={linkColor} mr="4px">
                P/{subPlebbit?.title || subPlebbit?.address} {'  '}
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
                  <Box>Welcome to the mod tools for p/bydino</Box>
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
            </Box>
          </Flex>

          {leaveModShow && <LeaveMod role={role} isOpen={leaveModShow} onClose={closeLeaveMod} />}
          {roleModShow && <ModRole role={role} isOpen={roleModShow} onClose={closeRoleMod} />}
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
            <Image
              fallbackSrc={require('../../assets/images/fallback.png')}
              src=""
              width="20px"
              height="20px"
              mr="8px"
              borderRadius="999px"
            />
            <Link to={`/p/${subPlebbit?.address}`}>
              <Flex alignItems="center" color={linkColor} mr="4px">
                P/{subPlebbit?.title || subPlebbit?.address} {'  '}
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
                  <Box>Welcome to the mod tools for p/bydino</Box>
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
            </Box>
          </Flex>

          {leaveModShow && <LeaveMod isOpen={leaveModShow} onClose={closeLeaveMod} />}
          {roleModShow && <ModRole isOpen={roleModShow} onClose={closeRoleMod} />}
        </Flex>
      )}
    </>
  );
};

export default About;
