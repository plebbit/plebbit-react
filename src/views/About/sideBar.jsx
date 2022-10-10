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

const AboutsideBar = ({ page, subPlebbit }) => {
  const mainColor = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const border1 = useColorModeValue('#edeff1', '#343536');

  const sideItem = [
    {
      name: 'QUEUES',
      icon: BiAddToQueue,
      children: [
        { name: 'Mod Queue', id: 'modqueue', disabled: true },
        { name: 'Reports', id: 'reports', disabled: true },
        { name: 'Spam', id: 'spam', disabled: true },
        { name: 'Edited', id: 'edited', disabled: true },
        { name: 'Unmoderated', id: 'ummoderated', disabled: true },
      ],
      disabled: true,
    },
    {
      name: 'User Management',
      icon: BiUser,
      children: [
        { name: 'Banned', id: 'banned', disabled: true },
        { name: 'Muted', id: 'approved', disabled: true },
        { name: 'Approved', id: 'spam', disabled: true },
        { name: 'Moderators', id: 'moderators' },
      ],
    },
    {
      name: 'Flairs & emojis',
      icon: AiOutlineTag,
      children: [
        { name: 'Grant User Flair', id: 'flair', disabled: true },
        { name: 'Emojis', id: 'emojis', disabled: true },
        { name: 'User Flair', id: 'userflair' },
        { name: 'Post Flair', id: 'postflair' },
      ],
    },
    {
      name: 'Rules & Regulations',
      icon: TiDocumentText,
      children: [
        { name: 'Rules', id: 'rules' },
        { name: 'Removal Reasons', id: 'removal', disabled: true },
        { name: 'Content Controls', id: 'settings', disabled: true },
        { name: 'Auto Mods', id: 'autoMods', disabled: true },
      ],
    },
    {
      name: 'CONTENT',
      icon: AiOutlineUnorderedList,
      children: [
        { name: 'Scheduled Post', id: 'scheduledposts', disabled: true },
        { name: 'Event Posts', id: 'eventposts', disabled: true },
      ],
      disabled: true,
    },
    {
      name: 'Other',
      icon: AiOutlineSetting,
      children: [
        { name: 'Awards', id: 'awards', disabled: true },
        { name: 'Wiki Pages', id: 'wiki/index/', disabled: true },
        {
          name: 'Community Settings',
          id: 'edit',
          query: '?page=community',
          external: AiOutlineRight,
        },
        {
          name: 'Community Appearance',
          custom: `/p/${subPlebbit?.address}`,
          query: '?styling=true',
          external: AiOutlineRight,
        },
      ],
    },
    {
      name: 'MODMAIL',
      icon: AiOutlineMail,
      children: [{ name: 'Modmail', id: 'chat', external: BiLinkExternal, disabled: true }],
      disabled: true,
    },
    {
      name: 'Chat',
      icon: BsChatDots,
      children: [{ name: 'Chat Settings', id: 'chat', disabled: true }],
      disabled: true,
    },
    {
      name: 'Community Activity',
      icon: BiBarChartAlt,
      children: [
        { name: 'Traffic Stats', id: 'traffic', disabled: true },
        { name: 'Mod Log', id: 'log', disabled: true },
      ],
      disabled: true,
    },
  ];

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
      {sideItem
        ?.filter((child) => !child?.disabled)
        ?.map((item, index) => (
          <Box key={index} marginBottom="8px" paddingBottom="8px">
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
              <Icon as={item?.icon} mr="8px" width="20px" height="20px" />
              <Box>{item?.name}</Box>
            </Flex>
            {item?.children
              ?.filter((child) => !child?.disabled)
              ?.map((child, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: child?.custom
                      ? child?.custom
                      : `/p/${subPlebbit?.address}/about/${child?.id}`,
                    search: child?.query,
                  }}
                >
                  <Flex
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="18px"
                    alignItems="center"
                    padding="8px 24px"
                    borderLeft={page === child?.id && `4px solid #1a1a1b `}
                    bg={page === child?.id && border1}
                    cursor={child?.disabled && 'not-allowed'}
                  >
                    <Box>{child?.name}</Box>
                    {child?.external && <Icon as={child?.external} ml="auto" color={iconColor} />}
                  </Flex>
                </Link>
              ))}
          </Box>
        ))}
    </Box>
  );
};

export default AboutsideBar;
