import { Box, Text, useColorModeValue, useColorMode, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

const Settings = () => {
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const metaColor = useColorModeValue('metaTextLight', 'metaTextDark');
  const { colorMode } = useColorMode();
  const [view, setView] = useState('profile');
  const tabs = [
    { label: 'Account', link: 'account' },
    { label: 'Profile', link: 'profile' },
    { label: 'Safety & Privacy', link: 'privacy' },
    { label: 'Feed Settings', link: 'feed' },
    { label: 'Notifications', link: 'notifications' },
    { label: 'Chat & Messaging', link: 'messaging' },
  ];
  return (
    <Box
      paddingBottom="40px"
      minH="calc(100vh - 88px)"
      marginLeft="calc(100vw - 100%)"
      background={mainBg}
    >
      <Box boxSizing="border-box" background={mainBg} position="relative">
        <Text
          maxW="1200px"
          fontSize="18px"
          fontWeight="500"
          lineHeight="22px"
          padding="16px 20px 20px"
          margin="0 auto"
          color={mainColor}
          fill="#fff"
        >
          User Settings
        </Text>
        <Flex
          maxW="1200px"
          background={mainBg}
          margin="0 auto"
          padding="0 20px"
          borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
          alignItems="center"
          color={metaColor}
        >
          {tabs
            ? tabs.map((tab) => (
                <Box
                  key={tab?.link}
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="unset"
                  marginRight="8px"
                  padding="15px 12px 12px"
                  cursor="pointer"
                  borderBottom={
                    tab.link === view &&
                    `3px solid ${colorMode === 'light' ? '#343456' : '#d7d7dc'}`
                  }
                  color={view === tab?.link && mainColor}
                  _hover={{
                    color: mainColor,
                  }}
                  onClick={() => setView(tab?.link)}
                >
                  {tab?.label}
                </Box>
              ))
            : ''}
        </Flex>
      </Box>
      <Flex maxW="1200px" margin="0 auto" padding="0 16px">
        <Box maxW="688px" flex="1 1 auto">
          <Text fontSize="20px" fontWeight="500" lineHeight="24px" padding="40px 0">
            Customize profile
          </Text>
          <Text
            fontSize="10px"
            fontWeight="700"
            letterSpacing="0.5px"
            marginBottom="32px"
            paddingBottom="6px"
            borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
            color={metaColor}
          >
            PROFILE INFORMATION
          </Text>
          <Flex></Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Settings;
