import {
  Box,
  Text,
  useColorModeValue,
  useColorMode,
  Flex,
  Input,
  Textarea,
  Image,
} from '@chakra-ui/react';
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
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex flexDir="column" marginRight="8px" maxW="80%">
              <Text
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
              >
                Display name (optional)
              </Text>
              <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                Set a display name. This does not change your username.
              </Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDir="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Input
                placeholder="Display name (optional)"
                backgroundColor={mainBg}
                color={mainColor}
                boxSizing="border-box"
                marginBottom="8px"
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                height="48px"
                borderRadius="4px"
                padding="12px 24px 4px 12px"
                width="100%"
              />
              <Text
                fontWeight="400"
                color={metaColor}
                fontSize="12px"
                lineHeight="16px"
                paddingTop="5px"
              >
                30 Characters remaining
              </Text>
            </Flex>
          </Flex>
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex flexDir="column" marginRight="8px" maxW="80%">
              <Text
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
              >
                About (optional)
              </Text>
              <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                A brief description of yourself shown on your profile.
              </Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDir="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Textarea
                placeholder="About (optional)"
                backgroundColor={mainBg}
                color={mainColor}
                boxSizing="border-box"
                marginBottom="0px"
                border={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
                borderColor={colorMode === 'light' ? '#edeff1' : '#343456'}
                height="48px"
                borderRadius="4px"
                padding="8px"
                width="100%"
                resize="both"
              />
              <Flex width="100%">
                <Text
                  fontWeight="400"
                  color={metaColor}
                  fontSize="12px"
                  lineHeight="16px"
                  paddingTop="5px"
                >
                  200 Characters remaining
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Text
            borderBottom={`1px solid ${colorMode === 'light' ? '#edeff1' : '#343456'}`}
            fontSize="10px"
            fontWeight="700"
            lineHeight="12px"
            paddingBottom="6px"
            marginBottom="32px"
          >
            Images
          </Text>
          <Flex flexDir="column" flexFlow="row-wrap" marginBottom="32px">
            <Flex flexDir="column" marginRight="8px" maxW="80%">
              <Text
                fontSize="16px"
                fontWeight="500"
                lineHeight="20px"
                color={mainColor}
                marginBottom="4px"
              >
                Avatar and banner image
              </Text>
              <Text fontWeight="400" color={metaColor} fontSize="12px" lineHeight="16px">
                nft
              </Text>
            </Flex>
            <Flex
              alignItems="flex-start"
              marginTop="12px"
              flexDirection="column"
              flexGrow="1"
              justifyContent="flex-end"
            >
              <Flex height="120px">
                <Box
                  borderRadius="8px"
                  overflow="hidden"
                  height="100%"
                  margin="0 12px 0 0"
                  position="relative"
                  width="120px"
                >
                  <Box cursor="pointer">
                    <Box height="100%" width="100%">
                      <Box height="100%" position="relative">
                        <Box
                          borderRadius="4px"
                          objectFit="cover"
                          objectPosition="top"
                          width="100%"
                          height="100%"
                          position="relative"
                        >
                          <Box
                            background={colorMode === 'light' ? '#edeff1' : '#343456'}
                            width="100%"
                            height="100%"
                            borderRadius="50%"
                          />
                          <Box width="100%" position="absolute" bottom="0">
                            <Image
                              src="https://styles.redditmedia.com/t5_4oocjn/styles/profileIcon_snooe4ba26fa-42e3-40e3-9041-c16e6bb3bbe6-headshot.png?width=256&height=256&crop=256:256,smart&s=84d5bed290c0ec6ffcce4cbd5931736282f306bf"
                              width="100%"
                              transformOrigin="bottom center"
                              display="block"
                              transform="scale(1.3)"
                              clipPath="polygon(0 68.22%,12.12% 68.22%,12.85% 71.49%,13.86% 74.69%,15.14% 77.79%,16.69% 80.77%,18.49% 83.6%,20.54% 86.26%,22.8% 88.73%,25.28% 91%,27.94% 93.04%,30.77% 94.85%,33.75% 96.4%,36.85% 97.68%,40.05% 98.69%,43.32% 99.42%,46.65% 99.85%,50% 100%,53.35% 99.85%,56.68% 99.42%,59.95% 98.69%,63.15% 97.68%,66.25% 96.4%,69.23% 94.85%,72.06% 93.04%,74.72% 91%,77.2% 88.73%,79.46% 86.26%,81.51% 83.6%,83.31% 80.77%,84.86% 77.79%,86.14% 74.69%,87.15% 71.49%,87.88% 68.22%,100% 68.22%,100% 0,0 0)"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Settings;
