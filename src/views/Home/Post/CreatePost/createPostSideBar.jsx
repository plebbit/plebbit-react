import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';

const CreatePostSideBar = () => {
  return (
    <Box
      marginLeft="24px"
      marginTop="0px"
      sx={{
        '@media (min-width:960px)': {
          display: 'block',
        },
      }}
      display="none"
      flex="0 0 312px"
      width="312px"
    >
      <Box paddingTop="27px" width="inherit">
        <Box backgroundColor="#fff" borderRadius="4px" marginTop="15px" padding="12px">
          <Flex
            fontSize="16px"
            lineHeight="20px"
            alignItems="center"
            borderBottom="1px solid #EDEFF1"
            color="#1c1c1c"
            fontWeight="500"
          >
            <Image src="" />
            Posting to Plebbit
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePostSideBar;
