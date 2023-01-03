import { Box, Flex, Icon, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BsCheckAll } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/layout';
import { NotificationType } from '../../components/layout/Nav/NavNotification';

const Notifications = () => {
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const metaText = useColorModeValue('#7c7c7c', '#818384');
  const bg = useColorModeValue('lightBody', 'darkBody');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { colorMode } = useColorMode();

  const history = useHistory();

  return (
    <Layout name={{ label: 'Notifications', value: 'notification', icon: <FaBell /> }}>
      <Box zIndex={3}>
        <Box h="131px" margin="0px auto" width="648px">
          <Text padding="40px 0 21px" fontWeight="500" fontSize="22px" lineHeight="26px">
            Notifications
          </Text>
          <Flex alignItems="center">
            <Box
              fontSize="14px"
              fontWeight="700"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              lineHeight="unset"
              marginRight="8px"
              padding="15px 12px 12px"
              cursor="pointer"
              borderBottom={`3px solid ${colorMode === 'light' ? '#0079D3' : '#4FBCFF'}`}
              color={mainColor}
              _hover={{
                color: mainColor,
              }}
            >
              Activity
            </Box>
            <Flex
              fontSize="14px"
              fontWeight="700"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              lineHeight="unset"
              marginRight="8px"
              padding="15px 12px 12px"
              cursor="pointer"
              color={metaText}
              _hover={{
                color: mainColor,
              }}
              alignItems="center"
              ml="auto"
            >
              <Icon mr="6px" color={metaText} width={6} height={6} as={BsCheckAll} />
              Mark as Read
            </Flex>
            <Flex
              fontSize="14px"
              fontWeight="700"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              lineHeight="unset"
              marginRight="8px"
              padding="15px 12px 12px"
              cursor="pointer"
              color={metaText}
              _hover={{
                color: mainColor,
              }}
              alignItems="center"
              onClick={() => history.push('/settings/notifications')}
            >
              <Icon mr="6px" color={metaText} width={6} height={6} as={MdSettings} />
              Settings
            </Flex>
          </Flex>
        </Box>
        <Flex maxW="1248px" padding="20px 24px" margin="0 auto" justifyContent="center">
          <Box maxW="740px" width="640px" flex="1 1 100%">
            <Box borderRadius="4px" margin="0 auto" maxW="648px" bg={bg}>
              <>
                <Text fontSize="18px" fontWeight="500" lineHeight="22px" padding="8px 16px">
                  Today
                </Text>
                <Flex flexDirection="column">
                  {/* unread actvity notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="unread" type="activity" />
                  </Box>
                  {/* read actvity notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="read" type="activity" />
                  </Box>
                  {/* unread reply notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="unread" type="reply" />
                  </Box>
                  {/* read reply notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="read" type="reply" />
                  </Box>
                </Flex>
              </>
              <>
                <Text fontSize="18px" fontWeight="500" lineHeight="22px" padding="8px 16px">
                  Earlier
                </Text>
                <Flex flexDirection="column">
                  {/* unread actvity notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="unread" type="activity" />
                  </Box>
                  {/* read actvity notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="read" type="activity" />
                  </Box>
                  {/* unread reply notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="unread" type="reply" />
                  </Box>
                  {/* read reply notification item */}
                  <Box borderBottom={`1px solid  ${navBorder}`} color={mainColor}>
                    <NotificationType status="read" type="reply" />
                  </Box>
                </Flex>
              </>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Notifications;
