import { Box, Button, Flex, Icon, Image, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const CommunitySettings = () => {
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const border1 = useColorModeValue('#edeff1', '#343536');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || 'community';

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
        <Link>
          <Flex alignItems="center" color={linkColor} mr="4px">
            P/Bydino {'  '}
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
            >
              Invite user as mod
            </Button>
          </Flex>
          <Box ml="24px" mr="24px" paddingTop="64px" borderRadius="0 0 4px 4px" overflow="hidden">
            {page === 'community' && (
              <Box bg={mainBg} borderRadius="4px" maxW="856px" padding="16px 24px">
                <Box fontSize="18px" fontWeight="500" lineHeight="22px" color={mainColor} mb="16px">
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
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CommunitySettings;
