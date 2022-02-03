import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const CreatePost = () => {
  return (
    <Flex
      maxWidth="1248p"
      sx={{
        '@media (min-width: 640px)': {
          padding: '20px 24px',
        },
      }}
      justifyContent="center"
      margin="0 auto"
    >
      <Box
        flex="1 1 100%"
        sx={{
          '@media (min-width: 960px)': {
            maxWidth: '740px',
            width: '640px',
          },
          '@media (max-width: 960px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
        <Flex flexDirection="column">
          <Flex justifyContent="space-between" margin="16px 0" borderBottom="1px solid">
            <Box fontSize="18px" fontWeight="500" lineHeight="22px" flex="1">
              Create Post
            </Box>
            <Flex
              alignItems="center"
              fontSize="12px"
              fontWeight="700"
              letterSpacing=".5px"
              lineHeight="24px"
              textTransform="uppercase"
              marginLeft="10px"
            >
              <Box>DRAFTS</Box>
              <Box
                fontSize="12px"
                fontWeight="400"
                lineHeight="16px"
                background="#ccc"
                borderRadius="2px"
                marginLeft="4px"
                padding="1px 3px"
              >
                0
              </Box>
            </Flex>
          </Flex>
          <Flex marginBottom="8px" alignItems="center">
            <Box
              marginRight="16px"
              minW="300px"
              height="40px"
              borderRadius="4px"
              transition="box-shadow .2s ease"
              boxShadow="0 0 0 0 #a4a4a4"
              backgroundColor="#fff"
            >
              <Flex alignItems="center" height="100%" padding="0 8px">
                <Box
                  borderRadius="22px"
                  border="1px dashed #a4a4a4"
                  height="22px"
                  margin="0"
                  width="22px"
                  fontSize="22px"
                  lineHeight="22px"
                />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreatePost;
