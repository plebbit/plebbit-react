import React from 'react';
import { Box, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
import Button from '../../components/Button';
import { FaBell } from 'react-icons/fa';

const SubPlebbit = () => {
  const subPlebbitTitleBg = useColorModeValue('lightBody', 'darkBody');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  return (
    <Box width="100%">
      <Box
        minW="260px"
        margin="0 auto"
        padding="8px 16px"
        height="145px"
        background={`url("https://styles.redditmedia.com/t5_2wlj3/styles/bannerBackgroundImage_bx1bi0qmmcg61.jpg?width=4000&format=pjpg&s=8fbb510f1bae6b0fdd98d075458022e98e4910f4") center center / cover no-repeat rgb(55, 60, 63)`}
      />
      <Box bg={subPlebbitTitleBg} display="block" width="100%">
        <Flex
          maxWidth="984px"
          flexDir="column"
          alignItems="flex-start"
          justifyContent="space-between"
          margin="0 auto"
          padding="0 16px 24px"
        >
          <Flex marginTop="-14px" marginBottom="12px" alignItems="flex-start">
            <Image
              src="https://styles.redditmedia.com/t5_2wlj3/styles/communityIcon_7jxh2j4ouky41.png?width=256&s=59ea46d93492e9d0951b43d7c580f72982a86974"
              backgroundColor="#fff"
              backgroundSize="cover"
              borderRadius="100%"
              border="4px solid #fff"
              display="inline-block"
              height="76px"
              width="76px"
            />
            <Flex
              boxSizing="border-box"
              alignContent="flex-start"
              flex="1"
              paddingLeft="16px"
              marginTop="24px"
              justifyContent="space-between"
              width="calc(100% - 80px)"
            >
              <Box paddingRight="24px" box-sizing="border-box">
                <Text
                  flex="1"
                  fontSize="28px"
                  fontWeight="700"
                  lineHeight="32px"
                  overflow="hidden"
                  padding="0 2px 4px 0"
                  width="100%"
                  text-overflow="ellipsis"
                >
                  Cryptocurrency News & Discussion
                </Text>
                <Text fontSize="14px" fontWeight="500" lineHeight="18px" color={subPlebbitSubTitle}>
                  p/CryptoCurrency
                </Text>
              </Box>
              <Flex>
                <Box width="96px">
                  <Button
                    bg="transparent"
                    content="Joined"
                    padding="4px 16px"
                    minW="32px"
                    minH="32px"
                  />
                </Box>
                <Box>
                  <Button
                    content={<Icon verticalAlign="middle" width="20px" height="20px" as={FaBell} />}
                    padding="5px"
                    borderRadius="100%"
                    height="32px"
                    width="33px"
                    bg="transparent"
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Box bg="inherit" ml="-16px" mt="-4px" margin="0 auto"></Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SubPlebbit;
