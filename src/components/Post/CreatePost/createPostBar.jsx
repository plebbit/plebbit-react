import React, { useContext } from 'react';
import { Box, Flex, useColorModeValue, Input, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { LinkIcon } from '@chakra-ui/icons';
import { ProfileContext } from '../../../store/profileContext';

const CreatePostBar = () => {
  const history = useHistory();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const border1 = useColorModeValue('#ccc', '#343536');
  const border2 = useColorModeValue('#edeff1', '#343536');
  const inputText = useColorModeValue('bodyTextLight', 'bodyTextDark');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const { authorAvatarImageUrl } = useContext(ProfileContext);

  return (
    <Flex bg={mainBg} borderRadius="4px" border={`1px solid ${border1}`} mb="16px" padding="8px">
      <Box
        border="1px solid"
        borderColor={border2}
        flexBasis="38px"
        mr="8px"
        borderRadius="50%"
        width="38px"
        height="38px"
      >
        <Box position="relative">
          <Box borderRadius="50%" width="38px" height="38px" position="relative">
            <Box width="100%" height="100%" borderRadius="50%" bg={border2} />
            <Box width="100%" position="absolute" bottom="0">
              <Image
                fallbackSrc={require('../../../assets/images/fallback.png')}
                src={authorAvatarImageUrl}
                width="100%"
                transformOrigin="bottom center"
                display="block"
                transform="scale(1.3)"
                rounded="full"
              />
            </Box>
            <Box
              width="12px"
              height="12px"
              rounded="full"
              bg="#46d160"
              position="absolute"
              borderWidth="2px"
              borderColor="#fff"
              borderStyle="solid"
              right="0"
              top="75%"
            />
          </Box>
        </Box>
      </Box>
      <Input
        onClick={() => history.push('/submit')}
        placeholder="Create Post"
        bg={inputBg}
        border={`1px solid ${border2}`}
        boxShadow="none"
        boxSizing="border-box"
        color={inputText}
        display="block"
        flexGrow="1"
        height="38px"
        mr="8px"
        outline="none"
        padding="0 16px"
        fontSize="14px"
        lineHeight="21px"
        fontWeight="400"
        fontFamily="inherit"
      />
      <Box
        borderRadius="4px"
        position="relative"
        border="1px solid transparent"
        color={iconColor}
        fill={iconColor}
        _hover={{
          background: inputBg,
        }}
        minH="40px"
        minW="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="auto"
        onClick={() => history.push('/submit')}
      >
        <LinkIcon height="20px" width="20px" />
      </Box>
    </Flex>
  );
};

export default CreatePostBar;
