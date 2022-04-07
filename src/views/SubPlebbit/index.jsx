import React from 'react';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

const SubPlebbit = () => {
  const subPlebbitTitleBg = useColorModeValue('lightBody', 'darkBody');
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
            <Flex boxSizing="border-box"></Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SubPlebbit;
