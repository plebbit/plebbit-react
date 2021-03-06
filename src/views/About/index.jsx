import { Box, Flex, Icon, Image, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillShieldFill } from 'react-icons/bs';
import LeaveMod from './modal/leaveMod';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import ModRole from './modal/modRole';
import Moderators from './subPlebbitModerators';
import AboutsideBar from './sideBar';

const About = ({ match }) => {
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

  console.log(subPlebbit);
  return (
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
        <AboutsideBar page={page} />
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
            />
          )}
        </Box>
      </Flex>

      {leaveModShow && <LeaveMod isOpen={leaveModShow} onClose={closeLeaveMod} />}
      {roleModShow && <ModRole isOpen={roleModShow} onClose={closeRoleMod} />}
    </Flex>
  );
};

export default About;
