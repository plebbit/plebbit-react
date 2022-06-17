import React from 'react';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

const CreatePostSideBar = () => {
  const bg = useColorModeValue('white', 'darkNavBg');
  const borderColor = useColorModeValue('borderLight', 'borderDark');

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
        <Box backgroundColor={bg} borderRadius="4px" marginTop="15px" padding="12px">
          <Flex
            fontSize="16px"
            lineHeight="20px"
            alignItems="center"
            borderBottom="1px solid #EDEFF1"
            fontWeight="500"
          >
            <Image
              fallbackSrc={require('../../../assets/images/fallback.png')}
              height="40px"
              marginRight="8px"
              paddingBottom="5px"
              width="40px"
              src="https://styles.redditmedia.com/t5_4oocjn/styles/profileIcon_snooe4ba26fa-42e3-40e3-9041-c16e6bb3bbe6-headshot.png?width=256&height=256&crop=256:256,smart&s=84d5bed290c0ec6ffcce4cbd5931736282f306bf"
            />
            Posting to Plebbit
          </Flex>
          <Flex
            listStylePos=""
            listStyle="decimal"
            flexDir="column"
            fontSize="14px"
            lineHeight="18px"
            fontWeight="500"
          >
            <Flex borderBottom="1px solid #edeff1" padding="10px 5px">
              1.Remember the human
            </Flex>
            <Flex borderBottom="1px solid #edeff1" padding="10px 5px">
              2. Behave like you would in real life
            </Flex>
            <Flex borderBottom="1px solid #edeff1" padding="10px 5px">
              3. Look for the original source of content
            </Flex>
            <Flex borderBottom="1px solid #edeff1" padding="10px 5px">
              4. Search for duplicates before posting
            </Flex>
            <Flex borderBottom="1px solid #edeff1" padding="10px 5px">
              5. Read the community’s rules
            </Flex>
          </Flex>
        </Box>
        <Box marginTop="16px" width="312px"></Box>
        <Box
          fontSize="12px"
          fontWeight="500"
          lineHeight="16px"
          color="#7c7c7c"
          margin="10px auto 10px 0"
          maxWidth="250px"
        >
          Please be mindful of Plebbit's <a href="#"> content policy</a> and practice good{' '}
          <a href="#">plebbiquete</a>.
        </Box>
        <Box
          backgroundColor={bg}
          borderColor={borderColor}
          fill="#1c1c1c"
          marginTop="16px"
          borderRadius="4px"
          overflow="visible"
          wordBreak="break-word"
        >
          <Box maxHeight="none" padding="0">
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
    </Box>
  );
};

export default CreatePostSideBar;
