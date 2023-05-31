import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BiBell } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import Avatar from '../../../Avatar';
import Link from '../../../Link';
import DropDown from '../../../DropDown';
import PopOver from '../../../PopOver';
import { getTimeVal } from '../../../../utils/formatDate';
import getUserName from '../../../../utils/getUserName';
import { ProfileContext } from '../../../../store/profileContext';
import { toast } from 'react-toastify';

const NavNotification = () => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const { notifications } = useContext(ProfileContext);

  const handleReadAll = async () => {
    await notifications?.markAsRead();
    toast({
      title: 'Accepted.',
      description: 'All Notification read',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <PopOver
      title={
        notifications?.notifications?.filter((x) => !x?.markedAsRead).length ? (
          <Box width={ 6 } height={ 6 } position="relative">

            <Icon color={ iconColor2 } width={ 6 } height={ 6 } as={ BiBell } />
            <Box boxShadow="0 0 0 2px white" left="15px" top="-1" minW="16px" textAlign="center" bg="red" borderRadius="12px" width="auto" height="16px" position='absolute' color="white" fontSize="10px" padding="0 2px" fontWeight="700">{ notifications?.notifications?.filter((x) => !x?.markedAsRead).length }</Box>
          </Box>
        ) : (
          <Icon color={ iconColor2 } width={ 6 } height={ 6 } as={ BiBell } />
        )
      }
      header={
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Box fontSize="14px" fontWeight="500">
            Notifications
          </Box>
          <Flex alignItems="center">
            <Icon
              mr="8px"
              color={ iconColor }
              width={ 6 }
              height={ 6 }
              as={ BsCheckAll }
              onClick={ handleReadAll }
            />

            <Icon color={ iconColor } width={ 6 } height={ 6 } as={ MdSettings } />
          </Flex>
        </Flex>
      }
      footer={
        <Flex justifyContent="center" alignItems="center">
          <Link to="/notifications">
            <Button
              onClick={ () => { handleReadAll(); } }
              variant="unstyled"
              color={ linkColor }
            >
              SEE ALL
            </Button>
          </Link>
        </Flex>
      }
      content={

        <Flex flexDirection="column"

        >
          { notifications?.notifications?.map((notifications, index) => (
            <NotificationType handleReadAll={ handleReadAll } key={ index } notification={ notifications } />
          )) }
        </Flex>
      }
    />
  );
};

export default NavNotification;

export const NotificationType = ({ notification, handleReadAll }) => {
  const cardBg = useColorModeValue('rgba(36,160,237,0.1)', 'rgba(36,160,237,0.5)');
  const metaText = useColorModeValue('#7c7c7c', '#818384');

  return (
    <>
      {
        /* status === 'unread' && type === 'activity' ? (
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
      ) :  */
        !notification?.markedAsRead ? (
          <Link to={ `/p/${notification?.subplebbitAddress}/c/${notification?.cid}` }>

            <Flex bg={ cardBg } padding="16px" cursor="pointer" onClick={ () => { handleReadAll(); } }>
              <Box mr="8px">
                <Avatar height={ 32 } width={ 32 } avatar="" />
              </Box>
              <Flex flexDirection="column" width="100%">
                <Flex w="100%" mb="4px">
                  <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                    { getUserName(notification?.author) } replied to your post in{ ' ' }
                    { `p/${notification?.subplebbitAddress}` } ·{ ' ' }
                    <span
                      style={ {
                        lineHeight: '19px',
                        color: metaText,
                      } }
                    >
                      { getTimeVal(notification?.timestamp * 1000) }
                    </span>
                  </Text>
                  <Box ml="auto">
                    <DropDown
                      dropDownTitle={
                        <Box>
                          <Icon as={ FiMoreHorizontal } />
                        </Box>
                      }
                    />
                  </Box>
                </Flex>
                <Box
                  fontSize="14px"
                  lineHeight="18px"
                  color={ metaText }
                  wordBreak="break-all"
                  noOfLines={ 3 }
                  overflow="hidden"
                >
                  { notification?.content }
                </Box>
              </Flex>
            </Flex>
          </Link>
        ) : notification?.markedAsRead ? (
          <Link to={ `/p/${notification?.subplebbitAddress}/c/${notification?.cid}` }>
            <Flex padding="16px" cursor="pointer" onClick={ () => { handleReadAll(); } }>
              <Box mr="8px">
                <Avatar height={ 32 } width={ 32 } avatar="" />
              </Box>
              <Flex flexDirection="column" width="100%">
                <Flex w="100%" mb="4px">
                  <Text wordBreak="break-all" fontSize="14px" lineHeight="21px" fontWeight="400">
                    { getUserName(notification?.author) } replied to your post in{ ' ' }
                    { `p/${notification?.subplebbitAddress || ''}` } ·{ ' ' }
                    <span
                      style={ {
                        lineHeight: '19px',
                        color: metaText,
                      } }
                    >
                      { getTimeVal(notification?.timestamp * 1000) }
                    </span>
                  </Text>
                  <Box ml="auto">
                    <DropDown
                      dropDownTitle={
                        <Box>
                          <Icon as={ FiMoreHorizontal } />
                        </Box>
                      }
                    />
                  </Box>
                </Flex>
                <Box
                  fontSize="14px"
                  lineHeight="18px"
                  color={ metaText }
                  wordBreak="break-all"
                  noOfLines={ 3 }
                  overflow="hidden"
                >
                  { notification?.content }
                </Box>
              </Flex>
            </Flex>
          </Link>
        ) : (
          ''
        )
      }
    </>
  );
};
