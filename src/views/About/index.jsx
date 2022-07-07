import { Box, Flex, Icon, Image, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiAddToQueue, BiBarChartAlt, BiLinkExternal, BiUser } from 'react-icons/bi';
import {
  AiOutlineMail,
  AiOutlineRight,
  AiOutlineSetting,
  AiOutlineTag,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { BsChatDots } from 'react-icons/bs';

const About = () => {
  const layoutBg = useColorModeValue('lightBg', 'darkBg');
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');

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
          <Box color={linkColor} mr="4px">
            P/Bydino
          </Box>
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
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiAddToQueue} mr="8px" width="20px" height="20px" />
              <Box>Queues</Box>
            </Flex>
            <Link>
              <Flex
                bg={border1}
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
                borderLeft={`4px solid #1a1a1b `}
              >
                Mod Queue
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Reports
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Spam
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Edited
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Unmoderated
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiUser} mr="8px" width="20px" height="20px" />
              <Box>User Management</Box>
            </Flex>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Banned
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Muted
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Approved
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Moderators
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineTag} mr="8px" width="20px" height="20px" />
              <Box>Flairs & emojis</Box>
            </Flex>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Grant User Flair
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Muted
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Emojis
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                User Flair
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Post Flair
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={TiDocumentText} mr="8px" width="20px" height="20px" />
              <Box>Rules & Regulations</Box>
            </Flex>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Rules
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Removal Reasons
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Content Controls
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Auto Mods
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineUnorderedList} mr="8px" width="20px" height="20px" />
              <Box>Content</Box>
            </Flex>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Scheduled Post
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Removal Reasons
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Event Posts
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineSetting} mr="8px" width="20px" height="20px" />
              <Box>Other</Box>
            </Flex>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Awards
              </Flex>
            </Link>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Wiki Pages
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Community Settings</Box>
                <Icon as={AiOutlineRight} ml="auto" color={iconColor} />
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Community Appearance</Box>
                <Icon as={AiOutlineRight} ml="auto" color={iconColor} />
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={AiOutlineMail} mr="8px" width="20px" height="20px" />
              <Box>MODMAIL</Box>
            </Flex>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                <Box>Modmail</Box>
                <Icon as={BiLinkExternal} ml="auto" color={iconColor} />
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BsChatDots} mr="8px" width="20px" height="20px" />
              <Box>Chat</Box>
            </Flex>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Chat Settings
              </Flex>
            </Link>
          </Box>
          <Box marginBottom="8px" paddingBottom="8px">
            <Flex
              fontSize="10px"
              fontWeight="700"
              letterSpacing="0.5px"
              lineHeight="12px"
              textTransform="uppercase"
              alignItems="center"
              color={iconColor}
              padding="8px 24px"
            >
              <Icon as={BiBarChartAlt} mr="8px" width="20px" height="20px" />
              <Box>Community Activity</Box>
            </Flex>

            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Traffic Stats
              </Flex>
            </Link>
            <Link>
              <Flex
                fontSize="14px"
                fontWeight="400"
                lineHeight="18px"
                alignItems="center"
                padding="8px 24px"
              >
                Mod Log
              </Flex>
            </Link>
          </Box>
        </Box>
        {/*Body */}
        <Box paddingLeft="280px" boxSizing="border-box" width="100%"></Box>
      </Flex>
    </Flex>
  );
};

export default About;
