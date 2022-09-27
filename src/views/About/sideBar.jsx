import { Box, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineMail,
  AiOutlineRight,
  AiOutlineSetting,
  AiOutlineTag,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { BiAddToQueue, BiBarChartAlt, BiLinkExternal, BiUser } from 'react-icons/bi';
import { BsChatDots } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const AboutsideBar = ({ page }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');

  return (
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
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'modqueue' && `4px solid #1a1a1b `}
            bg={page === 'modqueue' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'reports' && `4px solid #1a1a1b `}
            bg={page === 'reports' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'spam' && `4px solid #1a1a1b `}
            bg={page === 'spam' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'edited' && `4px solid #1a1a1b `}
            bg={page === 'edited' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'ummoderated' && `4px solid #1a1a1b `}
            bg={page === 'ummoderated' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'banned' && `4px solid #1a1a1b `}
            bg={page === 'banned' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'muted' && `4px solid #1a1a1b `}
            bg={page === 'muted' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'approved' && `4px solid #1a1a1b `}
            bg={page === 'approved' && border1}
            cursor="not-allowed"
          >
            Approved
          </Flex>
        </Link>
        <Link to="moderators">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'moderators' && `4px solid #1a1a1b `}
            bg={page === 'moderators' && border1}
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
        <Link to="flair">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'flair' && `4px solid #1a1a1b `}
            bg={page === 'flair' && border1}
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
            borderLeft={page === 'emojis' && `4px solid #1a1a1b `}
            bg={page === 'emojis' && border1}
            cursor="not-allowed"
          >
            Emojis
          </Flex>
        </Link>
        <Link to="userflair">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'userflair' && `4px solid #1a1a1b `}
            bg={page === 'userflair' && border1}
          >
            User Flair
          </Flex>
        </Link>
        <Link to="postflair">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'postflair' && `4px solid #1a1a1b `}
            bg={page === 'postflair' && border1}
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
        <Link to="rules">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'rules' && `4px solid #1a1a1b `}
            bg={page === 'rules' && border1}
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
            borderLeft={page === 'removal' && `4px solid #1a1a1b `}
            bg={page === 'removal' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'settings' && `4px solid #1a1a1b `}
            bg={page === 'settings' && border1}
            cursor="not-allowed"
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
            cursor="not-allowed"
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
            borderLeft={page === 'scheduledposts' && `4px solid #1a1a1b `}
            bg={page === 'scheduledposts' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'eventposts' && `4px solid #1a1a1b `}
            bg={page === 'eventposts' && border1}
            cursor="not-allowed"
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
            borderLeft={page === 'awards' && `4px solid #1a1a1b `}
            bg={page === 'awards' && border1}
            cursor="not-allowed"
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
            cursor="not-allowed"
          >
            Wiki Pages
          </Flex>
        </Link>
        <Link to="edit?page=community">
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
            cursor="not-allowed"
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
            cursor="not-allowed"
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
            borderLeft={page === 'chat' && `4px solid #1a1a1b `}
            bg={page === 'chat' && border1}
            cursor="not-allowed"
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

        <Link to="traffic">
          <Flex
            fontSize="14px"
            fontWeight="400"
            lineHeight="18px"
            alignItems="center"
            padding="8px 24px"
            borderLeft={page === 'traffic' && `4px solid #1a1a1b `}
            cursor="not-allowed"
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
            borderLeft={page === 'log' && `4px solid #1a1a1b `}
            cursor="not-allowed"
          >
            Mod Log
          </Flex>
        </Link>
      </Box>
    </Box>
  );
};

export default AboutsideBar;
