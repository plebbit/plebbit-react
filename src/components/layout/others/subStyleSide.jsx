import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdOutlineClose } from 'react-icons/md';

const SubStyleSide = () => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const linkColor = useColorModeValue('lightLink', 'darkLink');
  const border = useColorModeValue('#edeff1', '#343536');

  return (
    <Box>
      <Box
        bg={bg}
        width="284px"
        boxSizing="border-box"
        boxShadow="0 1px 3px rgba(0,0,0,.08)"
        height="100%"
        overflow="auto"
        position="fixed"
        left="0"
        top="0"
        zIndex="85"
      >
        <Box position="absolute" top="18px" right="12px">
          <Icon as={MdOutlineClose} height="16px" width="16px" color={iconColor} />
        </Box>
        <Box>
          <Box padding="12px 12px 40px">
            <Flex
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              mb="40px"
              paddingTop="4px"
              textAlign="left"
              marginRight="28px"
              alignItems="center"
            >
              <Icon as={MdArrowBackIos} />
              <Box>Back to Mod tools</Box>
            </Flex>
            <>
              <Box mb="32px">
                <Text
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="22px"
                  as="h1"
                  borderBottom={`2px solid ${border}`}
                  mb="8px"
                  pb="8px"
                >
                  Appearance
                </Text>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Color theme</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Name & icon</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Banner</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Menu</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Posts</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Css</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box
                  fontSize="12px"
                  fontWeight="700"
                  borderRadius="9999px"
                  border="1px solid transparent"
                  color={linkColor}
                  letterSpacing=".5px"
                  lineHeight="24px"
                  my="12px"
                >
                  RESET TO DEFAULTS
                </Box>
              </Box>
              <Box mb="32px">
                <Text
                  fontSize="18px"
                  fontWeight="500"
                  lineHeight="22px"
                  as="h1"
                  borderBottom={`2px solid ${border}`}
                  mb="8px"
                  pb="8px"
                >
                  Structure
                </Text>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Menu links</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
                <Box borderBottom={`1px solid ${border}`}>
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    fontSize="13px"
                    lineHeight="16px"
                    padding="12px 0"
                  >
                    <Box flex="1 1 100%">Sidebar widgets</Box>
                    <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                      <Icon as={MdArrowForwardIos} />
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStyleSide;
