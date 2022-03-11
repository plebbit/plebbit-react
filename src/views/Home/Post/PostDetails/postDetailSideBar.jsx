import React from 'react';
import { Box, Text, Flex, Image, useColorModeValue, Icon } from '@chakra-ui/react';
import { BiCake } from 'react-icons/bi';
import Button from '../../../../components/Button';

const PostDetailSideBar = ({
  mt,
  borderRadius,
  ml,
  margin,
  width,
  padding,
  top,
  right,
  sx,
  border,
  borderColor,
  bg,
}) => {
  const color = useColorModeValue('darkText', 'lightText');
  const Bg = useColorModeValue('#F8F9FA', '#1A1A1B');
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  };

  return (
    <Box
      marginLeft={ml || '24px'}
      marginTop={mt || '28px'}
      border={border}
      borderColor={borderColor}
      margin={margin}
      width={width}
      padding={padding}
      borderRadius={borderRadius}
      top={top}
      right={right}
      sx={
        sx || {
          '@media (min-width: 960px)': {
            display: 'block',
          },
          '@media (max-width: 960px)': {
            display: 'none',
            width: '312px',
            flex: '0 0 312px',
          },
        }
      }
    >
      <Flex flexDirection="column" height="100%" width="inherit">
        <Box borderRadius="4px" overflow="visible" wordBreak="break-word" bg={bg || Bg}>
          <Box
            maxHeight="none"
            backgroundPosition="50%"
            backgroundRepeat="no-repeat"
            borderTopRadius="4px"
            h="40px"
            pos="relative"
            backgroundColor="#a4a4a4"
          >
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="20px"
              bottom="8px"
              color="#fff"
              left="16px"
              position="absolute"
            />
          </Box>
          <Flex width="100" padding="12px" alignItems="center" mb="8px">
            <Image
              borderRadius="full"
              boxSize="54px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              mr="8px"
            />
            <Box fontSize="16px" fontWeight="500" lineHeight="20px">
              p/PlebbitFamily
            </Box>
          </Flex>
          <Box marginBottom="8px" position="relative" padding="12px">
            p/PlebbitFamily is all about plebbit
          </Box>
          <Flex marginBottom="8px" padding="12px">
            <Flex flexDirection="column" paddingRight="4px" flex="auto">
              <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                43m
              </Box>
              <Box fontSize="12px" fontWeight="500" lineHeight="16px" wordBreak="break-word">
                Members
              </Box>
            </Flex>
            <Flex flexDirection="column" paddingRight="4px" paddingLeft="16px" flex="auto">
              <Box fontSize="16px" fontWeight="500" lineHeight="20px">
                112.4k
              </Box>
              <Box fontSize="12px" fontWeight="500" lineHeight="16px" wordBreak="break-word">
                Online
              </Box>
            </Flex>
            <Flex />
          </Flex>
          <Box padding="12px">
            <hr />
          </Box>
          <Box>
            <Flex
              alignItems="center"
              fontSize="14px"
              fontWeight="400"
              lineHeight="18px"
              flexFlow="row nowrap"
              padding="12px"
            >
              <Icon as={BiCake} margin="-2px 8px 0 0" w={6} h={6} color="inherit" />
              <Box>Created Jan 28, 2022 </Box>
            </Flex>
          </Box>

          <Box padding="12px">
            <Button color={color} content="Join" bg="#a4a4a4" height="34px" width="100%" />
          </Box>
        </Box>

        <Box flex="1 1 auto" width="inherit" position="relative">
          <Box position="sticky" top="55px">
            <Box marginTop="16px" background={bg || Bg}>
              <Box maxHeight="none">
                <Flex padding="12px 8px">
                  <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Help
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Plebbit Coins
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Plebbit Premium
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Communities
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      RePlebbit
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Topics
                    </Box>
                  </Flex>
                  <Flex flexFlow="column" flexWrap="nowrap" width="50%" padding="0 4px">
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      About
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Careers
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Press
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Advertise
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Blog
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Content Policy
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Privacy Policy
                    </Box>
                    <Box
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="16px"
                      marginTop="3px"
                      marginBottom="3px"
                      display="inline-block"
                      textTransform="capitalize"
                    >
                      Mod Policy
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  padding="12px"
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="16px"
                  marginTop="3px"
                  marginBottom="3px"
                  display="inline-block"
                  textTransform="capitalize"
                >
                  Plebbit Inc © {new Date().getFullYear()} . All rights reserved
                </Flex>
              </Box>
            </Box>
          </Box>
          <Flex
            top="calc(100vh - 8px)"
            position="sticky"
            marginTop="45px"
            justifyContent="center"
            textAlign="center"
            transform="translateY(-100%)"
          >
            <Button
              border="none"
              content="Back to Top"
              width="128px"
              position="relative"
              bg="#a4a4a4"
              color={color}
              fontSize="14px"
              fontWeight="700"
              onClick={scrollToTop}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default PostDetailSideBar;
