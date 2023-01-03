import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiBell } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import Avatar from '../../../Avatar';
import DropDown from '../../../DropDown';
import PopOver from '../../../PopOver';
import { getTimeVal } from '../../../../utils/formatDate';
import { useHistory } from 'react-router-dom';

const NavNotification = () => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const history = useHistory();

  return (
    <PopOver
      title={<Icon color={iconColor2} width={6} height={6} as={BiBell} />}
      header={
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Box fontSize="14px" fontWeight="500">
            Notifications
          </Box>
          <Flex alignItems="center">
            <Icon mr="8px" color={iconColor} width={6} height={6} as={BsCheckAll} />

            <Icon color={iconColor} width={6} height={6} as={MdSettings} />
          </Flex>
        </Flex>
      }
      footer={
        <Flex justifyContent="center" alignItems="center">
          <Button
            onClick={() => history.push('/notifications')}
            variant="unstyled"
            color={linkColor}
          >
            SEE ALL
          </Button>
        </Flex>
      }
      content={
        <Flex flexDirection="column">
          {/* unread actvity notification item */}
          <NotificationType status="unread" type="activity" />
          {/* read actvity notification item */}
          <NotificationType status="read" type="activity" />
          {/* unread reply notification item */}
          <NotificationType status="unread" type="reply" />
          {/* read reply notification item */}
          <NotificationType status="read" type="reply" />
        </Flex>
      }
    />
  );
};

export default NavNotification;

export const NotificationType = ({ status, type }) => {
  const cardBg = useColorModeValue('rgba(36,160,237,0.1)', 'rgba(36,160,237,0.5)');
  const metaText = useColorModeValue('#7c7c7c', '#818384');

  return (
    <>
      {status === 'unread' && type === 'activity' ? (
        <Flex bg={cardBg} padding="16px">
          <Box mr="8px">
            <Avatar height={32} width={32} avatar="" />
          </Box>
          <Flex flexDirection="column" width="100%">
            <Flex w="100%" mb="4px">
              <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                Now in MovieSuggestions ·{' '}
                <span
                  style={{
                    lineHeight: '19px',
                    color: metaText,
                  }}
                >
                  {getTimeVal(1672669367335)}
                </span>
              </Text>
              <Box ml="auto">
                <DropDown
                  dropDownTitle={
                    <Box>
                      <Icon as={FiMoreHorizontal} />
                    </Box>
                  }
                />
              </Box>
            </Flex>
            <Box
              fontSize="14px"
              lineHeight="18px"
              color={metaText}
              wordBreak="break-all"
              noOfLines={3}
              overflow="hidden"
            >
              Your [text post](https://www.reddit.com/r/CryptoCurrency/comments/zvjcot/hello/) was
              removed for not having a high enough character count and therefore violating rules 2 &
              5. Please resubmit as a comment in the daily thread or submit a new post with at least
              500 characters. --- *I am a bot, and this action was performed automatically. Please
              [contact the moderators of this subreddit](/message/compose/?to=/r/CryptoCurrency) if
              you have any questions or concerns.*
            </Box>
          </Flex>
        </Flex>
      ) : status === 'read' && type === 'activity' ? (
        <Flex padding="16px">
          <Box mr="8px">
            <Avatar height={32} width={32} avatar="" />
          </Box>
          <Flex flexDirection="column" width="100%">
            <Flex w="100%" mb="4px">
              <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                Now in MovieSuggestions ·{' '}
                <span
                  style={{
                    lineHeight: '19px',
                    color: metaText,
                  }}
                >
                  {getTimeVal(1672669367335)}
                </span>
              </Text>
              <Box ml="auto">
                <DropDown
                  dropDownTitle={
                    <Box>
                      <Icon as={FiMoreHorizontal} />
                    </Box>
                  }
                />
              </Box>
            </Flex>
            <Box
              fontSize="14px"
              lineHeight="18px"
              color={metaText}
              wordBreak="break-all"
              noOfLines={3}
              overflow="hidden"
            >
              Your [text post](https://www.reddit.com/r/CryptoCurrency/comments/zvjcot/hello/) was
              removed for not having a high enough character count and therefore violating rules 2 &
              5. Please resubmit as a comment in the daily thread or submit a new post with at least
              500 characters. --- *I am a bot, and this action was performed automatically. Please
              [contact the moderators of this subreddit](/message/compose/?to=/r/CryptoCurrency) if
              you have any questions or concerns.*
            </Box>
          </Flex>
        </Flex>
      ) : status === 'unread' && type === 'reply' ? (
        <Flex bg={cardBg} padding="16px">
          <Box mr="8px">
            <Avatar height={32} width={32} avatar="" />
          </Box>
          <Flex flexDirection="column" width="100%">
            <Flex w="100%" mb="4px">
              <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                u/AutoModerator replied to your post in p/CryptoCurrency ·{' '}
                <span
                  style={{
                    lineHeight: '19px',
                    color: metaText,
                  }}
                >
                  {getTimeVal(1672669367335)}
                </span>
              </Text>
              <Box ml="auto">
                <DropDown
                  dropDownTitle={
                    <Box>
                      <Icon as={FiMoreHorizontal} />
                    </Box>
                  }
                />
              </Box>
            </Flex>
            <Box
              fontSize="14px"
              lineHeight="18px"
              color={metaText}
              wordBreak="break-all"
              noOfLines={3}
              overflow="hidden"
            >
              Your [text post](https://www.reddit.com/r/CryptoCurrency/comments/zvjcot/hello/) was
              removed for not having a high enough character count and therefore violating rules 2 &
              5. Please resubmit as a comment in the daily thread or submit a new post with at least
              500 characters. --- *I am a bot, and this action was performed automatically. Please
              [contact the moderators of this subreddit](/message/compose/?to=/r/CryptoCurrency) if
              you have any questions or concerns.*
            </Box>
          </Flex>
        </Flex>
      ) : status === 'read' && type === 'reply' ? (
        <Flex padding="16px">
          <Box mr="8px">
            <Avatar height={32} width={32} avatar="" />
          </Box>
          <Flex flexDirection="column" width="100%">
            <Flex w="100%" mb="4px">
              <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                u/AutoModerator replied to your post in p/CryptoCurrency ·{' '}
                <span
                  style={{
                    lineHeight: '19px',
                    color: metaText,
                  }}
                >
                  {getTimeVal(1672669367335)}
                </span>
              </Text>
              <Box ml="auto">
                <DropDown
                  dropDownTitle={
                    <Box>
                      <Icon as={FiMoreHorizontal} />
                    </Box>
                  }
                />
              </Box>
            </Flex>
            <Box
              fontSize="14px"
              lineHeight="18px"
              color={metaText}
              wordBreak="break-all"
              noOfLines={3}
              overflow="hidden"
            >
              Your [text post](https://www.reddit.com/r/CryptoCurrency/comments/zvjcot/hello/) was
              removed for not having a high enough character count and therefore violating rules 2 &
              5. Please resubmit as a comment in the daily thread or submit a new post with at least
              500 characters. --- *I am a bot, and this action was performed automatically. Please
              [contact the moderators of this subreddit](/message/compose/?to=/r/CryptoCurrency) if
              you have any questions or concerns.*
            </Box>
          </Flex>
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};
